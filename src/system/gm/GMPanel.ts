import CLabel from "../display/compoment/CLabel";
import Box from "../display/compoment/ui/Box";
import Tree from "../display/compoment/ui/Tree";
import { DISPLAY_TREE_SELECT, TOUCH_TAP } from "../event/EventConst";
import GlobalMgr from "../global/GlobalMgr";
import GMTreeNode from "./GMTreeNode";

export default class GMPanel extends Box {
    private displayTree: Tree;
    private refleshBtn:CLabel;
    private labs: CLabel[] = [];
    private pool: CLabel[] = [];
    constructor() {
        super();
        this.init();
    }

    init(): void {
        this.right = 0;
        let tree = this.displayTree = new Tree;
        tree.itemRender = GMTreeNode;
        tree.renderHandle = (n: GMTreeNode, data: any) => {
            n.lab.text = `${data.open ? "-" : data.children.length ? "+" : ""}${data.constructor.name}`;
        }
        tree.paddingLeft = 15;
        this.addChild(tree);
        this.refleshTree();

        GlobalMgr.dispatcher.on(DISPLAY_TREE_SELECT, this.refleshAttr, this);
        this.addChild(this.refleshBtn = new CLabel);
        this.refleshBtn.text = "刷新";
        this.refleshBtn.x = 100;
        this.refleshBtn.y = 100;
        this.refleshBtn.on(TOUCH_TAP,this.refleshTree,this);
    }

    refleshTree(): void {
        let data = GlobalMgr.stage;
        this.displayTree.data = data.children;

    }

    private refleshAttr(data: any): void {
        let lab: CLabel;
        while (this.labs.length) {
            lab = this.labs.pop();
            lab.removeSelf();
            this.pool.push(lab);
        }
        let idx = 0;
        for (let k in data) {
            if (typeof data[k] != "object" && typeof data[k] != "function") {
                lab = this.pool.pop() || new CLabel;
                lab.x = 200;
                lab.y = idx * 30;
                idx++;
                this.addChild(lab);
                lab.text = k + ":" + data[k];
                this.labs.push(lab);
            }
        }

    }
}