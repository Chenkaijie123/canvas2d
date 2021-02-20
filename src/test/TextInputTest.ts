import TextInput from "../system/display/compoment/ui/TextInput";
import GlobalMgr from "../system/global/GlobalMgr";
import TestBase from "./TestBase";

export default class TextInputTest extends TestBase{
    test(){
        let t = new TextInput;
        GlobalMgr.stage.addChild(t);
    }
}