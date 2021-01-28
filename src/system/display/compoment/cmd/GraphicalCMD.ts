import Byte from "../../math/Byte"

export default class GraphicalCMD{
    type:graphical_type
    buffer:Byte = new Byte;

    render(ctx:CanvasRenderingContext2D,type:draw_type):void{
        switch(type){
            case draw_type.line:
                break;
        }
    }
}

export enum graphical_type{
    line,surface
}

export enum draw_type{
    line,
}