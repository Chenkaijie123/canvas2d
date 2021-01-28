
export default class TestBase{
    protected test():void{}
    constructor(public enable:boolean = false){
        this.enable && this.test()
    }
}