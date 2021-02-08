import ByteTest from "./ByteTest";
import GraphicalTest from "./GraphicalTest";
import GraphicisTest from "./GraphicisTest";
import LayoutTest from "./LayoutTest";
import MouseEvtTest from "./MouseEvtTest";

export default class Test{
    constructor(){
        new MouseEvtTest()
        new ByteTest()
        new GraphicalTest()
        new GraphicisTest()
        new LayoutTest(true)
    }
}