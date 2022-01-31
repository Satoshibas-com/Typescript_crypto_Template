var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
let web3Provider = {
    connect: () => __awaiter(void 0, void 0, void 0, function* () {
        let web3 = new Web3(new Web3.providers.HttpProvider("https://data-seed-prebsc-1-s1.binance.org:8545/"));
        if (window.ethereum) {
            console.log("Browser injected web3 'ethereum'");
            try {
                yield window.ethereum.enable();
                web3 = new Web3(window.ethereum);
            }
            catch (error) {
                console.log(error);
            }
        }
        else {
        }
        return web3;
    }),
    web3: undefined
};
export default web3Provider;
//# sourceMappingURL=web3Provider.js.map