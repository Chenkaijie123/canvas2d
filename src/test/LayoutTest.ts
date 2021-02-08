
import CLabel from "../system/display/compoment/CLabel";
import Box from "../system/display/compoment/ui/Box";
import GlobalMgr from "../system/global/GlobalMgr";
import TestBase from "./TestBase";

export default class LayoutTest extends TestBase{
    test():void{
        let box = new Box;
        GlobalMgr.stage.addChild(box);
        box.width = 500;
        box.height = 500
        let lab1 = new CLabel;
        lab1.text = "hello"
        lab1.right = 0;
        box.addChild(lab1)
        let lab2 = new CLabel
        lab2.text = "bottom"
        lab2.bottom = 0
        box.addChild(lab2)
        let lab3 = new CLabel
        lab3.text = "centerX"
        lab3.centerX = 0
        box.addChild(lab3)
        let lab4 = new CLabel
        lab4.text = "centerY"
        lab4.centerY = 0
        box.addChild(lab4)
        let lab5 = new CLabel
        lab5.text = "middle"
        lab5.centerX = lab5.centerY = 30
        box.addChild(lab5)
        

    }
}