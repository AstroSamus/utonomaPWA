export const chains = [{
  id: '0xa869', // 43113 en hex - Avalanche Fuji
  token: 'AVAX',
  label: 'Avalanche Fuji',
  rpcUrl: 'https://api.avax-test.network/ext/bc/C/rpc'
}]

//addEthereumChain calls needs the network in a special format
export const chainForAddEthereumChain = {
  chainId: '0xa869',
  chainName: 'Avalanche Fuji C-Chain',
  nativeCurrency: {
    name: 'Avalanche Fuji C-Chain',
    symbol: 'AVAX',
    decimals: 18
  },
  rpcUrls: [
    'https://api.avax-test.network/ext/bc/C/rpc',
    'https://endpoints.omniatech.io/v1/avax/fuji/public'
  ],
  blockExplorerUrls: ['https://subnets-test.avax.network/c-chain']
}

export const walletConnectModuleParams = {
  projectId : '2897ca765c95a7e36410d31f88a6efee',
  //for testing, assing the dappUrl to your local IPV4 address
  dappUrl: 'http://192.168.68.108:8080'
}