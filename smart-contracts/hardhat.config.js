const { latest } = require("@nomicfoundation/hardhat-network-helpers/dist/src/helpers/time");

require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
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
  }
};


// old block forking history
// 5747366
