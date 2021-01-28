import SystemEvent from "./SystemEvent";

let pool :SysTemTouchEvent[] = [];
export default class SysTemTouchEvent extends SystemEvent{
    x:number
    y:number
    release(){
        super.release();
        pool.push(this);
    }

    static create(sourceEvt:MouseEvent):SysTemTouchEvent{
        let evt = pool.pop() || new SysTemTouchEvent;
        evt.sourceEvent = sourceEvt;
        evt.x = sourceEvt.pageX;
        evt.y = sourceEvt.pageY;
        return evt
    }
}