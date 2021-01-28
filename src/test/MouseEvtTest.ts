import CImage from "../system/display/compoment/CImage";
import CLabel from "../system/display/compoment/CLabel";
import { TOUCH_BEGIN, TOUCH_CANCEL, TOUCH_DOUBLE, TOUCH_MOVE, TOUCH_TAP } from "../system/event/EventConst";
import GlobalMgr from "../system/global/GlobalMgr";
import TestBase from "./TestBase";


export default class MouseEvtTest extends TestBase{
    test(): void {
        let img = new CImage;
        img.src = "./90.jpg";
        img.scaleX = 2;
        img.x = 100
        img.y = 100
        img.setSprites(30,10,60,60)
        img.on(TOUCH_TAP,()=>{console.log("tap")},this)
        img.on(TOUCH_DOUBLE,()=>{console.log("db")},this)
        img.on(TOUCH_CANCEL,()=>{console.log("cancel")},this)
        img.on(TOUCH_BEGIN,()=>{console.log("begin")},this)
        img.on(TOUCH_MOVE,()=>{console.log("move")},this)
        GlobalMgr.stage.addChild(img)
        for(let i = 0;i < 40;i++){
            for(let j = 0 ; j < 20;j++){
                let lab = new CLabel;
                lab.text = "hello"
                lab.x = i * 50
                lab.y = j * 30
                if(i % 2 || j % 2) lab.fontColor = "#ffe867"
                GlobalMgr.stage.addChild(lab)
            }
        }
        let test = new CLabel
        test.fontColor = "#aabca1"
        test.x = 100
        img.addChild(test)
        test.text = "?????"
    }

}