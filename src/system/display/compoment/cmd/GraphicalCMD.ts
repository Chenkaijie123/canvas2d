import Render from "../../../render/Render";
import Byte from "../../math/Byte"

export default class GraphicalCMD{
    type:graphical_type
    buffer:Byte = new Byte;

    render(render:Render):void{
        let type:draw_type = this.buffer.readUint8();
        let len:number = this.buffer.readUint16();
        let color:string = (new Number(this.buffer.readUint32())).toString(16);
        switch(type){
            case draw_type.line:
                render.strokeColor = "#" + color;
                render.ctx.beginPath();
                render.ctx.moveTo(this.buffer.readUint16(),this.buffer.readUint16())
                for(let i = 1;i< len;i++){
                    render.ctx.lineTo(this.buffer.readUint16(),this.buffer.readUint16());
                }
                render.ctx.stroke();
                break;
        }
    }

    writeAsByte():void{
        this.buffer.clear();
        
    }


}

export enum graphical_type{
    line,surface
}

export enum draw_type{
    line,
}