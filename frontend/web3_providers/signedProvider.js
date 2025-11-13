import { BrowserProvider, Contract } from 'ethers'
import { utonomaSepoliaAddress, utonomaABI } from '../utonomaSmartContract.js'

const EthersAdapter = {}
const createAppKit = {}

let networks, projectId, metadata

/**
 * Lazy-initialized AppKit singleton with connection state and contract access.
 *
 * @namespace appkit
 * @property {import('@reown/appkit').AppKit} modal - Singleton AppKit instance returned by `createAppKit()`.
 * @property {boolean} isConnected - Whether a wallet is currently connected.
 * @property {Promise<import('ethers').Contract>} utonomaContract - Promise resolving to the Utonoma contract instance.
 */
export const appkit = {
  _modal: null,
  _isConnected: null,
  _utonomaContractPromise: null,

  get modal() {
    if (!this._modal) {
      console.log("Inicializando modal por primera vez...");
      this._modal = createAppKit({
        adapters: [new EthersAdapter()],
        networks,
        metadata,
        debug: true,
        projectId,
        features: {
          analytics: true,
        },
        tokens: {
          "eip155:534351": { address: utonomaSepoliaAddress },
        },
        allWallets: "SHOW",
      });

      this._modal.subscribeProviders((state) => {
        this._isConnected = !!state["eip155"];
        if (!this._isConnected) this._utonomaContract = null;
      });
    }
    return this._modal;
  },
  get isConnected() {
    if (this._isConnected === null) {
      const provider = this.modal.getProvider('eip155');
      return !!provider;
    }
    return this._isConnected;
  },

  /**
   * Returns a Promise that resolves to the Utonoma contract instance.
   * If the user is not connected, the Promise rejects with an Error.
   *
   * @returns {Promise<import('ethers').Contract>} Contract instance connected to the user's signer.
   * @throws {Error} When the user is disconnected or the EIP-155 provider is not available.
   */
  get utonomaContract() {
    if (this._utonomaContractPromise) return this._utonomaContractPromise;

    this._utonomaContractPromise = (async () => {
      if (!this.isConnected) throw(new Error('User disconnected'));

      const provider = this.modal.getProvider('eip155');      
      if (!provider) throw(new Error("EIP-155 provider is not available"));
      
      const ethProvider = new BrowserProvider(provider)
      const ethSigner = await ethProvider.getSigner()
      return new Contract(utonomaContractAddress, utonomaContractAbi, ethSigner)
    })();
    return this._utonomaContract;
  }
};