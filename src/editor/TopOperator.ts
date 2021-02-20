import CImage from "../system/display/compoment/CImage";
import CLabel from "../system/display/compoment/CLabel";
import Box from "../system/display/compoment/ui/Box";
import { SELECT_ELEMENT, TOUCH_BEGIN } from "../system/event/EventConst";
import SystemEvent from "../system/event/eventStruct/SystemEvent";

export default class TopOperator extends Box {
    imageBtn: CImage;
    label:CLabel
    constructor() {
        super();
        this.init();
        this.addEvt();
    }
    init(): void {
        this.imageBtn = new CImage;
        this.addChild(this.imageBtn);
        this.imageBtn.setSprites(10,10,70,70);
        this.imageBtn.src = "./resource/90.jpg";
        this.addChild(this.label = new CLabel);
        this.label.y = 100;
        this.label.text = "label";
    }

    private addEvt(): void {
        this.imageBtn.on(TOUCH_BEGIN, this.touchBeginHandle, this);
        this.label.on(TOUCH_BEGIN,this.touchBeginHandle,this);
    }

    private touchBeginHandle(e: SystemEvent): void {
        let type:string;
        switch(e.currentTarget){
            case this.imageBtn:
                type = "image";
                break;
            case this.label:
                type = "label";
                break;
        }
        this.dispatch(SELECT_ELEMENT,{
            element:e.currentTarget,
            type
        })
    }
}