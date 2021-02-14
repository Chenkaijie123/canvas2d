import CImage from "../CImage";
import CLabel from "../CLabel";
import Box from "./Box";

export default class Button extends Box{
    label:CLabel = new CLabel;
    skin:CImage = new CImage;
    constructor(){
        super();
        this.addChild(this.skin);
        this.addChild(this.label);
    }
}