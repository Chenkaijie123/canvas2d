
import CImage from "../system/display/compoment/CImage";
import CLabel from "../system/display/compoment/CLabel";
import Box from "../system/display/compoment/ui/Box";
import DisPlayNode from "../system/display/DisPlayNode";
import Point from "../system/display/math/Point";
import { SELECT_ELEMENT, TOUCH_BEGIN, TOUCH_END, TOUCH_MOVE } from "../system/event/EventConst";
import SysTemTouchEvent from "../system/event/eventStruct/SysTemTouchEvent";
import GlobalMgr from "../system/global/GlobalMgr";
import TopOperator from "./TopOperator";

export default class EditorPanel extends Box {
    topOperator: TopOperator;
    operatorBox: Box;
    private selectElement: DisPlayNode;
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
        this.stage.on(TOUCH_MOVE, this.onMove, this);
        this.stage.on(TOUCH_END, () => {
            this.selectElement = null;
        }, this);
    }

    private onMove(e: SysTemTouchEvent): void {
        if (!this.selectElement) return;
        let p = new Point(e.x, e.y);
        this.operatorBox.globalToLocal(p);
        this.selectElement.x = p.x;
        this.selectElement.y = p.y;
    }

    private proxyHandle(data: { element: DisPlayNode, type: string }): void {
        switch (data.type) {
            case "image":
                let img = new CImage;
                let { x, y } = data.element;
                let p = new Point(x, y);
                data.element.localToGlobal(p);
                this.operatorBox.globalToLocal(p);
                img.src = "./resource/90.jpg";
                img.setSprites(10, 10, 70, 70);
                img.x = p.x;
                img.y = p.y;
                this.operatorBox.addChild(img);
                this.selectElement = img;
                img.on(TOUCH_BEGIN, () => {
                    this.selectElement = img;
                }, this)
                break;
            case "label":
                let label = new CLabel;
                label.text = "label";
                this.operatorBox.addChild(label);
                label.on(TOUCH_BEGIN, () => {
                    this.selectElement = label;
                }, this);
                this.selectElement = label;
                break;
        }
    }
}