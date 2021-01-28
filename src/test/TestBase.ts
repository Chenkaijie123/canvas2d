
export default class TestBase{
    protected test():void{}
    constructor(public enable:boolean = true){
        this.enable && this.test()
    }
}