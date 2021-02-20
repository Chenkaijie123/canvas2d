import { TOUCH_TAP } from "../../../event/EventConst";
import CLabel from "../CLabel";
import Box from "./Box";

const inputHtml = document.createElement("input");
inputHtml.style.position = "absolute";
inputHtml.style.top = inputHtml.style.left = "0px";
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
        document.body.appendChild(inputHtml);
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