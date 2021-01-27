
import CImage from "./system/display/compoment/CImage";
import CLabel from "./system/display/compoment/CLabel";
import { TOUCH_TAP } from "./system/event/EventConst";
import Canvas from "./system/global/Canvas";
import GlobalMgr from "./system/global/GlobalMgr";
import Test from "./Test"


class Main{
    canvas:Canvas
    constructor(){
        this.init()

    }

    init():void{
        window.addEventListener("load",this.initAll);
    }

    private initAll = (e) => {
        window.removeEventListener("load",this.initAll);
        this.canvas = new Canvas;
        this.test();
        new Test
    }

    private test():void{
        let img = new CImage;
        img.src = "./90.jpg"
        img.setSprites(30,10,60,60)
        img.on(TOUCH_TAP,()=>{console.log("img")},this)
        GlobalMgr.stage.addChild(img)
        // let i = new CImage;
        // i.src = "./narrow.jpeg"
        // i.width = i.height = 200
        // i.x = 300
        // img.addChild(i);
        // let j = new CImage
        // j.src = "./90.jpg"
        // j.setSprites(30,10,60,60)
        // j.scaleX = -1
        // j.anchorX = 30
        // j.anchorY = 30
        // i.addChild(j)
        // setInterval(()=>{j.rotate++},10)
        // let lab = new CLabel;
        // lab.text = "微软雅黑"
        // GlobalMgr.stage.addChild(lab);
        // lab.x = 300
        // lab.y = 200
        let lab1 = new CLabel
        lab1.text = "微软雅黑dasdasdsadsadsadsa"
        lab1.fontFamily = "微软雅黑"
        lab1.fontColor = "#1f1afa"
        lab1.width = 200
        lab1.border = true;
        lab1.x = 300
        lab1.y = 100
        lab1.fontSize = 30
        // lab1.height = 300;
        lab1.textAlign = "center"
        img.addChild(lab1)
        const fn = ()=>{
            console.log("lab1")
            lab1.off(TOUCH_TAP,fn,this)
        }
        lab1.on(TOUCH_TAP,fn,this)
    }
}
new Main