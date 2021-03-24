import HtmlLabel from "../system/display/compoment/ui/HtmlLabel";
import { TOUCH_TAP } from "../system/event/EventConst";
import SysTemTouchEvent from "../system/event/eventStruct/SysTemTouchEvent";
import GlobalMgr from "../system/global/GlobalMgr";
import TestBase from "./TestBase";

export default class HtmlLabelTest extends TestBase {
    test() {
        let lab = new HtmlLabel;
        lab.fontSize = 15
        lab.innerHtml = "<font color='#0033CC' fontSize=18>整个都是蓝色</font><font color = '#FF0000'>这个是红色</font>"
        GlobalMgr.stage.addChild(lab)
        lab.on(TOUCH_TAP, (e: SysTemTouchEvent) => { console.log("click") }, this)
        setTimeout(() => {
            lab.innerHtml = "哈哈哈哈哈哈"
        }, 3000);
    }
}