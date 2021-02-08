import { SIZE_CHANGE } from "../../../event/EventConst";
import GlobalMgr from "../../../global/GlobalMgr";
import DisPlayNode from "../../DisPlayNode";
import Layout from "./Layout";

export default class Box extends DisPlayNode {
    private sizeChange(): void {
        if (this.autoReSize) {
            let width = Math.max(...this.children.map(v => v.x + v.width));
            let height = Math.max(...this.children.map(v => v.y + v.height));
            if (width != this.width || height != this.height) {
                this.width = width;
                this.height = height;
                Layout.onLayout(...this.children);
                this.dispatch(SIZE_CHANGE);
            }
        }
    }

    private sizeChangeCallLater(): void {
        GlobalMgr.ticker.nextTick(this.sizeChange, this);
    }

    addChild(v: DisPlayNode): void {
        super.addChild(v);
        v.on(SIZE_CHANGE, this.sizeChangeCallLater, this);
    }

    removeChild(v: DisPlayNode): void {
        super.removeChild(v);
        v.off(SIZE_CHANGE, this.sizeChangeCallLater, this);
    }


}