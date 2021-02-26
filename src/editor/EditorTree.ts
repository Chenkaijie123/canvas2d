import Box from "../system/display/compoment/ui/Box";
import Tree from "../system/display/compoment/ui/Tree";
import DisPlayNode from "../system/display/DisPlayNode";
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

    renderNode(node: EditorTreeNode, data: DisPlayNode): void {
        node.narrow.text = data.children.length ? "+" : "";
        node.label.text = data.constructor.name;
    }

    refleshTree(data): void {
        this.tree.data = data;
    }
}