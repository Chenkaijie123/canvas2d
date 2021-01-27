import DisPlayNode from "./DisPlayNode";

export default class Stage extends DisPlayNode {
    constructor() {
        super();
    }

    init(width: number, height: number): void {
        this.width = width;
        this.height = height;
    }
    render(): void {

    }
}