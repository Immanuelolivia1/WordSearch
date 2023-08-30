require("@nomicfoundation/hardhat-toolbox");

require("dotenv").config();
const ACCOUNT_PRIVATE_KEY = process.env.ACCOUNT_PRIVATE_KEY;
const ALCHEMY_MUMBAI_API_KEY_URL = process.env.ALCHEMY_MUMBAI_API_KEY_URL;

/** @type import('hardhat/config').HardhatUserConfig */
// module.exports = {
//   solidity: "0.8.18",
//   optimizer: true,
//   networks: {
//     hardhat: {
//       chainId: 80001,
//     },
//     testnet_mubia: {
//       url: ALCHEMY_MUMBAI_API_KEY_URL,
//       accounts: [`0x${ACCOUNT_PRIVATE_KEY}`],
//     },
//   },
// };

module.exports = {
  defaultNetwork: "testnet_mumbai",
  networks: {
    hardhat: {
      chainId: 80001,
    },
    testnet_mumbai: {
      url: ALCHEMY_MUMBAI_API_KEY_URL,
      accounts: [`0x${ACCOUNT_PRIVATE_KEY}`],
    }
  },
  solidity: {
    version: "0.8.19",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts"
  },
  mocha: {
    timeout: 40000
  }
}