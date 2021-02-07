import Render from "../../../render/Render";
import Byte from "../../math/Byte"

export default class GraphicalCMD {
    buffer: Byte = new Byte;


    render(render: Render): void {
        render.renderByte(this.buffer);
    }

    writeAsByte(): void {
        this.buffer.clear();

    }


}



export enum draw_type {
    line,curve,arc,circle,bezir,rect,circleFill
}