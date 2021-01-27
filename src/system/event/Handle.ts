import Idespose from "../Idespose";
let pool: Handle[] = [];
export default class Handle implements Idespose {
    public callBack: Function
    public caller: any
    public args: any[]

    release(): void {
        this.init();
        pool.push(this);
    }

    destory(): void {
        this.init();
    }

    run(): void {
        if (!this.callBack || !this.caller) {
            console.warn("handle 未初始化或者已被销毁")
            return;
        }
        if (this.args) {
            this.callBack.call(this.caller, ...this.args);
        } else {
            this.callBack.call(this.caller);
        }

    }

    runWith(data): void {
        this.callBack.call(this.caller, data);
    }

    /**@private */
    init(callback: Function = null, caller: any = null, args: any[] = null): void {
        this.callBack = callback;
        this.caller = caller;
        this.args = args;
    }

    static create(callback: Function, caller: any, args?: any[]): Handle {
        let handle = pool.pop() || new Handle;
        handle.init(callback, caller, args);
        return handle;
    }
}