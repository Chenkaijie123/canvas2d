import CImage from "../system/display/compoment/CImage";
import Box from "../system/display/compoment/ui/Box";

export default class TopOperator extends Box{
    imageBtn:CImage;
    constructor(){
        super();
        this.init();
    }
    init():void{
        this.imageBtn = new CImage;
        this.addChild(this.imageBtn);
        this.imageBtn.src = "./resource/90.jpg";
    }
}