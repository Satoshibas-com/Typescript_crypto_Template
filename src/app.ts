
import Web3Manager from "./web3Manager.js";

enum PageEnum { home }
// const getBaseDir: ()=>string = () => window.location.href.slice(0, -window.location.pathname.length)

abstract class Component<T extends HTMLElement, U extends HTMLElement> {
    templateElement: HTMLTemplateElement;
    hostElement: T;
    element: U;
    constructor (templateId: string, hostEleId: string, insertAtBegining: boolean , newEleId?: string) {
        this.templateElement = document.getElementById(templateId)! as HTMLTemplateElement;
        this.hostElement = document.getElementById(hostEleId)! as T;
        const importedNode = document.importNode(this.templateElement.content, true);
        this.element = importedNode.firstElementChild as U;
        if (newEleId) { this.element.id = newEleId };
        this.hostElement.insertAdjacentElement(insertAtBegining ? "afterbegin" : "beforeend", this.element);
        this.onListenChanges()
    }


    async loadSth(task: Function) {
        let spinner = new Spinner()
        await task().then(()=>{spinner.remove()}, (e: any)=>{spinner.remove(); console.log(e)})
    }
    hide() {this.element.hidden = true}
    show() {this.element.hidden = false}
    remove() {this.element.remove()}
    onListenChanges(){};
}

class Header extends Component<HTMLBodyElement, HTMLElement> {
    homePage: Home
    
    constructor(home: Home) {
        super("header", "body", true, "navBar")
        this.homePage = home
        Web3Manager.getInstance().onWeb3Changed(async ()=>{
            let isConnected = await Web3Manager.getInstance().isConnected()
            this.element.getElementsByClassName("connect-disconnect")[0].innerHTML = isConnected ? "DISCONNECT" : "CONNECT"
            if (!isConnected) {this.selectPage(PageEnum.home)}
        })
    }
    selectPage(pageId: PageEnum) {
        let pages = [this.homePage]
        pages.forEach((page, id)=>{
            if (pageId === id) {
                page.show()
            } else {page.hide()}
        })
    }

    onListenChanges(): void {
        this.element.getElementsByClassName("go-to-home")[0].addEventListener("click", ()=>{   
            this.selectPage(PageEnum.home)
        })
        this.element.getElementsByClassName("connect-disconnect")[0].addEventListener("click", async ()=>{   
            let buttonName = this.element.getElementsByClassName("connect-disconnect")[0].innerHTML
            if (buttonName === "CONNECT") {
                Web3Manager.getInstance().connect()
            } else {
                Web3Manager.getInstance().disconnect()
            }
        })
    }
}

class Footer extends Component<HTMLBodyElement, HTMLElement> {
    constructor() {
        super("footer", "body", false, "footer")
    }
}

class Home extends Component<HTMLDivElement, HTMLDivElement> {
    constructor () {
        super("home", "container", true)
    }
}

class Spinner extends Component<HTMLDivElement, HTMLDivElement> {
    constructor(){
        super("loading-spinner", "container", true)
        this.hide()
    }
}

function main() {
    let home = new Home()
    new Header(home)
    new Footer()
}

main()

