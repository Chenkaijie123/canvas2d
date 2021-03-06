import { SIZE_CHANGE } from "../../../event/EventConst";
import GlobalMgr from "../../../global/GlobalMgr";
import DisPlayNode from "../../DisPlayNode";
import Layout from "./Layout";

export default class Box extends DisPlayNode {
    private sizeChange(): void {
        let width = Math.max(...this.children.map(v => v.x + v.width));
        let height = Math.max(...this.children.map(v => v.y + v.height));
        if (this.autoReSize) {
            if (width != this.width || height != this.height) {
                this.setWidth(width);
                this.setHeight(height);
                this.dispatch(SIZE_CHANGE);
            }
        }
        this.contentWidth = width;
        this.contentHeight = height;
        Layout.onLayout(...this.children);
    }

    private sizeChangeCallLater(): void {
        GlobalMgr.ticker.nextTick(this.sizeChange, this);
    }

    addChild(v: DisPlayNode): void {
        super.addChild(v);
        v.on(SIZE_CHANGE, this.sizeChangeCallLater, this);
        this.sizeChangeCallLater();
    }

    removeChild(v: DisPlayNode): void {
        super.removeChild(v);
        v.off(SIZE_CHANGE, this.sizeChangeCallLater, this);
    }

    calcSizeNow():void{
        for(let i of this.children){
            i.measure()
        }
        this.sizeChange();
    }

}