import Dispatcher from "../event/Dispatcher"
import { CALL_FRAME } from "../event/EventConst"

export default class Ticker extends Dispatcher{
    private state:number = 0;
    private isStop:boolean = true;
    private loop():void{
        if(this.state != 1) {
            this.isStop = true;
            return;
        }
        this.dispatch(CALL_FRAME);
        window.requestAnimationFrame(this.loop.bind(this))
    }

    addLoop(callback:Function,caller:any){
        this.on(CALL_FRAME,callback,caller)
    }

    removeLoop(callback:Function,caller:any):void{
        this.off(CALL_FRAME,callback,caller);
    }

    start():void{
        if(this.state == 1) return;
        this.state = 1;
        if(this.isStop){
            this.loop();
            this.isStop = false;
        }
    }

    stop():void{
        if(this.state != 1) return;
        this.state = 0;
    }
    
}