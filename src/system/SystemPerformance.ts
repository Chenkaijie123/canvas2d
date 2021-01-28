export default class SystemPerformance{
    /***打印消耗 */
    static logCostTime(lab:string,limited:number = 0){
        return function(target,key:string,attr:any){
            const old = attr.value;
            attr.value = function(...args){
                let t = Date.now();
                old.call(this,...args);
                let cost = Date.now() - t;
                if(limited <= cost){
                    console.log(`${lab} 耗时 :${cost}`)
                }
            }
        }
    }
}