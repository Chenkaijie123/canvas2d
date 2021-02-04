import Graphicis from "../system/display/compoment/cmd/Graphicis";
import GlobalMgr from "../system/global/GlobalMgr";
import TestBase from "./TestBase";

export default class GraphicisTest extends TestBase{
    test(){
        let g = new Graphicis;
        GlobalMgr.stage.addChild(g);
        g.strokeLine(10,10,100,100);
        g.strokeRect(100,100,100,100,"#bf0000",2)
    }
}