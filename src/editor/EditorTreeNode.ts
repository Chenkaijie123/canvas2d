import CLabel from "../system/display/compoment/CLabel";
import { ITreeNode } from "../system/display/compoment/ui/IUI";
import TreeNode from "../system/display/compoment/ui/TreeNode";
import DisPlayNode from "../system/display/DisPlayNode";

export default class EditorTreeNode extends DisPlayNode implements ITreeNode {
    narrow: CLabel = new CLabel;
    label: CLabel = new CLabel;
    constructor() {
        super();
        this.narrow.width = this.narrow.height = 30;
        this.narrow.fontSize = 30;
        this.addChild(this.narrow);
        this.label.fontSize = 30;
        this.label.x = 30;
        this.addChild(this.label);

    }
    selectHandle(open: boolean, data: any, treeNode: TreeNode): void {

    }

}