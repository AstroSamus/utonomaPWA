import Onboard from '@web3-onboard/core'
import injectedModule from '@web3-onboard/injected-wallets'
import walletConnectModule from '@web3-onboard/walletconnect'
import { BrowserProvider, Contract } from 'ethers'
import {
  chains,
  chainForAddEthereumChain,
  walletConnectModuleParams,
  contractInfo,
  chainIdInBigInt,
  web3OnboardMetadata
} from 'config.env'
import { userManager } from '../services/userManager/userManager.js'

const { 
  utonomaAddress, 
  utonomaAbi, 
  utonomaSymbol,
  utonomaTokenDecimals 
} = contractInfo
const injected = injectedModule();
const walletConnect = walletConnectModule(walletConnectModuleParams);

const appMetadata = web3OnboardMetadata

export const web3 = {
  _onboard: null,
  _wallet: null,
  _ethersProvider: null,
  _signer: null,
  _utonomaContractPromise: null,

  get onboard() {
    if (!this._onboard) {
      this._onboard = Onboard({
        wallets: [injected, walletConnect],
        chains,
        appMetadata
      });
    }
    return this._onboard;
  },

  get isConnected() {
    return !!this._wallet;
  },

  async connect() {
    if(this.isConnected) return this._wallet;
    
    const connected = await this.onboard.connectWallet();
    if (!connected || !connected.length) {
      return false
    }

    const [wallet] = connected;
    this._wallet = wallet;

    const provider = wallet.provider;
    this._ethersProvider = new BrowserProvider(provider);
    this._signer = await this._ethersProvider.getSigner();

    userManager.lastKnownUserAddress = await this._signer.getAddress()

    await this.ensureCorrectNetwork()

    return wallet;
  },

  async disconnect() {
    if (this._wallet) {
      await this.onboard.disconnectWallet({ label: this._wallet.label })
      this._wallet = null
      this._ethersProvider = null
      this._signer = null
      this._utonomaContractPromise = null
    }
    userManager.logout()
  },

  async ensureCorrectNetwork() {
    if (!this._wallet || !this._wallet.provider) {
      throw new Error('No wallet connected');
    }

    const provider = this._wallet.provider;
    const targetChainId = '0xa869';

    const currentChainId = await provider.request({ method: 'eth_chainId' });
    if (currentChainId.toLowerCase() === targetChainId) {
      console.log('Already on Avalanche Fuji');
      return;
    }

    try {
      await provider.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: targetChainId }]
      });
    } catch (err) {
      if (err.code === 4902) {
        await provider.request({
          method: 'wallet_addEthereumChain',
          params: [chainForAddEthereumChain]
        });
        try {
          await provider.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: targetChainId }]
          });
        } catch (switchErr) {
          console.warn('Network added but failed to switch:', switchErr);
        }
      } else {
        throw err;
      }
    }
  },

  /**
   * @Developer Adds Nomax to the user's wallet
   * @returns {Promise<boolean>} - Returns true if the token was added, false otherwise
   */
  async addNomaxToWallet() {
    if (!this._wallet || !this._wallet.provider) {
      if(!await this.connect()) return false
    }

    const provider = this._wallet.provider;

    try {
      const wasAdded = await provider.request({
        method: 'wallet_watchAsset',
        params: {
          type: 'ERC20',
          options: {
            address: utonomaAddress,
            symbol: utonomaSymbol,
            decimals: utonomaTokenDecimals,
            // image: 'https://...' // Add logo here
          }
        }
      })
      //the value of wasAdded is true or false based on if the user accepted or rejected the request
      return wasAdded
    } catch (error) {
      console.error('Error adding token to wallet:', error);
      return false
    }
  },

  get utonomaContract() {
    if (this._utonomaContractPromise) return this._utonomaContractPromise;

    this._utonomaContractPromise = (async () => {
      if (!this._signer) {
        throw new Error('No signer available. Call web3.connect() first.');
      }

      // Ensure you are in the correct network
      const network = await this._ethersProvider.getNetwork();
      if (network.chainId !== chainIdInBigInt) { // ethers v6 uses BigInt
        console.warn('Not on Fuji, calling ensureCorrectNetwork()');
        await this.ensureCorrectNetwork();
      }

      return new Contract(utonomaAddress, utonomaAbi, this._signer);
    })();

    return this._utonomaContractPromise;
  }
};