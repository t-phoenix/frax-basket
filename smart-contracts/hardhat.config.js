const { latest } = require("@nomicfoundation/hardhat-network-helpers/dist/src/helpers/time");

require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config();


/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  sourcify: {
    enabled: false,
  },
  etherscan: {
    apiKey: {
      fraxtal: process.env.FRAXSCAN_API_KEY
    },
    customChains:[
      {
        network: "fraxtal",
        chainId: 252,
        urls: {
          apiURL: "https://api.fraxscan.com/api",
          browserURL: "https://fraxscan.com/"
        }
      }
    ]
  },
  solidity: {
    version: "0.6.10",
    settings: {
      optimizer: {
        enabled: true,
        runs: 20000
      }
    }
  },
  defaultNetwork: 'hardhat',
  networks: {
    hardhat: {
      //forking frax mainnet 
      forking: {
        url: "https://rpc.frax.com",
        blockNumber: 6168539,
      },
      chains: {
        252: {
          hardforkHistory: {
            london: 6168539
          }
        }
      }
    },
    mainnet: {
      url: "https://rpc.frax.com",
      chainId: 252,
      accounts: [process.env.PRIVATE_KEY1]
    }
  }
};


// old block forking history
// 5747366
