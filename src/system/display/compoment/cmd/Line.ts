
import StringUtils from "../../../utils/StringUtils";
import GraphicalBase from "./GraphicalBase";
import { draw_type } from "./GraphicalCMD";

export default class Line extends GraphicalBase {
    point: number[] = []
    private _color: number = 12957078;
    private oldLen: number = 0;

    get color() { return this._color }
    set color(v: number) {
        if (this._color == v) return;
        this.needRecalc = true;
        this._color = v;
    }
    setColorByStr(v: string) {
        this._color = StringUtils.radix16To10(v);
    }

    save(): void {
        if (!this.needRecalc) return;
        if (this.point.length === this.oldLen) return;
        this.oldLen = this.point.length;
        this.needRecalc = false;
        let buffer = this.cmd.buffer;
        buffer.clear();
        buffer.writeUint8(draw_type.line);
        buffer.writeUint32(this.point.length >> 1);
        buffer.writeUint32(this._color);
        buffer.writeUint8(this.lineWidth);
        for (let i of this.point) {
            buffer.writeUint16(i);
        }
    }

    clear(): void {
        this.point.length = 0;
        this.oldLen = 0;
        this.cmd.buffer.clear();
    }

}