
// import EditorPanel from "./editor/EditorPanel";
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
        // GlobalMgr.stage.addChild(new EditorPanel);
        new Test();
        GMPanel//.show();
    }
}
new Main