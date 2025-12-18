export const isDevEnvironment = false

export const rpcUrl = 'https://api.avax.network/ext/bc/C/rpc'

export const ipfsJsonUploaderUrl = 'https://mmcvhj7mz9.us-east-1.awsapprunner.com/pinJsonToIpfs'

export const ipfsFileUploaderUrl = 'https://mmcvhj7mz9.us-east-1.awsapprunner.com/pinFileToIpfs'

export const utonomaEventFilterUrl = 'https://api.studio.thegraph.com/query/106360/utonoma-mainnet/version/latest'

export const chainIdInBigInt = 43114n

export const chains = [{
  id: '0xa86a', // 43114 en hex - Avalanche C-Chain
  token: 'AVAX',
  label: 'Avalanche C-Chain',
  rpcUrl
}]

//addEthereumChain calls needs the network in a special format
export const chainForAddEthereumChain = {
  chainId: '0xa86a',
  chainName: 'Avalanche C-Chain',
  nativeCurrency: {
    name: 'Avalanche C-Chain',
    symbol: 'AVAX',
    decimals: 18
  },
  rpcUrls: [
    'https://api.avax.network/ext/bc/C/rpc',
    'https://endpoints.omniatech.io/v1/avax/mainnet/public'
  ],
  blockExplorerUrls: ['https://subnets.avax.network/c-chain']
}

export const walletConnectModuleParams = {
  projectId : '260948140665e32551a32a2cddffc2c3',
  dappUrl: 'https://app.utonoma.com'
}

/**
 * @description Metadata used by web3 onboard to display to the users
 */
export const web3OnboardMetadata = {
  name: 'Utonoma',
  icon: '<svg width="50" height="47" viewBox="0 0 50 47" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_430_222)"><mask id="mask0_430_222" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="50" height="47"><path d="M49.212 0H0V46.186H49.212V0Z" fill="white"/></mask><g mask="url(#mask0_430_222)"><path d="M13.963 7.566L13.908 0.713L9.793 3.09L9.83 7.741L9.879 14.014C10.1025 16.779 10.6737 19.5048 11.579 22.127C12.4697 24.7629 13.7898 27.2335 15.486 29.439C16.7718 31.1833 18.3514 32.6904 20.154 33.893C21.5749 34.8781 23.1144 35.6801 24.736 36.28C26.4245 37.1082 28.2824 37.5327 30.163 37.52C31.7018 37.5156 33.2335 37.3119 34.72 36.914C36.044 36.586 37.3305 36.1218 38.559 35.529C39.4969 35.0394 40.3991 34.4843 41.259 33.868C39.8533 35.7571 38.1292 37.3868 36.164 38.684C34.461 39.7499 32.6212 40.5798 30.695 41.151C28.8955 41.7105 27.0261 42.0135 25.142 42.051C23.5615 42.0491 21.9849 41.8947 20.434 41.59C18.391 41.0003 16.4402 40.1286 14.638 39C12.8174 37.6829 11.1964 36.11 9.825 34.33C8.71344 32.9185 7.79066 31.3681 7.08 29.718C6.20144 28.0159 5.49494 26.2304 4.971 24.388C4.52882 23.2019 4.27835 21.9529 4.229 20.688L4.116 6.367L0 8.744L0.078 18.622C0.078 18.622 0.753 29.39 3.643 33.428C6.981 38.118 8.102 38.835 8.078 38.764C8.678 39.352 10.061 40.673 10.806 41.237C11.8791 42.0598 13.0041 42.8127 14.174 43.491C15.5175 44.1426 16.9033 44.7031 18.322 45.169C19.5382 45.5334 20.7791 45.8094 22.035 45.995L22.086 46.001C23.0154 46.1124 23.95 46.1741 24.886 46.186C26.2956 46.1987 27.7028 46.0684 29.086 45.797C30.439 45.497 32.145 44.989 33.354 44.623C34.5744 44.1743 35.7613 43.6397 36.906 43.023C38.2518 42.2383 39.532 41.3461 40.734 40.355C42.5189 38.8015 44.0881 37.0163 45.4 35.047C45.8893 34.2365 46.3346 33.4003 46.734 32.542C47.2797 31.3828 47.7474 30.1885 48.134 28.967C48.42 27.9808 48.6501 26.9792 48.823 25.967V25.951C49.0749 24.3039 49.2039 22.6403 49.209 20.974L49.073 0H44.991L45.007 3.115L45.044 16.8C45.0397 18.5627 44.79 20.3162 44.302 22.01C43.68 24.581 41.675 28.717 38.668 30.68C37.7472 31.3371 36.7452 31.8722 35.687 32.272C34.0428 32.8918 32.3163 33.2658 30.563 33.382C28.4661 33.3266 26.4112 32.7811 24.563 31.789C22.903 30.9755 21.3983 29.8776 20.117 28.545C19.2961 27.6227 18.5281 26.6544 17.817 25.645C18.7674 26.2113 19.7471 26.7271 20.752 27.19C21.3335 27.4171 21.9303 27.6029 22.538 27.746C23.7976 28.0572 25.0943 28.1919 26.391 28.146C27.7115 28.1727 29.0294 28.0182 30.308 27.687C31.7257 27.2111 33.0652 26.528 34.283 25.66C35.6566 24.6376 36.8307 23.3716 37.747 21.925C38.4932 20.6969 39.1271 19.404 39.641 18.062C40.0251 16.8887 40.3488 15.6964 40.611 14.49C40.9915 12.7481 41.2382 10.9796 41.349 9.2L41.319 5.351L37.185 5.384L37.2 7.6C37.2934 10.8651 36.7377 14.1163 35.565 17.165C33.186 22.887 29.205 24.272 26.495 24.08C20.437 24.199 17.407 19.661 16.395 17.531C15.4306 15.5543 14.7654 13.4453 14.421 11.273C14.1344 10.06 13.9812 8.81929 13.964 7.573" fill="#383838"/></g></g><defs><clipPath id="clip0_430_222"><rect width="49.212" height="46.186" fill="white"/></clipPath></defs></svg>',
  logo: '<svg width="50" height="47" viewBox="0 0 50 47" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_430_222)"><mask id="mask0_430_222" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="50" height="47"><path d="M49.212 0H0V46.186H49.212V0Z" fill="white"/></mask><g mask="url(#mask0_430_222)"><path d="M13.963 7.566L13.908 0.713L9.793 3.09L9.83 7.741L9.879 14.014C10.1025 16.779 10.6737 19.5048 11.579 22.127C12.4697 24.7629 13.7898 27.2335 15.486 29.439C16.7718 31.1833 18.3514 32.6904 20.154 33.893C21.5749 34.8781 23.1144 35.6801 24.736 36.28C26.4245 37.1082 28.2824 37.5327 30.163 37.52C31.7018 37.5156 33.2335 37.3119 34.72 36.914C36.044 36.586 37.3305 36.1218 38.559 35.529C39.4969 35.0394 40.3991 34.4843 41.259 33.868C39.8533 35.7571 38.1292 37.3868 36.164 38.684C34.461 39.7499 32.6212 40.5798 30.695 41.151C28.8955 41.7105 27.0261 42.0135 25.142 42.051C23.5615 42.0491 21.9849 41.8947 20.434 41.59C18.391 41.0003 16.4402 40.1286 14.638 39C12.8174 37.6829 11.1964 36.11 9.825 34.33C8.71344 32.9185 7.79066 31.3681 7.08 29.718C6.20144 28.0159 5.49494 26.2304 4.971 24.388C4.52882 23.2019 4.27835 21.9529 4.229 20.688L4.116 6.367L0 8.744L0.078 18.622C0.078 18.622 0.753 29.39 3.643 33.428C6.981 38.118 8.102 38.835 8.078 38.764C8.678 39.352 10.061 40.673 10.806 41.237C11.8791 42.0598 13.0041 42.8127 14.174 43.491C15.5175 44.1426 16.9033 44.7031 18.322 45.169C19.5382 45.5334 20.7791 45.8094 22.035 45.995L22.086 46.001C23.0154 46.1124 23.95 46.1741 24.886 46.186C26.2956 46.1987 27.7028 46.0684 29.086 45.797C30.439 45.497 32.145 44.989 33.354 44.623C34.5744 44.1743 35.7613 43.6397 36.906 43.023C38.2518 42.2383 39.532 41.3461 40.734 40.355C42.5189 38.8015 44.0881 37.0163 45.4 35.047C45.8893 34.2365 46.3346 33.4003 46.734 32.542C47.2797 31.3828 47.7474 30.1885 48.134 28.967C48.42 27.9808 48.6501 26.9792 48.823 25.967V25.951C49.0749 24.3039 49.2039 22.6403 49.209 20.974L49.073 0H44.991L45.007 3.115L45.044 16.8C45.0397 18.5627 44.79 20.3162 44.302 22.01C43.68 24.581 41.675 28.717 38.668 30.68C37.7472 31.3371 36.7452 31.8722 35.687 32.272C34.0428 32.8918 32.3163 33.2658 30.563 33.382C28.4661 33.3266 26.4112 32.7811 24.563 31.789C22.903 30.9755 21.3983 29.8776 20.117 28.545C19.2961 27.6227 18.5281 26.6544 17.817 25.645C18.7674 26.2113 19.7471 26.7271 20.752 27.19C21.3335 27.4171 21.9303 27.6029 22.538 27.746C23.7976 28.0572 25.0943 28.1919 26.391 28.146C27.7115 28.1727 29.0294 28.0182 30.308 27.687C31.7257 27.2111 33.0652 26.528 34.283 25.66C35.6566 24.6376 36.8307 23.3716 37.747 21.925C38.4932 20.6969 39.1271 19.404 39.641 18.062C40.0251 16.8887 40.3488 15.6964 40.611 14.49C40.9915 12.7481 41.2382 10.9796 41.349 9.2L41.319 5.351L37.185 5.384L37.2 7.6C37.2934 10.8651 36.7377 14.1163 35.565 17.165C33.186 22.887 29.205 24.272 26.495 24.08C20.437 24.199 17.407 19.661 16.395 17.531C15.4306 15.5543 14.7654 13.4453 14.421 11.273C14.1344 10.06 13.9812 8.81929 13.964 7.573" fill="#383838"/></g></g><defs><clipPath id="clip0_430_222"><rect width="49.212" height="46.186" fill="white"/></clipPath></defs></svg>',
  description: 'The blockchain social network',
  recommendedInjectedWallets: [
    { name: 'MetaMask', url: 'https://metamask.io' }
  ]
}

/**
 * @typedef {Object} ContractInfo
 * @property {string} utonomaAddress - Address of the contract.
 * @property {string} utonomaSymbol - Symbol of the token.
 * @property {number} tokenDecimals - Decimals of the Nomax token.
 * @property {Array} utonomaAbi - ABI of the Utonoma smart contract.
 * @type {ContractInfo}
 */
export const contractInfo = {
  utonomaAddress: '0xBF3089759edC8152ADE63270f98546fCdd71D34e',
  utonomaSymbol: 'Nomax',
  utonomaTokenDecimals: 18,
  dexLink : 'https://pancakeswap.finance/',
  utonomaAbi: [
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "name_",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "symbol_",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "initialSupply",
          "type": "uint256"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "spender",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "allowance",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "needed",
          "type": "uint256"
        }
      ],
      "name": "ERC20InsufficientAllowance",
      "type": "error"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "sender",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "balance",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "needed",
          "type": "uint256"
        }
      ],
      "name": "ERC20InsufficientBalance",
      "type": "error"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "approver",
          "type": "address"
        }
      ],
      "name": "ERC20InvalidApprover",
      "type": "error"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "receiver",
          "type": "address"
        }
      ],
      "name": "ERC20InvalidReceiver",
      "type": "error"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "sender",
          "type": "address"
        }
      ],
      "name": "ERC20InvalidSender",
      "type": "error"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "spender",
          "type": "address"
        }
      ],
      "name": "ERC20InvalidSpender",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "EnforcedPause",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "ExpectedPause",
      "type": "error"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "spender",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "value",
          "type": "uint256"
        }
      ],
      "name": "Approval",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "account",
          "type": "address"
        }
      ],
      "name": "Paused",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "value",
          "type": "uint256"
        }
      ],
      "name": "Transfer",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "account",
          "type": "address"
        }
      ],
      "name": "Unpaused",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "bytes32",
          "name": "content",
          "type": "bytes32"
        },
        {
          "indexed": false,
          "internalType": "bytes32",
          "name": "metadata",
          "type": "bytes32"
        },
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "index",
          "type": "uint256"
        },
        {
          "indexed": true,
          "internalType": "uint8",
          "name": "contentType",
          "type": "uint8"
        }
      ],
      "name": "deleted",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "index",
          "type": "uint256"
        },
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "contentType",
          "type": "uint256"
        }
      ],
      "name": "disliked",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "index",
          "type": "uint256"
        },
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "contentType",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "harvested",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "index",
          "type": "uint256"
        },
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "contentType",
          "type": "uint256"
        }
      ],
      "name": "liked",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "replyIndex",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "replyContentType",
          "type": "uint256"
        },
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "replyingToIndex",
          "type": "uint256"
        },
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "replyingToContentType",
          "type": "uint256"
        }
      ],
      "name": "replied",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "contentCreator",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "index",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "contentType",
          "type": "uint256"
        }
      ],
      "name": "uploaded",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "spender",
          "type": "address"
        }
      ],
      "name": "allowance",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "spender",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "value",
          "type": "uint256"
        }
      ],
      "name": "approve",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "account",
          "type": "address"
        }
      ],
      "name": "balanceOf",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "baseReward",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "pure",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "usersNumber",
          "type": "uint256"
        }
      ],
      "name": "calculateFee",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "pure",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint64",
          "name": "numberOfStrikes",
          "type": "uint64"
        },
        {
          "internalType": "uint256",
          "name": "usersNumber",
          "type": "uint256"
        }
      ],
      "name": "calculateFeeForUsersWithStrikes",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "pure",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "fee",
          "type": "uint256"
        }
      ],
      "name": "calculateFeeToBurn",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "pure",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "usersNumber",
          "type": "uint256"
        }
      ],
      "name": "calculateReward",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "pure",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "commissionByBaseReward",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "pure",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes15",
          "name": "proposedUserName",
          "type": "bytes15"
        },
        {
          "internalType": "bytes32",
          "name": "metadata",
          "type": "bytes32"
        }
      ],
      "name": "createUser",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "currentPeriodMAU",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "decimals",
      "outputs": [
        {
          "internalType": "uint8",
          "name": "",
          "type": "uint8"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "index",
              "type": "uint256"
            },
            {
              "internalType": "enum ContentStorage.ContentTypes",
              "name": "contentType",
              "type": "uint8"
            }
          ],
          "internalType": "struct ContentStorage.Identifier",
          "name": "id",
          "type": "tuple"
        }
      ],
      "name": "deletion",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "index",
              "type": "uint256"
            },
            {
              "internalType": "enum ContentStorage.ContentTypes",
              "name": "contentType",
              "type": "uint8"
            }
          ],
          "internalType": "struct ContentStorage.Identifier",
          "name": "id",
          "type": "tuple"
        }
      ],
      "name": "dislike",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "index",
              "type": "uint256"
            },
            {
              "internalType": "enum ContentStorage.ContentTypes",
              "name": "contentType",
              "type": "uint8"
            }
          ],
          "internalType": "struct ContentStorage.Identifier",
          "name": "id",
          "type": "tuple"
        }
      ],
      "name": "getContentById",
      "outputs": [
        {
          "components": [
            {
              "internalType": "address",
              "name": "contentOwner",
              "type": "address"
            },
            {
              "internalType": "bytes32",
              "name": "contentHash",
              "type": "bytes32"
            },
            {
              "internalType": "bytes32",
              "name": "metadataHash",
              "type": "bytes32"
            },
            {
              "internalType": "uint64",
              "name": "likes",
              "type": "uint64"
            },
            {
              "internalType": "uint64",
              "name": "dislikes",
              "type": "uint64"
            },
            {
              "internalType": "uint64",
              "name": "harvestedLikes",
              "type": "uint64"
            },
            {
              "internalType": "uint256[]",
              "name": "replyingTo",
              "type": "uint256[]"
            },
            {
              "internalType": "uint8[]",
              "name": "replyingToContentType",
              "type": "uint8[]"
            },
            {
              "internalType": "uint256[]",
              "name": "repliedBy",
              "type": "uint256[]"
            },
            {
              "internalType": "uint8[]",
              "name": "repliedByContentType",
              "type": "uint8[]"
            }
          ],
          "internalType": "struct ContentStorage.Content",
          "name": "",
          "type": "tuple"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "enum ContentStorage.ContentTypes",
          "name": "contentType",
          "type": "uint8"
        }
      ],
      "name": "getContentLibraryLength",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "index",
              "type": "uint256"
            },
            {
              "internalType": "enum ContentStorage.ContentTypes",
              "name": "contentType",
              "type": "uint8"
            }
          ],
          "internalType": "struct ContentStorage.Identifier",
          "name": "id",
          "type": "tuple"
        }
      ],
      "name": "getContentsRepliedByThis",
      "outputs": [
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "index",
              "type": "uint256"
            },
            {
              "internalType": "enum ContentStorage.ContentTypes",
              "name": "contentType",
              "type": "uint8"
            }
          ],
          "internalType": "struct ContentStorage.Identifier[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "account",
          "type": "address"
        }
      ],
      "name": "getLatestInteractionTime",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getMaxContentTypes",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "pure",
      "type": "function"
    },
    {
      "inputs": [
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "index",
              "type": "uint256"
            },
            {
              "internalType": "enum ContentStorage.ContentTypes",
              "name": "contentType",
              "type": "uint8"
            }
          ],
          "internalType": "struct ContentStorage.Identifier",
          "name": "id",
          "type": "tuple"
        }
      ],
      "name": "getRepliesToThisContent",
      "outputs": [
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "index",
              "type": "uint256"
            },
            {
              "internalType": "enum ContentStorage.ContentTypes",
              "name": "contentType",
              "type": "uint8"
            }
          ],
          "internalType": "struct ContentStorage.Identifier[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes15",
          "name": "requestedUserName",
          "type": "bytes15"
        }
      ],
      "name": "getUserNameOwner",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "account",
          "type": "address"
        }
      ],
      "name": "getUserProfile",
      "outputs": [
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "latestInteraction",
              "type": "uint256"
            },
            {
              "internalType": "bytes32",
              "name": "userMetadataHash",
              "type": "bytes32"
            },
            {
              "internalType": "bytes15",
              "name": "userName",
              "type": "bytes15"
            },
            {
              "internalType": "uint64",
              "name": "strikes",
              "type": "uint64"
            }
          ],
          "internalType": "struct Users.UserProfile",
          "name": "",
          "type": "tuple"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "index",
              "type": "uint256"
            },
            {
              "internalType": "enum ContentStorage.ContentTypes",
              "name": "contentType",
              "type": "uint8"
            }
          ],
          "internalType": "struct ContentStorage.Identifier",
          "name": "id",
          "type": "tuple"
        }
      ],
      "name": "harvestLikes",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "historicMAUData",
      "outputs": [
        {
          "internalType": "uint256[]",
          "name": "",
          "type": "uint256[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes15",
          "name": "userName",
          "type": "bytes15"
        }
      ],
      "name": "isValidUserName",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "pure",
      "type": "function"
    },
    {
      "inputs": [
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "index",
              "type": "uint256"
            },
            {
              "internalType": "enum ContentStorage.ContentTypes",
              "name": "contentType",
              "type": "uint8"
            }
          ],
          "internalType": "struct ContentStorage.Identifier",
          "name": "id",
          "type": "tuple"
        }
      ],
      "name": "like",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "minimumQuorum",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "pure",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "name",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "pause",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "paused",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "index",
              "type": "uint256"
            },
            {
              "internalType": "enum ContentStorage.ContentTypes",
              "name": "contentType",
              "type": "uint8"
            }
          ],
          "internalType": "struct ContentStorage.Identifier",
          "name": "replyId",
          "type": "tuple"
        },
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "index",
              "type": "uint256"
            },
            {
              "internalType": "enum ContentStorage.ContentTypes",
              "name": "contentType",
              "type": "uint8"
            }
          ],
          "internalType": "struct ContentStorage.Identifier",
          "name": "replyingToId",
          "type": "tuple"
        }
      ],
      "name": "reply",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "likes",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "dislikes",
          "type": "uint256"
        }
      ],
      "name": "shouldContentBeEliminated",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "pure",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "startTimeOfTheNetwork",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "symbol",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "totalSupply",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "value",
          "type": "uint256"
        }
      ],
      "name": "transfer",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "value",
          "type": "uint256"
        }
      ],
      "name": "transferFrom",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "metadata",
          "type": "bytes32"
        }
      ],
      "name": "updateUserMetadataHash",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "contentHash",
          "type": "bytes32"
        },
        {
          "internalType": "bytes32",
          "name": "metadataHash",
          "type": "bytes32"
        },
        {
          "internalType": "enum ContentStorage.ContentTypes",
          "name": "contentType",
          "type": "uint8"
        }
      ],
      "name": "upload",
      "outputs": [
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "index",
              "type": "uint256"
            },
            {
              "internalType": "enum ContentStorage.ContentTypes",
              "name": "contentType",
              "type": "uint8"
            }
          ],
          "internalType": "struct ContentStorage.Identifier",
          "name": "",
          "type": "tuple"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "index",
              "type": "uint256"
            },
            {
              "internalType": "enum ContentStorage.ContentTypes",
              "name": "contentType",
              "type": "uint8"
            }
          ],
          "internalType": "struct ContentStorage.Identifier",
          "name": "id",
          "type": "tuple"
        }
      ],
      "name": "voluntarilyDelete",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "withdraw",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ]
}