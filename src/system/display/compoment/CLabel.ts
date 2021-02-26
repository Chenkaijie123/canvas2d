
import Render from "../../render/Render";
import DisPlayNode from "../DisPlayNode";

export default class CLabel extends DisPlayNode {
    private wordMessage: number[] = [];
    private offsetXMessage: number[] = [];
    private offsetYMessage: number = 0;

    private _text: string = "";
    private _fontSize: number = 20;
    fontColor: string = "#c5b596";
    fontFamily: string = "sans-serif";
    strokeColor: string = "#000000";
    border: boolean = false;
    /**多行文本上间距 */
    private _paddingTop: number = 6;
    textAlign: "center" | "left" | "right" = "left";
    verticalAlign: "top" | "bottom" | "middle" = "top";
    get text() { return this._text }
    set text(v: string) {
        this._text = v;
        this._measureAndLayout();
    }
    get fontSize() { return this._fontSize }
    set fontSize(v: number) {
        if (this._fontSize == v) return;
        this._fontSize = v;
        this._measureAndLayout();
    }
    get paddingTop() { return this._paddingTop }
    set paddingTop(v: number) {
        if (this._paddingTop == v) return;
        this._paddingTop = v;
        this._measureAndLayout();
    }


    protected onMeasure(): void {
        this.wordMessage.length = 0;
        this.offsetXMessage.length = 0;
        const len = this._text.length;
        if (this.autoReSize) {
            this["_width"] = this.contentWidth = this._text.length * this.fontSize;
            this["_height"] = this.contentHeight = this.fontSize;
            this.wordMessage.push(len);
            this.offsetXMessage.push(0);
        } else {
            let step = Math.ceil(this.width / this.fontSize);
            let temp: number = step;
            this.contentHeight = this.fontSize;
            this.contentWidth = this.width;
            while (1) {
                if (len >= temp) {
                    this.wordMessage.push(temp);
                    this.offsetXMessage.push(0);
                    temp += step;
                } else {
                    this.wordMessage.push(len);
                    switch (this.textAlign) {
                        case "center":
                            this.offsetXMessage.push((temp - len >> 1) * this.fontSize);
                            break;
                        case "left":
                            this.offsetXMessage.push(0);
                            break;
                        case "right":
                            this.offsetXMessage.push((temp - len >> 0) * this.fontSize);
                            break;
                    }
                    break;
                }
                this.contentHeight += this.fontSize + this.paddingTop;
            }
            if (this.height <= 0) {
                this["_height"] = this.contentHeight;
            }
            switch (this.verticalAlign) {
                case "top":
                    this.offsetYMessage = 0;
                    break;
                case "bottom":
                    this.offsetYMessage = this.height - this.contentHeight >> 0;
                    break;
                case "middle":
                    this.offsetYMessage = this.height - this.contentHeight >> 1;
                    break;
            }
        }
    }

    updateContent(render: Render):void{
        if(this._text){
            render.fontSize = this.fontSize;
            render.fontColor = this.fontColor;
            render.fontFamily = this.fontFamily;
            render.updateFontContent();
        }
    }

    render(render: Render): void {
        if (this._text) {
            if (this.border) {
                render.strokeColor = this.strokeColor;
                render.updateStokeContent();
            }
            let start: number = 0;
            let end: number = 0;
            let _x: number = 0;
            let _y = this.offsetYMessage;
            let str: string;
            for (let i = 0, len = this.wordMessage.length; i < len; i++) {
                end = this.wordMessage[i];
                str = this._text.substring(start, end);
                _x = this.offsetXMessage[i];
                render.ctx.fillText(str, _x + this.scrollX, _y + this.scrollY);
                if (this.border) {
                    render.ctx.strokeText(str, _x + this.scrollX, _y + this.scrollY);
                }
                _y += this.fontSize + this.paddingTop;
                start = end;
            }
        }
    }

    distory(): void {

    }
}