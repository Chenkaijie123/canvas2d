import DisPlayNode from "../display/DisPlayNode";
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
    private _strokeColor: string = "#000000"
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
            this.ctx.strokeStyle = this._strokeColor
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
}