import Box from "./compoment/ui/Box";

export default class Stage extends Box{
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