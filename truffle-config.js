const HDWalletProvider = require("@truffle/hdwallet-provider");
path = require("path")
const dotenv = require('dotenv');
result = dotenv.config({ path: "./.env" });
if (result.error) {
    console.log("Fail to load .env varilable: truffle-config.js")
    throw result.error
}

module.exports = {
  contracts_build_directory: path.join(__dirname, "src/contracts"),
  networks: {
    development: {
      host: "localhost",
      // port: 7545,     // Ganache desktop
      port: 8545,     // Ganache cli
      network_id: '*', // Match any network id
      gas: 6641380,
      gasPrice: 5000000000 // 5 gwei
    },

    /* Offical BSC doc & tools:
    ** truffle: https://docs.binance.org/smart-chain/developer/deploy/truffle.html
    ** developer: https://docs.binance.org/smart-chain/developer/rpc.html
    ** testnet faucet: https://testnet.binance.org/faucet-smart
    */ 
    bsctestnet: {
      provider: () => new HDWalletProvider( process.env.PRIVATE_KEY, `https://data-seed-prebsc-2-s3.binance.org:8545`, 0),
      network_id: 97,
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true
    },
    kcctestnet: {
      provider: () => new HDWalletProvider(process.env.PRIVATE_KEY, `https://rpc-testnet.kcc.network`, 0),
      network_id: 322,
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true
    },
    bscmainnet: {
      // provider: () => new HDWalletProvider(process.env.PRIVATE_KEY, `https://bsc-dataseed1.binance.org`, 0),
      provider: () => new HDWalletProvider(process.env.PRIVATE_KEY, `https://speedy-nodes-nyc.moralis.io/244938941b19b23b7f1364ff/bsc/mainnet/archive`, 0),
      network_id: 56,
      confirmations: 10,
      timeoutBlocks: 200,
      skipDryRun: true
    },
  },
  mocha: {
    enableTimeouts: false,
    before_timeout: 30000000000000 // Here is 2min but can be whatever timeout is suitable for you.
  },
  compilers: {
    solc: {
      version: "0.8.7",    // Fetch exact version from solc-bin (default: truffle's version)
    },
  },
  solc: {
    optimizer: {
      enabled: true,
      runs: 200
    }
  },
  plugins: [
    'truffle-plugin-verify'
  ],
  api_keys: {
    bscscan: process.env.BSCSCAN_API,
    etherscan: process.env.ETHSCAN_API,
  }
}