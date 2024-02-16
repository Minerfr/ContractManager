require("@nomiclabs/hardhat-etherscan");
require("@nomiclabs/hardhat-waffle");
// const hre = require("hardhat");
const PRIVATE_KEY = "cd9f703c0a8d23d5f0243301fee3f2d44725dacfdce969d7ad3b4c093f04eb80";
module.exports = {
  solidity: "0.8.20",
  settings: {
    optimizer: { enabled: true, runs: 2002, details: { yul: false }, },
      viaIR: true,
      allowUnlimitedContractSize: true
    },
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545",
      gas: 210,
      gasPrice: 8000000000000,
    },
    // hardhat: {
    //   chainId: 31337,
    //   gas: 2100000,
    //   gasPrice: 8000000000,
    //     allowUnlimitedContractSize: true
    // },
    polygon_mumbai: {
      url: "https://rpc-mumbai.maticvigil.com",
      accounts: [PRIVATE_KEY],
    },
  },
  etherscan: {
    apiKey:"RPJDUFPQCNXJUGTWR7HQZVDANGD4CN9KC1"
  },
  }