import Graphicis from "../system/display/compoment/cmd/Graphicis";
import GlobalMgr from "../system/global/GlobalMgr";
import TestBase from "./TestBase";

export default class GraphicisTest extends TestBase{
    test(){
        let g = new Graphicis;
        GlobalMgr.stage.addChild(g);
        g.strokeLine(10,10,100,100);
        g.strokeRect(100,100,100,100,"#bf0000",2)
        g.strokeTriangle(200,200,200,300,400,200)
        let [x,y] = [100,100]
        g.beginPath(x,y)
        g.strokeColor = "#ff0000"
        for(let i = 0;i < 10000;i++){
            x += Math.random() * 10 >> 0;
            y += Math.random() * 10 >> 0;
            g.lineTo(x,y)
        }
        g.stroke(true)
        g.strokeBezier(300,300,300,400,200,150,300,120)
        g.strokeArc(500,500,100,0,270,true,"#fababa",6)
        g.strokeCircle(300,300,100)
    }
}