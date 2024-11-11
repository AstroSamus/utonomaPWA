import { createWeb3Modal, defaultConfig } from '@web3modal/ethers'
import { BrowserProvider, Contract } from 'ethers'
import { utonomaSepoliaAddress, utonomaABI } from '../utonomaSmartContract.js'
import { sepoliaEndpoint } from './rpcEndpoints.js'

let modal

// 1. Get projectId at https://cloud.walletconnect.com
const projectId = 'acc64a6d2308020280276076ddc6effa'

// 2. Set chains
const sepolia = {
  chainId: 534351,
  name: 'Scroll Sepolia Testnet',
  currency: 'ETH',
  explorerUrl: 'https://sepolia.scrollscan.com/',
  rpcUrl: sepoliaEndpoint
}

// 3. Create your application's metadata object
const metadata = {
  name: 'Utonoma',
  description: 'The social network of the web3 world',
  url: 'https://utonoma.com', // url must match your domain & subdomain
  icons: ['https://avatars.mywebsite.com/']
}

// 4. Create Ethers config
const ethersConfig = defaultConfig({
  /*Required*/
  metadata,

  /*Optional*/
  enableEIP6963: true, // true by default
  enableInjected: true, // true by default
  enableCoinbase: true, // true by default
  rpcUrl: '...', // used for the Coinbase SDK
  defaultChainId: 1, // used for the Coinbase SDK
})

export async function useSignedProvider() {
  return new Promise((resolve) => {
    //Give two seconds before returning the modal, as there are wrong lectures on the getIsConnected method when
    //we return it immediately
    if(!modal) {
      modal = createWeb3Modal({
        ethersConfig,
        chains: [sepolia],
        tokens: {
          534351 : { address:  utonomaSepoliaAddress}
        },
        projectId,
        enableAnalytics: true, // Optional - defaults to your Cloud configuration
        enableOnramp: true // Optional - false as default
      })
    }
    setTimeout(() => {
      resolve({ modal })
    }, 2000)
  }) 
}

export async function useUtonomaContractForSignedTransactions() {
  let { modal } = await useSignedProvider()
  if(!modal.getIsConnected()) throw(new Error('User disconnected'))
  const walletProvider = modal.getWalletProvider()
  const ethersProvider = new BrowserProvider(walletProvider)
  const signer = await ethersProvider.getSigner()
  const utonomaContractForSignedTransactions = new Contract(utonomaSepoliaAddress, utonomaABI, signer)
  return { utonomaContractForSignedTransactions }
}
