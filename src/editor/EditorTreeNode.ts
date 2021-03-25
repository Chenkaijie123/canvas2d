import CLabel from "../system/display/compoment/CLabel";
import Box from "../system/display/compoment/ui/Box";
import { ITreeNode } from "../system/display/compoment/ui/IUI";
import TreeNode from "../system/display/compoment/ui/TreeNode";
import DisPlayNode from "../system/display/DisPlayNode";

export default class EditorTreeNode extends Box implements ITreeNode {
    narrow: CLabel = new CLabel;
    label: CLabel = new CLabel;
    constructor() {
        super();
        this.narrow.width = this.narrow.height = 20;
        this.narrow.fontSize = 20;
        this.addChild(this.narrow);
        this.label.fontSize = 20;
        this.label.x = 30;
        this.addChild(this.label);

    }
    selectHandle(open: boolean, data: DisPlayNode, treeNode: TreeNode): void {
        if(open && data.children.length){
            this.narrow.text = "-";
        }
        this.narrow.text = data.children.length?open?"-":"+":"";
    }

}