
import Dispatcher from "../event/Dispatcher";
import { TOUCH_BEGIN, TOUCH_CANCEL, TOUCH_MOVE, TOUCH_TAP } from "../event/EventConst";
import Render from "../render/Render";
import Matrix from "./math/Matrix";
import Point from "./math/Point";

export default class Display extends Dispatcher {
    private static readonly TOUCHEVT: symbol[] = [TOUCH_BEGIN, TOUCH_MOVE, TOUCH_TAP, TOUCH_CANCEL];
    // private mouseEvtCount = 0;
    private _x: number = 0;
    private _y: number = 0;
    private _width: number = 0;
    private _height: number = 0;
    private _scaleX: number = 1;
    private _scaleY: number = 1;
    private _anchorX: number = 0;
    private _anchorY: number = 0;
    private _rotate: number = 0;
    private _scrollX: number = 0;
    private _scrollY: number = 0;
    private matrixUpdate:boolean = true;
    _tempPoint: Point = new Point;
    _inverseMatrix:Matrix = new Matrix

    visible = true;
    alpha: number = 1;
    contentWidth: number;
    contentHeight: number;
    updateValue: boolean = true;
    autoReSize: boolean = true;
    matrix: Matrix = new Matrix;
    ignoreMouseEnvent:boolean = false;//设为true可大幅度提升鼠标事件性能，将忽略该节点下所有的显示元素检查
    get x() { return this._x }
    set x(v: number) {
        if (this._x == v) return;
        this._x = v;
        this.updateValue = true;
    }
    get y() { return this._y }
    set y(v: number) {
        if (this._y == v) return;
        this._y = v;
        this.updateValue = true;
    }
    get width() { return this._width }
    set width(v: number) {
        if (this._width == v) return;
        this._width = v;
        this.updateValue = true;
        this.autoReSize = false;
    }
    get height() { return this._height }
    set height(v: number) {
        if (this._height == v) return;
        this._height = v;
        this.updateValue = true;
        this.autoReSize = false;
    }
    get scaleX() { return this._scaleX }
    set scaleX(v: number) {
        if (this._scaleX == v) return;
        this._scaleX = v;
        this.updateValue = true;
    }
    get scaleY() { return this._scaleY }
    set scaleY(v: number) {
        if (this._scaleY == v) return;
        this._scaleY = v;
        this.updateValue = true;
    }
    get anchorX() { return this._anchorX }
    set anchorX(v: number) {
        if (this._anchorX = v) return
        this._anchorX = v;
        this.updateValue = true;
    }
    get anchorY() { return this._anchorY }
    set anchorY(v: number) {
        if (this._anchorY == v) return;
        this._anchorY = v;
        this.updateValue = true;
    }
    get rotate() { return this._rotate }
    set rotate(v: number) {
        if (this._rotate === v) return;
        this._rotate = v;
        this.updateValue = true;
    }
    get scrollX() { return this._scrollX }
    set scrollX(v: number) {
        if (this._scrollX === v) return;
        this._scrollX = v;
        this.updateValue = true;
    }
    get scrollY() { return this._scrollY }
    set scrollY(v: number) {
        if (this._scrollY === v) return;
        this._scrollY = v;
        this.updateValue = true;
    }

    get needRender() {
        return this.visible && this.alpha > 0;
    }

    updateMatrix(): void {
        if (this.updateValue) {
            this.matrix.setByStyle(this);
            this.updateValue = false;
            this.matrixUpdate = true;
        }
    }

    updateIeverseMatrix():void{
        if(this.matrixUpdate){
            this.matrixUpdate = false;
            this._inverseMatrix.setTo(this.matrix);
            this._inverseMatrix.invertMartix();
        }
    }

    /**@override */
    render(render: Render) {

    }

    distory() {
        this.clear();
    }

    _contain(p: { x: number, y: number }): boolean {
        return this.width >= p.x && this.height >= p.y && p.x >= 0 && p.y >= 0;
    }


    on(type: string | symbol, callback: Function, caller: any, args?: any[]): boolean {
        let state = super.on(type, callback, caller, args);
        if (typeof type == "symbol" && Display.TOUCHEVT.indexOf(type) >= 0 && state) {
            // this.mouseEvtCount++;
 
        }
        return state;
    }

    off(type: string | symbol, callback: Function, caller: any): boolean {
        let state = super.off(type, callback, caller);
        if (typeof type == "symbol" && Display.TOUCHEVT.indexOf(type) >= 0 && state) {
            // this.mouseEvtCount--;
        }
        return state;
    }

    clear(): void {
        super.clear();
        // this.mouseEvtCount = 0;
    }



}