import Box from "../system/display/compoment/ui/Box";
import Tree from "../system/display/compoment/ui/Tree";
import EditorTreeNode from "./EditorTreeNode";

export default class EditorTree extends Box {
    tree: Tree;
    constructor() {
        super();
        this.tree = new Tree;
        this.addChild(this.tree);
        this.tree.itemRender = EditorTreeNode;
        this.tree.renderHandle = this.renderNode;
        this.right = 0;
    }

    renderNode(node: EditorTreeNode, data: any): void {

    }
}