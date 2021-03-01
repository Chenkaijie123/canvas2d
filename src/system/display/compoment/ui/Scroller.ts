import { SCROLLER_CHANGE, SCROLLER_END, TOUCH_BEGIN, TOUCH_CANCEL, TOUCH_END, TOUCH_MOVE } from "../../../event/EventConst";
import SysTemTouchEvent from "../../../event/eventStruct/SysTemTouchEvent";
import Point from "../../math/Point";
import Box from "./Box";

/**滚动组件 */
export default class Scroller extends Box {
    private p: Point = new Point;
    constructor() {
        super();
        this.canScroll = true;
        this.on(TOUCH_BEGIN, this.onTouchBegin, this);
    }

    private addScrollerEvt(): void {
        this.on(TOUCH_MOVE, this.onTouchMove, this);
        this.on(TOUCH_CANCEL, this.onCancel, this);
        this.on(TOUCH_END, this.onTouchEnd, this);
    }

    private onTouchBegin(e: SysTemTouchEvent): void {
        this.addScrollerEvt();
        this.p.setTo(e.x, e.y);
    }

    private onTouchMove(e: SysTemTouchEvent): void {
        let _x = e.x - this.p.x;
        let _y = e.y - this.p.y;
        this.p.setTo(e.x, e.y);
        if (this.width < this.contentWidth) {
            this.scrollX += _x;
            if (this.scrollX > 0) {
                this.scrollX = 0;
            } else if (this.width - this.scrollX > this.contentWidth) {
                this.scrollX = this.width - this.contentWidth;
            }
        }
        if (this.height < this.contentHeight) {
            this.scrollY += _y;
            if (this.scrollY > 0) {
                this.scrollY = 0;
            } else if (this.height - this.scrollY > this.contentHeight) {
                this.scrollY = this.height - this.contentHeight;
            }
        }
        this.dispatch(SCROLLER_CHANGE);
    }

    private onTouchEnd(e: SysTemTouchEvent): void {
        this.off(TOUCH_MOVE, this.onTouchMove, this);
        this.off(TOUCH_CANCEL, this.onCancel, this);
        this.off(TOUCH_END, this.onTouchEnd, this);
        this.dispatch(SCROLLER_END);
    }

    private onCancel(e: SysTemTouchEvent): void {
        this.onTouchEnd(null);
    }
}