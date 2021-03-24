
import CImage from "../CImage";
import CLabel from "../CLabel";
import Box from "./Box";

export default class Button extends Box {
    label: CLabel = new CLabel;
    btn: CImage = new CImage;
    constructor() {
        super();
        this.addChild(this.btn);
        this.addChild(this.label);
    }

    set text(v: string) {
        this.label.text = v;
    }

    set skin(v: string) {
        this.btn.src = v;
    }

}