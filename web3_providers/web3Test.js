import Onboard from '@web3-onboard/core'
import injectedModule from '@web3-onboard/injected-wallets'
import walletConnectModule from '@web3-onboard/walletconnect'
import { BrowserProvider, Contract } from 'ethers'
import {
  chains,
  chainForAddEthereumChain,
  walletConnectModuleParams,
  contractInfo
} from 'config.env'
import { userManager } from '../services/userManager/userManager.js'

const { utonomaAddress, utonomaAbi } = contractInfo
const injected = injectedModule();
const walletConnect = walletConnectModule(walletConnectModuleParams);

const appMetadata = {
  name: 'Web3-Onboard Vanilla JS Demo',
  icon: '<svg />',
  logo: '<svg />',
  description: 'Demo using Onboard',
  recommendedInjectedWallets: [
    { name: 'Coinbase', url: 'https://wallet.coinbase.com/' },
    { name: 'MetaMask', url: 'https://metamask.io' }
  ]
}

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
    const connected = await this.onboard.connectWallet();
    if (!connected || !connected.length) {
      throw new Error('User did not connect a wallet');
    }

    const [wallet] = connected;
    this._wallet = wallet;

    const provider = wallet.provider;
    this._ethersProvider = new BrowserProvider(provider);
    this._signer = await this._ethersProvider.getSigner();

    userManager.lastKnownUserAddress = await this._signer.getAddress()

    await this.ensureFuji()

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

  async ensureFuji() {
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

  get utonomaContract() {
    if (this._utonomaContractPromise) return this._utonomaContractPromise;

    this._utonomaContractPromise = (async () => {
      if (!this._signer) {
        throw new Error('No signer available. Call web3.connect() first.');
      }

      // Opcional: asegurarte de que estás en Fuji antes de crear el contrato
      const network = await this._ethersProvider.getNetwork();
      if (network.chainId !== 43113n) { // ethers v6 usa BigInt
        console.warn('Not on Fuji, calling ensureFuji()');
        await this.ensureFuji();
      }

      return new Contract(utonomaAddress, utonomaAbi, this._signer);
    })();

    return this._utonomaContractPromise;
  }
};