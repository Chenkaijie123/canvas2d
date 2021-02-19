import CLabel from "../system/display/compoment/CLabel";
import Box from "../system/display/compoment/ui/Box";
import { ITreeNode } from "../system/display/compoment/ui/IUI";
import Tree from "../system/display/compoment/ui/Tree";
import GlobalMgr from "../system/global/GlobalMgr";
import TestBase from "./TestBase";

export default class TreeTest extends TestBase {
    test() {
        let tree = new Tree;
        tree.itemRender = TreeN;
        tree.renderHandle = (n: TreeN, data) => {
            n.lab.text = `${data.open ? "-" : data.children ? "+" : ""}${data.lab}`
        }
        tree.data = [
            { lab: "file1" },
            {
                lab: "file2",
                open: true,
                children: [
                    // {
                    //     lab: "file5",
                    //     open: true,
                    //     children: [
                    //         { lab: "file6" },
                    //         { lab: "file7" },
                    //     ]
                    // },
                    { lab: "file8" },
                ]
            },
            { lab: "file3" },
            { lab: "file4" },
        ]
        GlobalMgr.stage.addChild(tree)
    }
}

class TreeN extends Box implements ITreeNode {
    lab: CLabel
    constructor() {
        super()
        this.lab = new CLabel
        this.addChild(this.lab)
    }
    selectHandle(open: boolean, data: any): void {
        this.lab.text = `${data.children ? open ? "-" : "+" : ""}${data.lab}`
    }


}