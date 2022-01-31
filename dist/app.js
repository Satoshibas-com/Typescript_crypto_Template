var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Web3Manager from "./web3Manager.js";
var PageEnum;
(function (PageEnum) {
    PageEnum[PageEnum["home"] = 0] = "home";
})(PageEnum || (PageEnum = {}));
class Component {
    constructor(templateId, hostEleId, insertAtBegining, newEleId) {
        this.templateElement = document.getElementById(templateId);
        this.hostElement = document.getElementById(hostEleId);
        const importedNode = document.importNode(this.templateElement.content, true);
        this.element = importedNode.firstElementChild;
        if (newEleId) {
            this.element.id = newEleId;
        }
        ;
        this.hostElement.insertAdjacentElement(insertAtBegining ? "afterbegin" : "beforeend", this.element);
        this.onListenChanges();
    }
    loadSth(task) {
        return __awaiter(this, void 0, void 0, function* () {
            let spinner = new Spinner();
            yield task().then(() => { spinner.remove(); }, (e) => { spinner.remove(); console.log(e); });
        });
    }
    hide() { this.element.hidden = true; }
    show() { this.element.hidden = false; }
    remove() { this.element.remove(); }
    onListenChanges() { }
    ;
}
class Header extends Component {
    constructor(home) {
        super("header", "body", true, "navBar");
        this.homePage = home;
        Web3Manager.getInstance().onWeb3Changed(() => __awaiter(this, void 0, void 0, function* () {
            let isConnected = yield Web3Manager.getInstance().isConnected();
            this.element.getElementsByClassName("connect-disconnect")[0].innerHTML = isConnected ? "DISCONNECT" : "CONNECT";
            if (!isConnected) {
                this.selectPage(PageEnum.home);
            }
        }));
    }
    selectPage(pageId) {
        let pages = [this.homePage];
        pages.forEach((page, id) => {
            if (pageId === id) {
                page.show();
            }
            else {
                page.hide();
            }
        });
    }
    onListenChanges() {
        this.element.getElementsByClassName("go-to-home")[0].addEventListener("click", () => {
            this.selectPage(PageEnum.home);
        });
        this.element.getElementsByClassName("connect-disconnect")[0].addEventListener("click", () => __awaiter(this, void 0, void 0, function* () {
            let buttonName = this.element.getElementsByClassName("connect-disconnect")[0].innerHTML;
            if (buttonName === "CONNECT") {
                Web3Manager.getInstance().connect();
            }
            else {
                Web3Manager.getInstance().disconnect();
            }
        }));
    }
}
class Footer extends Component {
    constructor() {
        super("footer", "body", false, "footer");
    }
}
class Home extends Component {
    constructor() {
        super("home", "container", true);
    }
}
class Spinner extends Component {
    constructor() {
        super("loading-spinner", "container", true);
        this.hide();
    }
}
function main() {
    let home = new Home();
    new Header(home);
    new Footer();
}
main();
//# sourceMappingURL=app.js.map