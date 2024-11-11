export const utonomaSepoliaAddress = '0xBed329C06DD3C5ddB7DFbd7597Bd552b2Fb3863D'

export const dexLink = `https://pancakeswap.finance/swap?chain=scrollSepolia&outputCurrency=${utonomaSepoliaAddress}`

export const contractDeployedInBlock = 6940955

export const utonomaABI = [
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
		"inputs": [],
		"name": "getMinContentTypes",
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
				"name": "userName",
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
	}
]