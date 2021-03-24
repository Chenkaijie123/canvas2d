
import XMLParser from "../../../utils/parser/XMLParser";
import CLabel from "../CLabel";
import Box from "./Box";
const parser: XMLParser = new XMLParser;
export default class HtmlLabel extends Box {
    fontSize: number = 18;
    fontColor: string = "#c5b596";
    fontFamily: string = "微软雅黑";
    lineHeight: number;
    paddingTop: number = 0;
    private multiData: multiData[] = [];
    private _innerHtml: string;
    clear(): void {
        this.multiData.length = 0;
        this.removeChildren();
        this._innerHtml = null;
    }
    set innerHtml(v: string) {
        this.clear();
        if (!v) return;
        this._innerHtml = v;
        let res = parser.parse(`<font color = '${this.fontColor
            }' fontSize = ${this.fontSize} fontFamily = '${this.fontFamily}'>${v}</font>`);
        let lab: CLabel;
        let _x: number = 0;
        let _y: number = 0;
        let maxLen: number = Number.MAX_VALUE;
        let needSplit: boolean;
        //没有支持英文和符号的布局，默认都是全角字符
        for (let data of res) {
            if (!this.autoReSize) {
                maxLen = Math.floor((this.width - _x) / data.fontSize);
            }
            needSplit = maxLen > data.text.length
            lab = this.createLab(needSplit ? data.text : data.text.substr(0, maxLen), data.fontSize, data.fontFamily, data.color);
            lab.x = _x;
            lab.y = _y;
            this.addChild(lab);
            _x += lab.text.length * data.fontSize;
            if (_x > this.width - data.fontSize + 1 && !this.autoReSize) {
                _x = 0;
                _y += (this.lineHeight || this.fontSize) + this.paddingTop;
            }
            if (!needSplit) {
                lab = this.createLab(data.text.substr(maxLen), data.fontSize, data.fontFamily, data.color);
                lab.x = _x;
                lab.y = _y;
                this.addChild(lab);
                _x += lab.text.length * data.fontSize;
                if (_x > this.width && !this.autoReSize) {
                    _x = 0;
                    _y += (this.lineHeight || this.fontSize) + this.paddingTop;
                }
            }
        }
        if (this.autoReSize) {
            this.width = _x;
        }
        this.height = _y + this.fontSize;
    }

    get innerHtml(): string {
        return this._innerHtml;
    }

    private createLab(text: string, fontSize: number, fontFamily: string, color: string): CLabel {
        let lab = new CLabel;
        lab.fontSize = fontSize;
        lab.fontFamily = fontFamily;
        lab.fontColor = color;
        lab.text = text;
        return lab
    }

}

/**富文本支持的字段 */
export type multiData = {
    text: string
    color: string
    fontSize: number
    border?: boolean
    strokeColor?: string
    fontFamily?: string
}