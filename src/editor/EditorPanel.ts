
import CImage from "../system/display/compoment/CImage";
import CLabel from "../system/display/compoment/CLabel";
import Box from "../system/display/compoment/ui/Box";
import TextInput from "../system/display/compoment/ui/TextInput";
import DisPlayNode from "../system/display/DisPlayNode";
import Point from "../system/display/math/Point";
import { SELECT_ELEMENT, TOUCH_BEGIN, TOUCH_END, TOUCH_MOVE } from "../system/event/EventConst";
import SysTemTouchEvent from "../system/event/eventStruct/SysTemTouchEvent";
import GlobalMgr from "../system/global/GlobalMgr";
import EditorAttrbuteView from "./EditorAttrbuteView";
import EditorMdl from "./EditorMdl";
import EditorTree from "./EditorTree";
import TopOperator from "./TopOperator";

export default class EditorPanel extends Box {
    topOperator: TopOperator;
    operatorBox: Box;
    tree: EditorTree;
    attrView: EditorAttrbuteView
    private selectElement: DisPlayNode;
    private _element: DisPlayNode;
    private get element() { return this._element }
    private set element(v: DisPlayNode) {
        this._element = v;
        this.attrView.refleshData(v)
    }
    constructor() {
        super();
        this.init();
    }

    private init(): void {
        this.width = GlobalMgr.stage.width;
        this.height = GlobalMgr.stage.height;
        this.topOperator = new TopOperator;
        this.addChild(this.topOperator);
        this.topOperator.on(SELECT_ELEMENT, this.proxyHandle, this);
        this.addChild(this.operatorBox = new Box);
        this.operatorBox.width = GlobalMgr.stage.width;
        this.operatorBox.height = GlobalMgr.stage.height;
        this.tree = new EditorTree;
        this.tree.width = 300;
        this.tree.height = GlobalMgr.stage.height;
        this.tree.right = 0;
        this.addChild(this.tree);
        this.attrView = new EditorAttrbuteView;
        this.attrView.right = 300;
        this.attrView.width = 300;
        this.attrView.height = GlobalMgr.stage.height;
        this.addChild(this.attrView);
        this.stage.on(TOUCH_MOVE, this.onMove, this);
        this.stage.on(TOUCH_END, () => {
            this.selectElement = null;
        }, this);
        EditorMdl.ins.on(EditorMdl.ATTRCHANGE, this.changeValue, this);
    }

    private onMove(e: SysTemTouchEvent): void {
        if (!this.selectElement) return;
        let p = new Point(e.x, e.y);
        this.operatorBox.globalToLocal(p);
        this.selectElement.x = p.x;
        this.selectElement.y = p.y;
    }

    private proxyHandle(data: { element: DisPlayNode, type: string }): void {
        let display: DisPlayNode;
        switch (data.type) {
            case "image":
                let img = new CImage;
                let { x, y } = data.element;
                let p = new Point(x, y);
                data.element.localToGlobal(p);
                this.operatorBox.globalToLocal(p);
                img.src = "./resource/90.jpg";
                img.setSprites(10, 10, 70, 70);
                display = img;
                break;
            case "label":
                let label = new CLabel;
                label.text = "label";
                display = label;
                break;
            case "textInput":
                let ipt = new TextInput;
                display = ipt;
                break;

        }
        this.operatorBox.addChild(display);
        this.selectElement = display;
        this.element = display;
        display.on(TOUCH_BEGIN, () => {
            this.selectElement = display;
            this.element = display;
        }, this);
        this.refleshTree();
    }

    private refleshTree(): void {
        this.tree.refleshTree(this.operatorBox.children);
    }

    public changeValue(data: { key: string, value: any }): void {
        let { key, value } = data;
        if (!this.element) return;
        if (typeof this.element[key.substring(1)] == "number") {
            this.element[key.substring(1)] = +value;
        } else {
            this.element[key.substring(1)] = value;
        }
    }
}