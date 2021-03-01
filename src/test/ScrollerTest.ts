import CImage from "../system/display/compoment/CImage";
import CLabel from "../system/display/compoment/CLabel";
import Scroller from "../system/display/compoment/ui/Scroller";
import { TOUCH_TAP } from "../system/event/EventConst";
import GlobalMgr from "../system/global/GlobalMgr";
import TestBase from "./TestBase";

export default class ScrollerTest extends TestBase{
    test(){
        let v = new Scroller;
        v.x = 100
        v.y = 100
        v.width = 100;
        v.height = 100;
        let img = new CImage
        img.src = "./90.jpg"
        v.addChild(img);
        let lab = new CLabel;
        v.addChild(lab)
        lab.text = "hello world"
        lab.x = 100
        lab.y = 300
        lab.on(TOUCH_TAP,()=>{console.log("click")},this)
        GlobalMgr.stage.addChild(v);
    }
}