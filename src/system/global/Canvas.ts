import Stage from "../display/Stage";
import Dispatcher from "../event/Dispatcher";
import MouseEventMgr from "../event/MouseEventMgr";
import Render from "../render/Render";
// import SystemPerformance from "../SystemPerformance";
import Ticker from "../ticker/Ticker";
import GlobalMgr from "./GlobalMgr";

export default class Canvas {
    canvasDom: HTMLCanvasElement;
    render: Render;
    stage: Stage;
    ticker: Ticker;
    mouseEvtMgr: MouseEventMgr;
    constructor() {
        this.canvasDom = document.createElement("canvas");
        this.canvasDom.width = window.innerWidth;
        this.canvasDom.height = window.innerHeight;
        document.body.appendChild(this.canvasDom);
        this.ticker = GlobalMgr.ticker = new Ticker;
        this.stage = GlobalMgr.stage = new Stage;
        this.stage.init(window.innerWidth, window.innerHeight);
        this.render = new Render;
        this.render.init(this.canvasDom, this.stage);
        this.ticker.addLoop(this.startRender, this);
        this.ticker.start();
        this.mouseEvtMgr = new MouseEventMgr(this);
        GlobalMgr.dispatcher = new Dispatcher;
    }

    // @SystemPerformance.logCostTime("render",5)
    private startRender(): void {
        this.render.resetMatrix();
        this.render.clear();
        this.render.updateStokeContent(true);
        this.render.updateFontContent(true);
        this.render.renderList(this.stage.children);
    }
}