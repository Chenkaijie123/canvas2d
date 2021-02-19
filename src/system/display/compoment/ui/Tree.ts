
import Box from "./Box";
import { ITreeNode, IUI } from "./IUI";
import TreeNode from "./TreeNode";

export default class Tree extends Box implements IUI {
    /**节点上下间隔 */
    paddingTop: number = 6;
    /**每层节点左边距 */
    paddingLeft: number = 6;
    /**暂时不用 */
    itemWidth: number = 200;
    /**暂时不用 */
    itemHeight: number = 30;
    childList: TreeNode[] = [];
    private _data: tree_data[];
    private _itemRender: (new () => ITreeNode);
    private _renderHandle: (v: ITreeNode, data: any, datas?: any[]) => void;
    constructor() {
        super();
    }

    get data() { return this._data }
    set data(v: (tree_data & any)[]) {
        this._data = v;
        this.release();
        if (this._itemRender && this._renderHandle && this._data) {
            let node: TreeNode;
            let _y = 0;
            for (let data of this._data) {
                node = new TreeNode;
                node.itemWidth = this.itemWidth;
                node.itemHeight = this.itemHeight;
                node.paddingLeft = this.paddingLeft;
                node.paddingTop = this.paddingTop;
                node.itemRender = this._itemRender;
                node.belong = this as any;
                node.renderHandle = this._renderHandle;
                node.y = _y;
                node.data = data;
                _y += node.height + node.paddingTop;
                this.addChild(node);
                this.childList.push(node);
            }
        }
    }



    set renderHandle(v: (v: ITreeNode, data: any) => void) {
        this._renderHandle = v;
    }

    set itemRender(v: (new () => ITreeNode)) {
        this._itemRender = v;
    }


    //TODO优化
    release(): void {
        for(let i of this.childList){
            i.removeSelf();
        }
        this.childList.length = 0;
    }
}

type tree_data = {
    open?: boolean,
    children?: any[]
}