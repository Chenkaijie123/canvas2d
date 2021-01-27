
import DisPlayNode from "../display/DisPlayNode";
import Canvas from "../global/Canvas";
import { TOUCH_BEGIN, TOUCH_MOVE, TOUCH_TAP } from "./EventConst";
import SysTemTouchEvent from "./eventStruct/SysTemTouchEvent";


export default class MouseEventMgr {
    private canvas: Canvas;
    private downList: DisPlayNode[];
    constructor(canvas: Canvas) {
        this.canvas = canvas;
        this.init();
    }

    init(): void {
        this.canvas.canvasDom.addEventListener("click", this.onclick);
        this.canvas.canvasDom.addEventListener("mousemove", this.onMove);
        this.canvas.canvasDom.addEventListener("mousedown", this.onDown);
        this.canvas.canvasDom.addEventListener("mouseup", this.onUp);
    }

    private onMove = (e: MouseEvent) => {
        let { pageX, pageY } = e;
        let list = this.getClickList(pageX, pageY);
        let evt = SysTemTouchEvent.create(e);
        evt.target = list[0];
        evt.type = "touchMove";
        for (let node of list) {
            evt.currentTarget = node;
            node.dispatch(TOUCH_MOVE, evt);
            if (evt._stopEvent) break;
        }
        evt.currentTarget = this.canvas.stage;
        this.canvas.stage.dispatch(TOUCH_MOVE, evt);
        evt.release();
    }

    private onDown = (e: MouseEvent) => {
        let { pageX, pageY } = e;
        let list = this.getClickList(pageX, pageY);
        let evt = SysTemTouchEvent.create(e);
        evt.type = "touchBegin";
        evt.target = list[0];
        this.downList = list;
        let idx = 0;
        for (let node of list) {
            idx++;
            evt.currentTarget = node;
            node.dispatch(TOUCH_BEGIN, evt);
            if (evt._stopEvent) break;
        }
        evt.currentTarget = this.canvas.stage;
        this.canvas.stage.dispatch(TOUCH_BEGIN, evt);
    }

    private onUp = (e: MouseEvent) => {
        let { pageX, pageY } = e;
        let list = this.getClickList(pageX, pageY);
        let idx = 0;
        for (let node of list) {
            idx++;
            node.dispatch(TOUCH_BEGIN);
        }
        for (let node of list) {
            if (this.downList.indexOf(node) >= 0) {
                node.dispatch(TOUCH_TAP);
            }
        }
    }

    private onclick = (e: MouseEvent) => {
        let { pageX, pageY } = e;
        let list = this.getClickList(pageX, pageY);
        for (let node of list) {
            node.dispatch(TOUCH_TAP);
        }
    }

    private getClickList(x: number, y: number): DisPlayNode[] {
        let res = [];
        this.checkList(x, y, this.canvas.stage.children, res);
        return res.reverse();
    }

    private checkList(x: number, y: number, dispalyList: DisPlayNode[], resault: DisPlayNode[]): void {
        for (let node of dispalyList) {
            if (node.ignoreMouseEnvent) continue;
            if (node.needCheckMouseEvt()) {
                node.updateIeverseMatrix();
                node._tempPoint.setTo(x, y);
                node._inverseMatrix.transFormPoint(node._tempPoint);
                if (node._contain(node._tempPoint)) {
                    resault.push(node);
                }
                if (node.children.length) {
                    this.checkList(node._tempPoint.x, node._tempPoint.y, node.children, resault);
                }
            }
        }
    }
}