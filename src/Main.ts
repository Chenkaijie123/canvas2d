
import Canvas from "./system/global/Canvas";
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
        this.canvas = new Canvas;
        this.test();
    }

    private test():void{

        new Test();
    }
}
new Main