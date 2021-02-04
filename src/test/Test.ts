import ByteTest from "./ByteTest";
import GraphicalTest from "./GraphicalTest";
import GraphicisTest from "./GraphicisTest";
import MouseEvtTest from "./MouseEvtTest";

export default class Test{
    constructor(){
        new MouseEvtTest()
        new ByteTest()
        new GraphicalTest()
        new GraphicisTest(true)
    }
}