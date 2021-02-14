import CLabel from "../display/compoment/CLabel";
import Box from "../display/compoment/ui/Box";
import { ITreeNode } from "../display/compoment/ui/IUI";
import TreeNode from "../display/compoment/ui/TreeNode";
import { DISPLAY_TREE_SELECT } from "../event/EventConst";
import GlobalMgr from "../global/GlobalMgr";

export default class GMTreeNode extends Box implements ITreeNode {
    lab: CLabel
    constructor() {
        super();
        this.lab = new CLabel;
        this.addChild(this.lab);
    }
    selectHandle(open: boolean, data: any, treeNode: TreeNode): void {
        this.lab.text = `${data.children && data.children.length ? open ? "-" : "+" : ""}${data.constructor.name}`;
        GlobalMgr.dispatcher.dispatch(DISPLAY_TREE_SELECT,data);
    }

}