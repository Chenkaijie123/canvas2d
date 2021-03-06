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
        // let b = new CImage;
        // GlobalMgr.stage.addChild(b)
        // for(let i = 0;i < 100;i++){
        //     for(let j = 0 ; j < 20;j++){
        //         let lab = new CLabel;
        //         lab.text = "hello"
        //         lab.x = i * 50
        //         lab.y = j * 30
        //         if(i % 2 || j % 2) lab.fontColor = "#ffe867"
        //         b.addChild(lab)
        //     }
        // }
        // for(let i = 0;i < 200;i++){
        //     for(let j = 0; j < 20 ;j++){
        //         let p = new CImage;
        //         p.x = i * 60;
        //         p.y = j * 60;
        //         p.src = "./90.jpg";
        //         p.setSprites(30,10,60,60)
        //         GlobalMgr.stage.addChild(p)
        //     }
        // }
        let lab = new CLabel
        lab.text = "???"
        GlobalMgr.stage.addChild(lab);
        
    }

}