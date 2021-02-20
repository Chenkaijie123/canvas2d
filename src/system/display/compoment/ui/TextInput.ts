import { TOUCH_TAP } from "../../../event/EventConst";
import Point from "../../math/Point";
import CLabel from "../CLabel";
import Box from "./Box";

const inputHtml = document.createElement("input");
inputHtml.style.position = "absolute";
export default class TextInput extends Box {
    label: CLabel = new CLabel;
    constructor() {
        super();
        this.addChild(this.label);
        this.label.text = "input";
        this.on(TOUCH_TAP, this.onFocus, this);
    }

    onFocus(): void {
        inputHtml.addEventListener("input", this.onInput);
        inputHtml.addEventListener("blur", this.onblur);
        document.body.appendChild(inputHtml);
        let p = new Point(this.x,this.y);
        this.localToGlobal(p);
        inputHtml.style.left = p.x + "px";
        inputHtml.style.top = p.y + "px";
        inputHtml.focus();
    }

    onblur(): void {
        inputHtml.removeEventListener("input", this.onInput);
        inputHtml.parentElement && inputHtml.parentElement.removeChild(inputHtml);
    }

    onInput = () => {
        this.label.text = inputHtml.value + "";
    }
}