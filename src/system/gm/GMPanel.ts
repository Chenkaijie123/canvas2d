import CLabel from "../display/compoment/CLabel";
import Graphicis from "../display/compoment/cmd/Graphicis";
import Box from "../display/compoment/ui/Box";
import Tree from "../display/compoment/ui/Tree";
import DisPlayNode from "../display/DisPlayNode";
import { DEBUGGER_SELECT_DISPLAY, DISPLAY_TREE_SELECT, TOUCH_TAP } from "../event/EventConst";
import GlobalMgr from "../global/GlobalMgr";
import GMTreeNode from "./GMTreeNode";

export default class GMPanel extends Box {
    private displayTree: Tree;
    private refleshBtn: CLabel;
    private labs: CLabel[] = [];
    private pool: CLabel[] = [];
    private constructor() {
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
        GlobalMgr.dispatcher.on(DEBUGGER_SELECT_DISPLAY,this.autoSelect,this);
        this.addChild(this.refleshBtn = new CLabel);
        this.refleshBtn.text = "刷新";
        this.refleshBtn.bottom = 0;
        this.refleshBtn.on(TOUCH_TAP, this.refleshTree, this);
    }

    refleshTree(): void {
        let data = GlobalMgr.stage.children.concat();
        let idx = data.indexOf(this);
        if(idx >= 0){
            data.splice(idx,1);
        }
        this.displayTree.data = data;
    }

    private autoSelect(v:DisPlayNode):void{
        let parent = v.parent
        while(parent){
            parent["open"] = true;
            parent = parent.parent;
        }
        let data = GlobalMgr.stage.children.concat();
        let idx = data.indexOf(this);
        if(idx >= 0){
            data.splice(idx,1);
        }
        this.displayTree.data = data;
        this.refleshAttr(v);
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
        this.showBorder(data);
    }

    private graphicis: Graphicis;
    showBorder(node: DisPlayNode): void {
        if (!node) return;
        this.graphicis = this.graphicis || new Graphicis;
        node.parent.addChild(this.graphicis);
        this.graphicis.clearAllCMD();
        this.graphicis.strokeRect(node.x, node.y, node.width, node.height,"0xff0000");
    }

    private start():void{
        GlobalMgr.isDebugger = true;
    }

    private stop():void{
        GlobalMgr.isDebugger = false;
    }

    static show():void{
        if(!GMPanel["_ins"]){
            GMPanel["_ins"] = new GMPanel;
        }
        (GMPanel["_ins"] as GMPanel).start();
        GlobalMgr.stage.addChild(GMPanel["_ins"]);
    }

    static hide():void{
        if(GMPanel["_ins"]){
            (GMPanel["_ins"] as GMPanel).stop();
            GlobalMgr.stage.removeChild(GMPanel["_ins"]);
        }
    }
}