import Dispatcher from "../event/Dispatcher";
import { LOAD_COMPLETE, LOAD_ERROR } from "../event/EventConst";

let pool:Loader[] = [];
export default class Loader extends Dispatcher {
    loadType: load_type;
    loadProxy:any;
    loadImage(url: string) {
        let img = document.createElement("img");
        this.loadProxy = img;
        img.onload = (e) => {
            this.dispatch(LOAD_COMPLETE,img);
            this.clear();
        }
        img.onerror = (e) => {
            this.dispatch(LOAD_ERROR);
            this.clear();
        }
        img.src = url;
    }

    clear(){
        if(this.loadProxy){
            this.loadProxy.onload = null;
            this.loadProxy.onerror = null;
            this.loadProxy = null;
        }
        super.clear();
        pool.push(this);
    }

    static create():Loader{
        return pool.pop() || new Loader;
    }

}

export enum load_type {
    image, json, txt
}