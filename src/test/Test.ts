import ByteTest from "./ByteTest";
import MouseEvtTest from "./MouseEvtTest";

export default class Test{
    constructor(){
        new MouseEvtTest()
        new ByteTest(true)
    }
}