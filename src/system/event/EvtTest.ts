import Dispatcher from "./Dispatcher";

export default class EvtTest{
    constructor(){
        let evt = new Dispatcher;
        const fn = (e) => {
            console.log(e)
        }
        const fn1 = (e) => {
            console.log("fn1")
            evt.off("haha1",fn1,this)
        }
        evt.on("haha",fn,this);
        evt.on("haha1",fn1,this);
        evt.on("haha1",fn1,this);
        evt.dispatch("haha");
        evt.dispatch("haha1");
        evt.dispatch("haha","11111")
        evt.dispatch("haha1");

    }
}