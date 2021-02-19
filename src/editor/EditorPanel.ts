
import Box from "../system/display/compoment/ui/Box";
import TopOperator from "./TopOperator";

export default class EditorPanel extends Box {
    topOperator: TopOperator;
    constructor() {
        super();
        this.init();
    }

    private init(): void {
        this.topOperator = new TopOperator;
        this.addChild(this.topOperator);
    }
}