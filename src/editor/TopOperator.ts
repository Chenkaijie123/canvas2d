import CImage from "../system/display/compoment/CImage";
import Box from "../system/display/compoment/ui/Box";
import { SELECT_ELEMENT, TOUCH_TAP } from "../system/event/EventConst";
import SystemEvent from "../system/event/eventStruct/SystemEvent";

export default class TopOperator extends Box {
    imageBtn: CImage;
    constructor() {
        super();
        this.init();
    }
    init(): void {
        this.imageBtn = new CImage;
        this.addChild(this.imageBtn);
        this.imageBtn.src = "./resource/90.jpg";
    }

    proxyInit(): void {
        this.imageBtn.on(TOUCH_TAP, this.clickHandle, this);
    }

    private clickHandle(e: SystemEvent): void {
        let type:string;
        switch(e.currentTarget){
            case this.imageBtn:
                type = "image";
                break;
        }
        this.dispatch(SELECT_ELEMENT,{
            element:e.currentTarget,
            type
        })
    }
}