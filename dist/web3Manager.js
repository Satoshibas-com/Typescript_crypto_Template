var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import IERC20Json from "./contracts/IERC20.js";
class Web3Manager {
    constructor() {
        this.defaultWeb3 = new Web3(new Web3.providers.HttpProvider("https://data-seed-prebsc-1-s1.binance.org:8545/"));
        this.web3 = this.defaultWeb3;
        this.accounts = [];
        this.tokenAddr = "0x96c9154A624b78AF6faa25D38DC45ca0da3A96A6";
        this.listeners = [];
        this.genContracts();
    }
    static getInstance() {
        if (this.web3Manager) {
            return this.web3Manager;
        }
        else {
            this.web3Manager = new Web3Manager();
            return this.web3Manager;
        }
    }
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            let web3 = undefined;
            if (window.ethereum) {
                console.log("Browser injected web3 'ethereum'");
                try {
                    yield window.ethereum.enable();
                    ethereum.on('accountsChanged', (account) => {
                        alert(` Account switched ${account}\nWe will log you out first `);
                        this.disconnect();
                    });
                    web3 = new Web3(window.ethereum);
                    this.web3 = web3;
                    let accounts = yield web3.eth.getAccounts();
                    if (!this.accounts || this.accounts[0] !== accounts[0]) {
                        this.web3 == web3;
                        this.accounts = accounts;
                        this.web3Changed(web3);
                    }
                }
                catch (error) {
                    console.log(error);
                    web3 = this.defaultWeb3;
                }
            }
            else {
            }
        });
    }
    genContracts() {
        let token = new this.web3.eth.Contract(IERC20Json.abi, this.tokenAddr);
        this.token = token;
    }
    disconnect() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.web3 && (yield this.web3._provider.disconnect());
            }
            catch (e) {
                this.web3 && this.web3.eth.accounts.wallet.clear();
            }
            this.web3 = new Web3(new Web3.providers.HttpProvider("https://data-seed-prebsc-1-s1.binance.org:8545/"));
            this.accounts = [];
            this.web3Changed(this.web3);
        });
    }
    onWeb3Changed(evtFunc) {
        this.listeners = [...this.listeners, evtFunc];
    }
    web3Changed(web3) {
        this.genContracts();
        for (let listener of this.listeners) {
            listener(web3);
        }
    }
    isConnected() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            return (yield ((_a = this.web3) === null || _a === void 0 ? void 0 : _a.eth.getAccounts())).length > 0 ? true : false;
        });
    }
}
export default Web3Manager;
//# sourceMappingURL=web3Manager.js.map