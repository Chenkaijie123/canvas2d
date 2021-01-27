import Handle from "./Handle";

export default class Dispatcher {
    private map: Map<string | symbol, Handle[]> = new Map;

    on(type: string | symbol, callback: Function, caller: any, args?: any[]): boolean {
        if(this.has(type, callback, caller)) return false;
        let map = this.getEvtList(type);
        map.push(Handle.create(callback, caller, args));
        return true
    }

    off(type: string | symbol, callback: Function, caller: any): boolean {
        return this.check(type, callback, caller, true)
    }

    has(type: string | symbol, callback: Function, caller: any): boolean {
        return this.check(type, callback, caller);
    }

    private check(type: string | symbol, callback: Function, caller: any, del: boolean = false): boolean {
        let map = this.getEvtList(type);
        let idx = 0;
        for (let i of map) {
            if (i.callBack == callback && i.caller == caller) {
                if (del) map.splice(idx, 1)[0].release();
                return true;
            }
            idx++;
        }
        return false;
    }

    clear(): void {
        this.map.forEach(v => {
            v.forEach(v => {
                v.release();
            })
        })
        this.map.clear();
    }

    dispatch(type: string | symbol, data?: any): void {
        let map = this.getEvtList(type);
        for (let i of map) {
            if (data) {
                i.runWith(data);
            } else {
                i.run();
            }
        }
    }

    protected getEvtList(type: string | symbol): Handle[] {
        let map = this.map.get(type);
        if (!map) {
            this.map.set(type, map = []);
        }
        return map;
    }
}