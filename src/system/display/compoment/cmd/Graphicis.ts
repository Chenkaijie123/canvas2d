import Render from "../../../render/Render";
import StringUtils from "../../../utils/StringUtils";
import DisPlayNode from "../../DisPlayNode";
import Byte from "../../math/Byte";
import { draw_type } from "./GraphicalCMD";

export default class Graphicis extends DisPlayNode {
    cmds: Byte[] = [];
    private temp: number[] = [];
    private tempLineWidth: number = 1;
    private tempColor: string = "#c5b596";
    private _fillColor: string = "#c5b596";

    render(render: Render): void {
        for (let i of this.cmds) {
            render.renderByte(i);
        }
    }

    clearAllCMD(): void {
        this.cmds.length = 0;
    }

    private writeUint16(byte: Byte, ...num: number[]): void {
        for (let i of num) {
            byte.writeUint16(i);
        }
    }

    //----------------------------cmd------------------------------
    get strokeColor() { return this.tempColor }
    set strokeColor(v: string) {
        this.tempColor = v;
    }
    get lineWidth() { return this.tempLineWidth }
    set lineWidth(v: number) {
        this.tempLineWidth = v;
    }
    get fillColor() { return this._fillColor }
    set fillColor(v: string) {
        this._fillColor = v;
    }
    strokeLine(x1: number, y1: number, x2: number, y2: number,
        color: string = this.tempColor, lineWidth: number = this.tempLineWidth): void {
        let byte = new Byte;
        byte.writeInt8(draw_type.line);
        byte.writeUint32(2);
        byte.writeUint32(StringUtils.radix16To10(color));
        byte.writeUint8(lineWidth);
        this.writeUint16(byte, x1, y1, x2, y2);
        this.cmds.push(byte);
    }

    strokeRect(
        x: number, y: number, width: number, height: number,
        color: string = this.tempColor, lineWidth: number = this.tempLineWidth): void {
        let byte = new Byte;
        byte.writeInt8(draw_type.line);
        byte.writeUint32(5);
        byte.writeUint32(StringUtils.radix16To10(color));
        byte.writeUint8(lineWidth);
        this.writeUint16(
            byte,
            x, y,
            x + width, y,
            x + width, y + height,
            x, y + height,
            x, y
        );
        this.cmds.push(byte);
    }

    strokeTriangle(
        x1: number, y1: number, x2: number, y2: number, x3: number, y3: number,
        color: string = this.tempColor, lineWidth: number = this.tempLineWidth): void {
        let byte = new Byte;
        byte.writeInt8(draw_type.line);
        byte.writeUint32(4);
        byte.writeUint32(StringUtils.radix16To10(color));
        byte.writeUint8(lineWidth);
        this.writeUint16(
            byte,
            x1, y1,
            x2, y2,
            x3, y3,
            x1, y1
        );
        this.cmds.push(byte);
    }

    strokeBezier(
        cx1: number, cy1: number, cx2: number, cy2: number,
        startX1: number, startY1: number, startX2: number, startY2: number,
        color: string = this.tempColor, lineWidth: number = this.tempLineWidth): void {
        let byte = new Byte;
        byte.writeInt8(draw_type.bezir);
        byte.writeUint32(4);
        byte.writeUint32(StringUtils.radix16To10(color));
        byte.writeUint8(lineWidth);
        this.writeUint16(byte, cx1, cy1, cx2, cy2, startX1, startY1, startX2, startY2);
        this.cmds.push(byte);
    }

    strokeArc(
        x: number, y: number, radius: number, startAngle: number, endAngle: number, anticlockwise: boolean = true,
        color: string = this.tempColor, lineWidth: number = this.tempLineWidth): void {
        startAngle %= 360;
        endAngle %= 360;
        let byte = new Byte;
        byte.writeInt8(draw_type.arc);
        byte.writeUint32(0);
        byte.writeUint32(StringUtils.radix16To10(color));
        byte.writeUint8(lineWidth);
        this.writeUint16(byte, x, y, radius);
        byte.writeUint16(startAngle);
        byte.writeUint16(endAngle);
        byte.writeBoolean(anticlockwise);
        this.cmds.push(byte);
    }

    strokeCircle(
        x: number, y: number, radius: number,
        color: string = this.tempColor, lineWidth: number = this.tempLineWidth): void {
        let byte = new Byte;
        byte.writeInt8(draw_type.circle);
        byte.writeUint32(0);
        byte.writeUint32(StringUtils.radix16To10(color));
        byte.writeUint8(lineWidth);
        this.writeUint16(byte, x, y, radius);
        this.cmds.push(byte);
    }

    beginPath(x: number, y: number): void {
        this.temp.length = 0;
    }

    lineTo(x: number, y: number): void {
        this.temp.push(x, y);
    }

    stroke(curve: boolean = false): void {
        let byte = new Byte;
        byte.writeInt8(curve ? draw_type.curve : draw_type.line);
        byte.writeUint32(this.temp.length >> 1);
        byte.writeUint32(StringUtils.radix16To10(this.tempColor));
        byte.writeUint8(this.tempLineWidth);
        this.writeUint16(byte, ...this.temp);
        this.cmds.push(byte);
    }

    drawRect(x: number, y: number, width: number, height: number, color: string = this.fillColor): void {
        let byte = new Byte;
        byte.writeInt8(draw_type.rect);
        byte.writeUint32(0);
        byte.writeUint32(StringUtils.radix16To10(color));
        this.writeUint16(byte, x, y, width, height);
        this.cmds.push(byte);
    }

    drawCircle(x: number, y: number, radius: number, color: string = this.fillColor): void {
        let byte = new Byte;
        byte.writeInt8(draw_type.circleFill);
        byte.writeUint32(0);
        byte.writeUint32(StringUtils.radix16To10(color));
        this.writeUint16(byte, x, y, radius);
        this.cmds.push(byte);
    }





}