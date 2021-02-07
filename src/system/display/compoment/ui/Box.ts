import { SIZE_CHANGE } from "../../../event/EventConst";
import GlobalMgr from "../../../global/GlobalMgr";
import DisPlayNode from "../../DisPlayNode";

export default class Box extends DisPlayNode {
    private sizeChange(): void {
        if (this.autoReSize) {
            this.width = Math.max(...this.children.map(v => v.x + v.width));
            this.height = Math.max(...this.children.map(v => v.y + v.height));
        }
    }

    private sizeChangeCallLater():void{
        GlobalMgr.ticker.nextTick(this.sizeChange,this);
    }


}