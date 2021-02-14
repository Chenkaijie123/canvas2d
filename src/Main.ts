
import Canvas from "./system/global/Canvas";
import GlobalMgr from "./system/global/GlobalMgr";
import GMPanel from "./system/gm/GMPanel";
import Test from "./test/Test";


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
        GlobalMgr.canvas = this.canvas = new Canvas;
        this.test();
    }

    private test():void{

        new Test();
        GlobalMgr.stage.addChild(new GMPanel());
    }
}
new Main