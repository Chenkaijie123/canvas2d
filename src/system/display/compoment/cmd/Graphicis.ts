import Render from "../../../render/Render";
import StringUtils from "../../../utils/StringUtils";
import DisPlayNode from "../../DisPlayNode";
import Byte from "../../math/Byte";
import { graphical_type } from "./GraphicalCMD";

export default class Graphicis extends DisPlayNode {
    cmds: Byte[] = [];


    render(render: Render): void {
        for(let i of this.cmds){
            render.renderCMD(i);
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
    strokeLine(x1: number, y1: number, x2: number, y2: number, color: string = "#c5b596", lineWidth: number = 1): void {
        let byte = new Byte;
        byte.writeInt8(graphical_type.line);
        byte.writeUint16(2);
        byte.writeUint32(StringUtils.radix16To10(color));
        byte.writeUint8(lineWidth);
        this.writeUint16(byte, x1, y1, x2, y2);
        this.cmds.push(byte);
    }

    strokeRect(x: number, y: number, width: number, height: number, color: string = "#c5b596", lineWidth: number = 1): void {
        let byte = new Byte;
        byte.writeInt8(graphical_type.line);
        byte.writeUint16(5);
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
}