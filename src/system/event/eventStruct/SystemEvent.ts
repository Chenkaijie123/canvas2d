export default class SystemEvent{
    sourceEvent:Event;
    _stopEvent:boolean = false;
    target:any
    currentTarget:any;
    type:"touchBegin"|"touchMove" | "touchTap"|"system"|"touchEnd"|"touchCancel"
    release():void{
        this.sourceEvent = this.target = this.currentTarget = null;
        this.type = null;
    }
    
    stopImmediatePropagation():void{
        this.sourceEvent.stopImmediatePropagation();
        this._stopEvent = true;
    }
}