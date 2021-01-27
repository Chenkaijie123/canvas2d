import { LOAD_COMPLETE } from "../event/EventConst";
import Handle from "../event/Handle";
import Loader from "./Loader";

export default class Resource {
    private loadingMap: Map<string, Handle[]> = new Map;
    private sourceMap: Map<string, any> = new Map;

    private static _ins:Resource;
    static get ins():Resource{
        return Resource._ins || (Resource._ins = new Resource);
    }

    getRES(src: string) {
        return this.sourceMap.get(src);
    }

    loadImage(src: string, callBack: (data: HTMLImageElement) => any, caller: any): void {
        let complete: Handle = Handle.create(callBack, caller);
        let res = this.getRES(src);
        if (res) {
            complete.runWith(res);
            complete.release();
        } else {
            let arr = this.loadingMap.get(src);
            if (arr) {
                for (let h of arr) {
                    if (h.callBack == callBack && h.caller == caller) {
                        return;
                    }
                }
                arr.push(complete);
            } else {
                this.loadingMap.set(src, arr = [complete]);
                let loader = Loader.create();
                loader.on(LOAD_COMPLETE, (data) => {
                    this.sourceMap.set(src,data);
                    arr.forEach(v => {
                        v.runWith(data);
                        v.release();
                    })
                    this.loadingMap.delete(src);
                }, this);
                loader.loadImage(src);
            }
        }
    }
}