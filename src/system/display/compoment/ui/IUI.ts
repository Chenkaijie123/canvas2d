import DisPlayNode from "../../DisPlayNode";
import TreeNode from "./TreeNode";

export interface IUI {
    release(): void;
}

export interface ITreeNode extends DisPlayNode {
    selectHandle: (open: boolean, data: any, treeNode: TreeNode) => any;
}