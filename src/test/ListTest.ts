import CLabel from "../system/display/compoment/CLabel";
import Box from "../system/display/compoment/ui/Box";
import List from "../system/display/compoment/ui/List";
import GlobalMgr from "../system/global/GlobalMgr";
import TestBase from "./TestBase";

export default class ListTest extends TestBase {
    test() {
        let list = new List;
        list.itemRender = ScItem
        list.width = 100
        list.height = 100
        list.x = 200
        list.y = 100
        list.renderHandle = (item: ScItem, data: string, idx: number) => {
            item.lab.text = data;
            console.log(idx)
        }
        let datas = []
        for (let i = 0; i < 10; i++) {
            datas.push(i + "")
        }
        list.data = datas
        GlobalMgr.stage.addChild(list)

        // list = new List;
        // list.itemRender = ScItem
        // list.width = 100
        // list.height = 100
        // list.x = 200
        // list.y = 300
        // list.dirction = 2
        // list.renderHandle = (item: ScItem, data: string, idx: number) => {
        //     item.lab.text = data;
        //     console.log(idx)
        // }
        // list.data = datas
        // GlobalMgr.stage.addChild(list)
    }
}

class ScItem extends Box {
    lab: CLabel = new CLabel
    constructor() {
        super();
        this.width = 50;
        this.height = 20
        this.addChild(this.lab);
    }
}

