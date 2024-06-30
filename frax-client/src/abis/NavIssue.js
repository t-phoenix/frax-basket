export const NavIssueABI = [
    {
      "inputs": [
        {
          "internalType": "contract IController",
          "name": "_controller",
          "type": "address"
        },
        {
          "internalType": "contract IWETH",
          "name": "_weth",
          "type": "address"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "contract ISetToken",
          "name": "_setToken",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "_feeRecipient",
          "type": "address"
        }
      ],
      "name": "FeeRecipientEdited",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "contract ISetToken",
          "name": "_setToken",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "_newManagerFee",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "_index",
          "type": "uint256"
        }
      ],
      "name": "ManagerFeeEdited",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "contract ISetToken",
          "name": "_setToken",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "_newPremium",
          "type": "uint256"
        }
      ],
      "name": "PremiumEdited",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "contract ISetToken",
          "name": "_setToken",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "_newReserveAsset",
          "type": "address"
        }
      ],
      "name": "ReserveAssetAdded",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "contract ISetToken",
          "name": "_setToken",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "_removedReserveAsset",
          "type": "address"
        }
      ],
      "name": "ReserveAssetRemoved",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "contract ISetToken",
          "name": "_setToken",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "_issuer",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "_to",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "_reserveAsset",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "_hookContract",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "_setTokenQuantity",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "_managerFee",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "_premium",
          "type": "uint256"
        }
      ],
      "name": "SetTokenNAVIssued",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "contract ISetToken",
          "name": "_setToken",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "_redeemer",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "_to",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "_reserveAsset",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "_hookContract",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "_setTokenQuantity",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "_managerFee",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "_premium",
          "type": "uint256"
        }
      ],
      "name": "SetTokenNAVRedeemed",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "contract ISetToken",
          "name": "_setToken",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "_reserveAsset",
          "type": "address"
        }
      ],
      "name": "addReserveAsset",
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
          "internalType": "contract ISetToken",
          "name": "_setToken",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "_managerFeeRecipient",
          "type": "address"
        }
      ],
      "name": "editFeeRecipient",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "contract ISetToken",
          "name": "_setToken",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "_managerFeePercentage",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_managerFeeIndex",
          "type": "uint256"
        }
      ],
      "name": "editManagerFee",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "contract ISetToken",
          "name": "_setToken",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "_premiumPercentage",
          "type": "uint256"
        }
      ],
      "name": "editPremium",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "contract ISetToken",
          "name": "_setToken",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "_reserveAsset",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "_setTokenQuantity",
          "type": "uint256"
        }
      ],
      "name": "getExpectedReserveRedeemQuantity",
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
          "internalType": "contract ISetToken",
          "name": "_setToken",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "_reserveAsset",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "_reserveAssetQuantity",
          "type": "uint256"
        }
      ],
      "name": "getExpectedSetTokenIssueQuantity",
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
          "internalType": "contract ISetToken",
          "name": "_setToken",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "_reserveAsset",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "_reserveAssetQuantity",
          "type": "uint256"
        }
      ],
      "name": "getIssuePremium",
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
          "internalType": "contract ISetToken",
          "name": "_setToken",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "_managerFeeIndex",
          "type": "uint256"
        }
      ],
      "name": "getManagerFee",
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
          "internalType": "contract ISetToken",
          "name": "_setToken",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "_reserveAsset",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "_setTokenQuantity",
          "type": "uint256"
        }
      ],
      "name": "getRedeemPremium",
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
          "internalType": "contract ISetToken",
          "name": "_setToken",
          "type": "address"
        }
      ],
      "name": "getReserveAssets",
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
          "internalType": "contract ISetToken",
          "name": "_setToken",
          "type": "address"
        },
        {
          "components": [
            {
              "internalType": "contract INAVIssuanceHook",
              "name": "managerIssuanceHook",
              "type": "address"
            },
            {
              "internalType": "contract INAVIssuanceHook",
              "name": "managerRedemptionHook",
              "type": "address"
            },
            {
              "internalType": "contract ISetValuer",
              "name": "setValuer",
              "type": "address"
            },
            {
              "internalType": "address[]",
              "name": "reserveAssets",
              "type": "address[]"
            },
            {
              "internalType": "address",
              "name": "feeRecipient",
              "type": "address"
            },
            {
              "internalType": "uint256[2]",
              "name": "managerFees",
              "type": "uint256[2]"
            },
            {
              "internalType": "uint256",
              "name": "maxManagerFee",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "premiumPercentage",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "maxPremiumPercentage",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "minSetTokenSupply",
              "type": "uint256"
            }
          ],
          "internalType": "struct CustomOracleNavIssuanceModule.NAVIssuanceSettings",
          "name": "_navIssuanceSettings",
          "type": "tuple"
        }
      ],
      "name": "initialize",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "contract ISetToken",
          "name": "_setToken",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "_reserveAsset",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "_reserveAssetQuantity",
          "type": "uint256"
        }
      ],
      "name": "isIssueValid",
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
          "internalType": "contract ISetToken",
          "name": "_setToken",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "_reserveAsset",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "_setTokenQuantity",
          "type": "uint256"
        }
      ],
      "name": "isRedeemValid",
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
          "internalType": "contract ISetToken",
          "name": "",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "isReserveAsset",
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
          "internalType": "contract ISetToken",
          "name": "_setToken",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "_reserveAsset",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "_reserveAssetQuantity",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_minSetTokenReceiveQuantity",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "_to",
          "type": "address"
        }
      ],
      "name": "issue",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "contract ISetToken",
          "name": "_setToken",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "_minSetTokenReceiveQuantity",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "_to",
          "type": "address"
        }
      ],
      "name": "issueWithEther",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "contract ISetToken",
          "name": "",
          "type": "address"
        }
      ],
      "name": "navIssuanceSettings",
      "outputs": [
        {
          "internalType": "contract INAVIssuanceHook",
          "name": "managerIssuanceHook",
          "type": "address"
        },
        {
          "internalType": "contract INAVIssuanceHook",
          "name": "managerRedemptionHook",
          "type": "address"
        },
        {
          "internalType": "contract ISetValuer",
          "name": "setValuer",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "feeRecipient",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "maxManagerFee",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "premiumPercentage",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "maxPremiumPercentage",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "minSetTokenSupply",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "contract ISetToken",
          "name": "_setToken",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "_reserveAsset",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "_setTokenQuantity",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_minReserveReceiveQuantity",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "_to",
          "type": "address"
        }
      ],
      "name": "redeem",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "contract ISetToken",
          "name": "_setToken",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "_setTokenQuantity",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_minReserveReceiveQuantity",
          "type": "uint256"
        },
        {
          "internalType": "address payable",
          "name": "_to",
          "type": "address"
        }
      ],
      "name": "redeemIntoEther",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "removeModule",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "contract ISetToken",
          "name": "_setToken",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "_reserveAsset",
          "type": "address"
        }
      ],
      "name": "removeReserveAsset",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "weth",
      "outputs": [
        {
          "internalType": "contract IWETH",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "stateMutability": "payable",
      "type": "receive"
    }
  ]