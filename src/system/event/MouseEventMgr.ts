
import DisPlayNode from "../display/DisPlayNode";
import Point from "../display/math/Point";
import Canvas from "../global/Canvas";
import GlobalMgr from "../global/GlobalMgr";
import GMPanel from "../gm/GMPanel";
import { DEBUGGER_SELECT_DISPLAY, TOUCH_BEGIN, TOUCH_CANCEL, TOUCH_DOUBLE, TOUCH_END, TOUCH_MOVE, TOUCH_TAP } from "./EventConst";
import SysTemTouchEvent from "./eventStruct/SysTemTouchEvent";


export default class MouseEventMgr {
    private canvas: Canvas;
    //按下检查到的显示对象
    private downList: DisPlayNode[];
    //单次处理的鼠标移动事件数量
    private readonly moveEvtCount: number = 2;
    //保存上一次鼠标移动的点
    private movePoint: Point = new Point;
    private moveEvt: MouseEvent[] = []
    constructor(canvas: Canvas) {
        this.canvas = canvas;
        this.init();
    }

    init(): void {
        this.canvas.canvasDom.addEventListener("dblclick", this.ondbclick);
        this.canvas.canvasDom.addEventListener("mousemove", this.addToQueue);
        this.canvas.canvasDom.addEventListener("mousedown", this.onDown);
        this.canvas.canvasDom.addEventListener("mouseup", this.onUp);
        GlobalMgr.ticker.addLoop(this.dealMove, this);
    }

    private addToQueue = (e: MouseEvent) => {
        if (Math.abs(this.movePoint.x - e.pageX) < 3 && Math.abs(this.movePoint.y - e.pageY) < 3) return;
        this.movePoint.x = e.pageX;
        this.movePoint.y = e.pageY;
        this.moveEvt.push(e)
    }

    private dealMove(): void {
        for (let i = 0; i < this.moveEvtCount; i++) {
            let e = this.moveEvt.shift();
            if (!e) return;
            this.onMove(e)
        }
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
            if (evt._stopEvent) {
                list.splice(idx)
                break;
            }
        }
        evt.currentTarget = this.canvas.stage;
        this.canvas.stage.dispatch(TOUCH_BEGIN, evt);
    }

    private onUp = (e: MouseEvent) => {
        let { pageX, pageY } = e;
        let list = this.getClickList(pageX, pageY);
        let evt = SysTemTouchEvent.create(e);
        evt.type = "touchEnd";
        let idx = 0;
        for (let node of list) {
            idx++;
            evt.currentTarget = node;
            node.dispatch(TOUCH_END, evt);
            if (evt._stopEvent) {
                list.splice(idx);
                break;
            }
        }
        evt.currentTarget = this.canvas.stage;
        this.canvas.stage.dispatch(TOUCH_END, evt);
        evt.release();

        evt = SysTemTouchEvent.create(e);
        evt.type = "touchCancel";
        for (let node of this.downList) {
            if (list.indexOf(node) == -1) {
                evt.currentTarget = node;
                node.dispatch(TOUCH_CANCEL, evt);
                if (evt._stopEvent) break;
            }
        }
        evt.release();

        evt = SysTemTouchEvent.create(e);
        evt.type = "touchTap";
        //debug panel
        if (GlobalMgr.isDebugger && list[0]) {
            let temp: DisPlayNode = list[0];
            let isDebugger = false;
            let gmpanel: GMPanel = GMPanel["_ins"];
            while (temp) {
                if (temp == gmpanel) {
                    isDebugger = true;
                    break;
                }
                temp = temp.parent;

            }
            !isDebugger && GlobalMgr.dispatcher.dispatch(DEBUGGER_SELECT_DISPLAY, list[0]);
        }
        for (let node of list) {
            if (this.downList.indexOf(node) >= 0) {
                evt.currentTarget = node;
                node.dispatch(TOUCH_TAP, evt);
                if (evt._stopEvent) break;
            }
        }
        evt.currentTarget = this.canvas.stage;
        this.canvas.stage.dispatch(TOUCH_TAP, evt);
        evt.release();
        this.downList.length = 0;
    }

    private ondbclick = (e: MouseEvent) => {
        let { pageX, pageY } = e;
        let list = this.getClickList(pageX, pageY);
        let evt = SysTemTouchEvent.create(e);
        for (let node of list) {
            evt.currentTarget = node;
            node.dispatch(TOUCH_DOUBLE, evt);
            if (evt._stopEvent) break;
        }
        evt.currentTarget = this.canvas.stage;
        this.canvas.stage.dispatch(TOUCH_DOUBLE, evt);
        evt.release();
    }

    private getClickList(x: number, y: number): DisPlayNode[] {
        let res = [];
        this.checkList(x, y, this.canvas.stage.children, res);
        return res.reverse();
    }

    private checkList(x: number, y: number, dispalyList: DisPlayNode[], resault: DisPlayNode[]): void {
        for (let node of dispalyList) {
            if (node.ignoreMouseEnvent) continue;
            // if (node.needCheckMouseEvt()) {
            node.updateIeverseMatrix();
            node._tempPoint.setTo(x, y);
            node._inverseMatrix.transFormPoint(node._tempPoint);
            if (node._contain(node._tempPoint)) {
                resault.push(node);
            }
            if (node.children.length) {
                this.checkList(node._tempPoint.x, node._tempPoint.y, node.children, resault);
            }
            // }
        }
    }
}