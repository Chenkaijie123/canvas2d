
import { TOUCH_TAP } from "../../../event/EventConst";
import SystemEvent from "../../../event/eventStruct/SystemEvent";
import DisPlayNode from "../../DisPlayNode";
import Box from "./Box";
import { ITreeNode } from "./IUI";
export default class TreeNode extends Box {
    ui: ITreeNode;
    itemWidth: number;
    itemHeight: number;
    paddingTop: number;
    paddingLeft: number
    childDatas: { open?: boolean, children?: any[] };
    belong: TreeNode;
    childList: TreeNode[] = [];
    isOpen: boolean;
    private childrenBox: Box;
    private heightAche: number = 0;
    itemRender: (new () => ITreeNode);
    renderHandle: (v: ITreeNode, data: any) => void;
    constructor() {
        super();
        this.childrenBox = new Box;
    }

    set data(v: { open?: boolean, children?: any[] }) {
        this.resetAllNode();
        this.isOpen = !!v.open;
        if (this.isOpen) {
            this.addChild(this.childrenBox);
        } else {
            this.childrenBox.removeSelf();
        }
        this.childDatas = v;
        this.ui = new this.itemRender;
        this.ui.on(TOUCH_TAP, this.clickHandle, this);
        this.renderHandle(this.ui, v);
        this.addChild(this.ui);
        this.childrenBox.x = this.paddingLeft;
        this.childrenBox.y = this.paddingTop + this.itemHeight;
        if (v.open && v.children) {
            let child: TreeNode;
            let _y: number = 0;
            let height: number = 0;
            for (let data of v.children) {
                child = new TreeNode;
                child.y = _y;
                _y += this.paddingTop + this.itemHeight;
                child.itemWidth = this.itemWidth;
                child.itemHeight = this.itemHeight;
                child.paddingTop = this.paddingTop;
                child.paddingLeft = this.paddingLeft;
                child.itemRender = this.itemRender;
                child.renderHandle = this.renderHandle;
                child.ui = new child.itemRender;
                child.ui.on(TOUCH_TAP, child.clickHandle, child);
                child.addChild(child.ui);
                child.renderHandle(child.ui, data);
                child.belong = this;
                child.data = data;
                height += child.height;
                this.childrenBox.addChild(child);
                this.childList.push(child);
            }
            this.setHeight(this.heightAche = height + this.itemHeight + this.paddingTop);
        } else {
            this.setHeight(this.itemHeight);
        }
    }

    release(): void {

    }

    /**
     * 移除该节点的所有子节点
     * @private
     */
    resetAllNode(): void {
        if (this.ui) {
            this.ui.off(TOUCH_TAP, this.clickHandle, this);
            this.ui.removeSelf();
        }
        while (this.childList.length) {
            this.childList.pop().resetAllNode();
        }
    }

    private clickHandle(e: SystemEvent): void {
        if (!this.childDatas.children || !this.childDatas.children.length) return;
        this.isOpen = !this.isOpen;
        if (this.isOpen) {//展开
            this.addChild(this.childrenBox);
            let height: number = 0;
            if (this.childList.length == 0) {
                let child: TreeNode;
                let tempY = 0;
                for (let data of this.childDatas.children) {
                    child = new TreeNode;
                    child.y = tempY;
                    tempY += this.paddingTop + this.itemHeight;
                    child.itemWidth = this.itemWidth;
                    child.itemHeight = this.itemHeight;
                    child.paddingTop = this.paddingTop;
                    child.paddingLeft = this.paddingLeft;
                    child.itemRender = this.itemRender;
                    child.renderHandle = this.renderHandle;
                    child.data = data;
                    child.belong = this;
                    height += child.itemHeight + child.paddingTop;
                    this.childrenBox.addChild(child);
                    this.childList.push(child);
                }
                this.heightAche = height + this.itemHeight;
            }
            this.height = this.heightAche;
        } else {//关闭
            this.childrenBox.removeSelf();
            this.height = this.itemHeight;
        }

        //layout
        this.reLayout((e.currentTarget as DisPlayNode).parent as TreeNode);

        this.ui.selectHandle(this.isOpen, this.childDatas, this);
    }

    private reLayout(parent: TreeNode): void {
        let _y = 0;
        for (let node of parent.belong.childList) {
            node.y = _y;
            _y += node.height + this.paddingTop;
        }
        parent.belong.height = parent.belong.heightAche = _y + this.itemHeight;
        if (parent.belong.belong) {
            this.reLayout(parent.belong);
        }
    }
}