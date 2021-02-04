import { draw_type } from "../display/compoment/cmd/GraphicalCMD";
import DisPlayNode from "../display/DisPlayNode";
import Byte from "../display/math/Byte";
import Stage from "../display/Stage";

export default class Render {
    ctx: CanvasRenderingContext2D
    stage: Stage;
    width: number
    height: number
    //-----------content-----------
    private needUpdateContent: boolean = true;
    private _fontSize: number = 20;
    private _fontColor: string = "#c5b596";
    private _fontFamily: string = "sans-serif";

    private needsUpdateStroke: boolean = true;
    private _strokeColor: string = "#000000";
    private _lineWidth:number = 1;
    get fontSize() { return this._fontSize }
    set fontSize(v: number) {
        if (this._fontSize == v) return;
        this._fontSize = v;
        this.needUpdateContent = true;
    }
    get fontColor() { return this._fontColor }
    set fontColor(v: string) {
        if (this._fontColor == v) return;
        this._fontColor = v;
        this.needUpdateContent = true;
    }
    get fontFamily() { return this._fontFamily }
    set fontFamily(v: string) {
        if (this._fontFamily == v) return;
        this._fontFamily = v;
        this.needUpdateContent = true;
    }
    get strokeColor() { return this._strokeColor }
    set strokeColor(v: string) {
        if (this._strokeColor == v) return;
        this._strokeColor = v;
        this.needsUpdateStroke = true;
    }
    get lineWidth():number{return this._lineWidth}
    set lineWidth(v:number){
        if(this._lineWidth == v) return;
        this._lineWidth = v;
        this.needsUpdateStroke = true;
    }
    updateFontContent(force: boolean = false): void {
        if (this.needUpdateContent || force) {
            this.needUpdateContent = false;
            this.ctx.font = `${this.fontSize}px ${this.fontFamily}`;
            this.ctx.fillStyle = this.fontColor;
        }
    }
    updateStokeContent(force: boolean = false): void {
        if (this.needsUpdateStroke || force) {
            this.needsUpdateStroke = false;
            this.ctx.strokeStyle = this._strokeColor;
            this.ctx.lineWidth = this._lineWidth;
        }
    }
    init(canvas: HTMLCanvasElement, stage: Stage): void {
        this.ctx = canvas.getContext("2d");
        this.ctx.textBaseline = "top";
        this.ctx.textAlign = "left";
        this.stage = stage;
        this.width = stage.width;
        this.height = stage.height;
    }

    renderList(list: DisPlayNode[]): void {
        for (let node of list) {
            if (!node.needRender) continue;
            this.ctx.save();
            node.updateMatrix();
            this.ctx.transform(...node.matrix.buffer);
            node.render(this);
            if (node.children.length) {
                this.renderList(node.children);
            }
            this.ctx.restore();
        }
    }

    resetMatrix(): void {
        this.ctx.resetTransform();
    }

    clear(): void {
        this.ctx.clearRect(0, 0, this.width, this.height)
    }

    //绘制指令
    renderCMD(buffer:Byte):void{
        buffer.pointToStart();
        let type: draw_type = buffer.readUint8();
        let len: number = buffer.readUint16();
        let color: string = (new Number(buffer.readUint32())).toString(16);
        switch (type) {
            case draw_type.line:
                if (len < 2) {
                    console.warn("小于两个点怎么画线段？？？")
                    return;
                }
                this.strokeColor = "#" + color;
                this.lineWidth = buffer.readUint8();
                this.ctx.beginPath();
                this.ctx.moveTo(buffer.readUint16(), buffer.readUint16())
                for (let i = 1; i < len; i++) {
                    this.ctx.lineTo(buffer.readUint16(), buffer.readUint16());
                }
                this.ctx.stroke();
                break;
        }
    }
}