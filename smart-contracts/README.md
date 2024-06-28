# Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a Hardhat Ignition module that deploys that contract.

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
- yarn hardhat verify --network bscTestnet 0xE98F36e22e4e13a123f325e1B52108765e133eAe "Wrapped Ethereum" "wETH"
```
