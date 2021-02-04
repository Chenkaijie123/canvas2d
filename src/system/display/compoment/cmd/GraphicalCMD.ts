import Render from "../../../render/Render";
import Byte from "../../math/Byte"

export default class GraphicalCMD {
    type: graphical_type
    buffer: Byte = new Byte;


    render(render: Render): void {
        render.renderCMD(this.buffer);
    }

    writeAsByte(): void {
        this.buffer.clear();

    }


}

export enum graphical_type {
    line, surface
}

export enum draw_type {
    line,
}