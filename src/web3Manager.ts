
import IERC20Json from "./contracts/IERC20.js"

class Web3Manager {
    defaultWeb3 = new Web3(new Web3.providers.HttpProvider("https://data-seed-prebsc-1-s1.binance.org:8545/"))
    web3: Web3 = this.defaultWeb3
    accounts: string[] = []
    token: any       
    tokenAddr = "0x96c9154A624b78AF6faa25D38DC45ca0da3A96A6"
    private static web3Manager: Web3Manager
    private listeners: ((web3: Web3|undefined) => void)[] = []
    private constructor() {
        this.genContracts()
    }
    static getInstance() {
        if (this.web3Manager) {
            return this.web3Manager
        } else {
            this.web3Manager = new Web3Manager()
            return this.web3Manager
        }
    }
    async connect() {
        // Wait for loading completion to avoid race conditions with web3 injection timing.        
        // Modern dapp browsers...
        let web3: (Web3 | undefined) = undefined
        if (window.ethereum) {
            console.log("Browser injected web3 'ethereum'")
            try {
                // Request account access if needed
                await window.ethereum.enable();
                ethereum.on('accountsChanged', (account: any) => {
                    alert(` Account switched ${account}\nWe will log you out first `)
                    this.disconnect()
                })
                web3 = new Web3(window.ethereum);
                this.web3 = web3!
                let accounts = await web3!.eth.getAccounts()
                if (!this.accounts||this.accounts[0] !== accounts[0]) {
                    this.web3 == web3 
                    this.accounts = accounts
                    this.web3Changed(web3)
                } 
            } catch (error) {
                console.log(error);
                web3 = this.defaultWeb3
            }
        }else {
            // try {
            //     console.log("Log in with walletConnect")
            //     const provider = await new WalletConnectProvider({
            //         rpc: {
            //             56: "https://bsc-dataseed1.binance.org",
            //             97: 'https://data-seed-prebsc-1-s1.binance.org:8545/',
            //         },
            //         chainId: chainId,
            //         // network: "binance",
            //         qrcode: true,
            //         qrcodeModalOptions: {
            //             mobileLinks: [
            //                 "metamask",
            //                 "trust",
            //             ]
            //         }
            //     });
            //     console.log(provider)
            //     await provider.enable();

            //     web3 = await new Web3(provider);
            //     resolve(web3)
            // } catch(e) {
            //     console.log(e)
            // }  
        }
    }
    private genContracts() {
        
        let token = new this.web3.eth.Contract(IERC20Json.abi, this.tokenAddr)
        this.token = token
    }

    async disconnect() {
        try {
            //@ts-ignore for walletconnect 
            this.web3 && await this.web3._provider.disconnect()
        } catch (e){
            //@ts-ignore Injected web3
            this.web3 && this.web3.eth.accounts.wallet.clear()
        }
        this.web3 = new Web3(new Web3.providers.HttpProvider("https://data-seed-prebsc-1-s1.binance.org:8545/"))
        this.accounts = []
        this.web3Changed(this.web3)
    }

    onWeb3Changed(evtFunc: (web3:Web3|undefined)=>void) {
        this.listeners = [...this.listeners, evtFunc]
    }
    web3Changed(web3: Web3 | undefined){
        this.genContracts()
        for (let listener of this.listeners) {
            listener(web3)
        }
    }
    async isConnected(): Promise<boolean> {
        return (await this.web3?.eth.getAccounts()).length > 0 ? true : false
    }
}

export default Web3Manager
