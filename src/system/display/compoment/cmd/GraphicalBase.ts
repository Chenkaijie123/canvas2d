import Render from "../../../render/Render";
import DisPlayNode from "../../DisPlayNode";
import GraphicalCMD from "./GraphicalCMD";

export default abstract class GraphicalBase extends DisPlayNode{
    cmd:GraphicalCMD = new GraphicalCMD;
    lineWidth:number = 1;
    protected needRecalc:boolean = true;
    save():void{}
    clear():void{}
    render(render: Render):void{
        this.save();
        this.cmd.render(render);
    }

}