import CLabel from "../system/display/compoment/CLabel";
import Box from "../system/display/compoment/ui/Box";
import List from "../system/display/compoment/ui/List";
import DisPlayNode from "../system/display/DisPlayNode";

export default class EditorAttrbuteView extends Box {
    list: List<unknown>
    constructor() {
        super();
        let list = new List;
        list.width = 300;
        list.height = 500;
        list.itemRender = EditorAttrItem;
        list.renderHandle = (v: EditorAttrItem, data: any) => {
            v.attrKeyLab.text = data.key;
            v.attrValueLab.text = data.value + "";
        }
        this.list = list;
        this.addChild(list);
        this.x = 300
    }

    refleshData(v: DisPlayNode): void {
        let res = [];
        for (let k in v) {
            if (typeof v[k] != "object" && typeof v[k] != "function") {
                res.push({ key: k, value: v[k] });
            }
        }
        this.list.data = res;
    }
}

class EditorAttrItem extends Box {
    attrKeyLab: CLabel = new CLabel;
    attrValueLab: CLabel = new CLabel;
    constructor() {
        super();
        this.width = 300;
        this.height = 30;
        this.addChild(this.attrKeyLab);
        this.addChild(this.attrValueLab);
        this.attrValueLab.x = 150;
    }
}