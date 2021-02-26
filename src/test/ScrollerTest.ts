import CImage from "../system/display/compoment/CImage";
import CLabel from "../system/display/compoment/CLabel";
import Scroller from "../system/display/compoment/ui/Scroller";
import GlobalMgr from "../system/global/GlobalMgr";
import TestBase from "./TestBase";

export default class ScrollerTest extends TestBase{
    test(){
        let v = new Scroller;
        v.x = 100
        v.y = 200
        v.width = 100;
        v.height = 100;
        let img = new CImage
        img.src = "./90.jpg"
        v.addChild(img);
        let lab = new CLabel;
        v.addChild(lab)
        lab.text = "hello world"
        lab.y = 300
        GlobalMgr.stage.addChild(v);
    }
}