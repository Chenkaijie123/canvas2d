import CImage from "../system/display/compoment/CImage";
import GlobalMgr from "../system/global/GlobalMgr";
import TestBase from "./TestBase";

export default class LayoutTest extends TestBase{
    test():void{
        let img = new CImage;
        img.src = "./90.jpg"
        GlobalMgr.stage.addChild(img)
        

    }
}