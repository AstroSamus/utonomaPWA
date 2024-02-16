import { createWeb3Modal, defaultConfig } from '@web3modal/ethers'

let modal;

// 1. Get projectId
const projectId = 'acc64a6d2308020280276076ddc6effa'

// 2. Set chains
const mainnet = {
  chainId: 1,
  name: 'Ethereum',
  currency: 'ETH',
  explorerUrl: 'https://etherscan.io',
  rpcUrl: 'https://cloudflare-eth.com'
}

// 3. Create modal
const metadata = {
  name: 'My Website',
  description: 'My Website description',
  url: 'https://mywebsite.com', // origin must match your domain & subdomain
  icons: ['https://avatars.mywebsite.com/']
}

function getAuthenticationInstance() {
  if(!modal) {
    modal = createWeb3Modal({
      ethersConfig: defaultConfig({ metadata }),
      chains: [mainnet],
      projectId
    })
  } 
  return modal
}

export default {
  getAuthenticationInstance
}