import CLabel from "../system/display/compoment/CLabel";
import Box from "../system/display/compoment/ui/Box";
import List from "../system/display/compoment/ui/List";
import TextInput from "../system/display/compoment/ui/TextInput";
import DisPlayNode from "../system/display/DisPlayNode";
import { ON_BLUR } from "../system/event/EventConst";
import EditorMdl from "./EditorMdl";

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
    attrValueLab: TextInput = new TextInput;
    constructor() {
        super();
        this.width = 300;
        this.height = 30;
        this.addChild(this.attrKeyLab);
        this.addChild(this.attrValueLab);
        this.attrValueLab.x = 150;
        this.attrValueLab.on(ON_BLUR,this.changeValue,this);
    }

    private changeValue():void{
        EditorMdl.ins.dispatch(EditorMdl.ATTRCHANGE,{key:this.attrKeyLab.text,value:this.attrValueLab.text});
    }
}