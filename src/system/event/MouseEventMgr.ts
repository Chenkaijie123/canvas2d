
import DisPlayNode from "../display/DisPlayNode";
import Canvas from "../global/Canvas";
import { TOUCH_BEGIN, TOUCH_MOVE, TOUCH_TAP } from "./EventConst";


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
        for (let node of list) {
            node.dispatch(TOUCH_MOVE);
        }
    }

    private onDown = (e: MouseEvent) => {
        let { pageX, pageY } = e;
        let list = this.getClickList(pageX, pageY);
        this.downList = list;
        let idx = 0;
        for (let node of list) {
            idx++;
            node.dispatch(TOUCH_BEGIN);
            if (!node.mouseThrough) {
                this.downList.splice(idx);
                break;
            }
        }
        this.canvas.stage.dispatch(TOUCH_BEGIN);
    }

    private onUp = (e: MouseEvent) => {
        let { pageX, pageY } = e;
        let list = this.getClickList(pageX, pageY);
        let idx = 0;
        for (let node of list) {
            idx++;
            node.dispatch(TOUCH_BEGIN);
            if (!node.mouseThrough) {
                list.splice(idx);
                break;
            }
        }
        for(let node of list){
            if(this.downList.indexOf(node) >= 0){
                node.dispatch(TOUCH_TAP)
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