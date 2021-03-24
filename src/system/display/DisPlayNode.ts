import { SIZE_CHANGE, TOUCH_BEGIN, TOUCH_CANCEL, TOUCH_END, TOUCH_MOVE, TOUCH_TAP } from "../event/EventConst";
import GlobalMgr from "../global/GlobalMgr";
import ILayout from "./compoment/ui/ILayout";
import Layout from "./compoment/ui/Layout";
import Display from "./Display";
export default class DisPlayNode extends Display implements ILayout {
    private static readonly TOUCHEVT: symbol[] = [TOUCH_BEGIN, TOUCH_MOVE, TOUCH_TAP, TOUCH_CANCEL, TOUCH_END];
    private _top: number = null;
    private _bottom: number = null;
    private _left: number = null;
    private _right: number = null;
    private _centerX: number = null;
    private _centerY: number = null;

    needLayout: boolean = false;
    get top() { return this._top }
    set top(v: number) {
        this.needLayout = true;
        this._top = v;
        (v != void 0) && (this._centerY = null);
    }
    get bottom() { return this._bottom }
    set bottom(v: number) {
        this.needLayout = true;
        this._bottom = v;
        (v != void 0) && (this._centerY = null);
    }
    get left() { return this._left }
    set left(v: number) {
        this.needLayout = true;
        this._left = v;
        (v != void 0) && (this._centerX = null);
    }
    get right() { return this._right }
    set right(v: number) {
        this.needLayout = true;
        this._right = v;
        (v != void 0) && (this._centerX = null);
    }
    get centerX() { return this._centerX }
    set centerX(v: number) {
        this.needLayout = true;
        this._centerX = v;
        (v != void 0) && (this.left = this.right = null);
    }
    get centerY() { return this._centerY }
    set centerY(v: number) {
        this.needLayout = true;
        this._centerY = v;
        (v != void 0) && (this.top = this.bottom = null);
    }

    parent: DisPlayNode
    children: DisPlayNode[] = []

    addChild(node: DisPlayNode) {
        node.removeSelf();
        this.children.push(node);
        node.parent = this;
        if (this.hasMouseEvt()) {
            this.setFocusMouseEvt();
        }
    }

    addChildAt(node: DisPlayNode, index: number) {
        node.removeSelf();
        if (index > this.children.length) {
            this.children.push(node)
        } else {
            this.children.splice(index, 0, node);
        }
        node.parent = this;
    }

    removeChild(node: DisPlayNode) {
        let idx = this.children.indexOf(node);
        if (idx >= 0) {
            this.children.splice(idx, 1);
            node.parent = null;
        } else {
            console.error(`节点没有附加在${this}上`)
        }
    }

    removeSelf(): void {
        if (this.parent) {
            this.parent.removeChild(this);
        }
    }

    removeChildren():void{
        let node:DisPlayNode;
        while(node = this.children[0]){
            node.removeSelf();
        }
    }

    on(type: string | symbol, callback: Function, caller: any, args?: any[]): boolean {
        let state = super.on(type, callback, caller, args);
        if (typeof type == "symbol" && DisPlayNode.TOUCHEVT.indexOf(type) >= 0 && state) {
            this.setFocusMouseEvt();
        }
        return state;
    }

    childrenForEach(v: (node: DisPlayNode, idx: number) => boolean | undefined): void {
        for (let i = 0, len = this.children.length; i < len; i++) {
            if (v(this.children[i], i)) {
                break;
            }
        }
    }



    /**
     * 测量size并且布局
     * @private
     */
    protected _measureAndLayout(): void {
        GlobalMgr.ticker.nextTick(this.measure, this);
    }

    /**@private */
    measure(): void {
        this.onMeasure();
        this.onLayout(this.children);
        this.dispatch(SIZE_CHANGE);
    }

    /**can override to layout */
    protected onLayout(children: DisPlayNode[]): void {
        if (this.needLayout) {
            Layout.onLayout(this, ...children);
        }
    }

    /**can override to layout */
    protected onMeasure(): void {

    }

    private setFocusMouseEvt(): void {
        this.ignoreMouseEnvent = false;
        let dispaly: DisPlayNode = this;
        while (dispaly.parent) {
            if (!dispaly.parent.ignoreMouseEnvent) return;
            dispaly.parent.ignoreMouseEnvent = false;
            dispaly = dispaly.parent;
        }
    }

    private hasMouseEvt(): boolean {
        for (let i of DisPlayNode.TOUCHEVT) {
            this.getEvtList(i).length;
            return true;
        }
        return false;
    }

}