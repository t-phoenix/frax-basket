# Frax Basket Hardhat Project

This Repository contains Smart Contracts and deployment script.
Inspired by Index Coop Token Sets Protocol V2 Smart Contract Library to develop Investment Funds.

## Tech

- **Fraxtal Chain** - Fraxtal is a modular rollup blockchain (L2) with a "fractal scaling" roadmap.
- **Set Protocol V2** - Set Protocol is a web3 asset management platform that provides financial infrastructure tooling to everyone.
- **OpenZeppelin** - OpenZeppelin Contracts helps you minimize risk by using battle-tested libraries of smart contracts for Ethereum and other blockchains. It includes the most used implementations of ERC standards.
- **Hardhat** - Hardhat is a development environment for Ethereum software.
- **Ethers.js** - library aims to be a complete and compact library for interacting with the Ethereum Blockchain and its ecosystem.
- **FraxScan** - Fraxscan allows you to explore and search the Fraxtal Mainnet Network for transactions, addresses, tokens, prices and other activities
- **FraxSwap** - AMM and TWAMM token swapping platform.
- **Solidity** - Solidity is a statically-typed curly-braces programming language designed for developing smart contracts that run on Ethereum.

# Get Started

```
Run yarn install or yarn to install necessary modules
```

Create .env file and add following variables:

- ACCOUNT_1 = '0xaddress'
- PRIVATE_KEY1 = 'your key'
- FRAXSCAN_API_KEY = 'for contract verification'

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat ignition deploy ./ignition/modules/Lock.js
```

# Smart Contract Ecosystem

- Controller
- Set Token (ERC20) act as frxBASKET
- Integration Registry (Resource)
- Price Oracle (Resource)
- Set Valuer (Resource)
- Basic Issuance Module: Used to mind/ redeem frxBASKET with all of its components in proportionate order
- NAV Issuance Module: This module allows users to mint/ redeem using only single allowed token.
- General Index Module: This is a system contract which is used to rebalance the Fund. Only Fund Manager can start Rebalancing.

# Commands

```shell
- yarn hardhat run --network testnet scripts/deploy.js
- yarn hardhat verify --network testnet <address> <constructor input opcode>
Example:
- yarn hardhat verify --network mainnet 0xE98F36e22e4e13a123f325e1B52108765e133eAe "Frax Basket" "FRXB"
```
