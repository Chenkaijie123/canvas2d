import CImage from "../system/display/compoment/CImage";
import Line from "../system/display/compoment/cmd/Line";
import GlobalMgr from "../system/global/GlobalMgr";
import TestBase from "./TestBase";

export default class GraphicalTest extends TestBase{
    test(){
        let img = new CImage;
        img.src = "./90.jpg"
        img.scaleX = .5
        GlobalMgr.stage.addChild(img)
        let g = new Line;
        g.x = 100
        g.y = 100;
        g.point.push(0,0,100,100,0,200,0,0)
        img.addChild(g);
    }
}