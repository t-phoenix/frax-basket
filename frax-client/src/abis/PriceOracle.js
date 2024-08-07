export const PriceOracleABI = [
    {
      "inputs": [
        {
          "internalType": "contract IController",
          "name": "_controller",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "_masterQuoteAsset",
          "type": "address"
        },
        {
          "internalType": "address[]",
          "name": "_adapters",
          "type": "address[]"
        },
        {
          "internalType": "address[]",
          "name": "_assetOnes",
          "type": "address[]"
        },
        {
          "internalType": "address[]",
          "name": "_assetTwos",
          "type": "address[]"
        },
        {
          "internalType": "contract IOracle[]",
          "name": "_oracles",
          "type": "address[]"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "_adapter",
          "type": "address"
        }
      ],
      "name": "AdapterAdded",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "_adapter",
          "type": "address"
        }
      ],
      "name": "AdapterRemoved",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "_newMasterQuote",
          "type": "address"
        }
      ],
      "name": "MasterQuoteAssetEdited",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "previousOwner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "OwnershipTransferred",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "_assetOne",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "_assetTwo",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "_oracle",
          "type": "address"
        }
      ],
      "name": "PairAdded",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "_assetOne",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "_assetTwo",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "_newOracle",
          "type": "address"
        }
      ],
      "name": "PairEdited",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "_assetOne",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "_assetTwo",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "_oracle",
          "type": "address"
        }
      ],
      "name": "PairRemoved",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "adapters",
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
          "name": "_adapter",
          "type": "address"
        }
      ],
      "name": "addAdapter",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_assetOne",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "_assetTwo",
          "type": "address"
        },
        {
          "internalType": "contract IOracle",
          "name": "_oracle",
          "type": "address"
        }
      ],
      "name": "addPair",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "controller",
      "outputs": [
        {
          "internalType": "contract IController",
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
          "name": "_newMasterQuoteAsset",
          "type": "address"
        }
      ],
      "name": "editMasterQuoteAsset",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_assetOne",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "_assetTwo",
          "type": "address"
        },
        {
          "internalType": "contract IOracle",
          "name": "_oracle",
          "type": "address"
        }
      ],
      "name": "editPair",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getAdapters",
      "outputs": [
        {
          "internalType": "address[]",
          "name": "",
          "type": "address[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_assetOne",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "_assetTwo",
          "type": "address"
        }
      ],
      "name": "getPrice",
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
      "name": "masterQuoteAsset",
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
          "name": "",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "oracles",
      "outputs": [
        {
          "internalType": "contract IOracle",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "owner",
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
          "name": "_adapter",
          "type": "address"
        }
      ],
      "name": "removeAdapter",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_assetOne",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "_assetTwo",
          "type": "address"
        }
      ],
      "name": "removePair",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "renounceOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "transferOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ]