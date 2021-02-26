import ByteTest from "./ByteTest";
import GraphicalTest from "./GraphicalTest";
import GraphicisTest from "./GraphicisTest";
import LayoutTest from "./LayoutTest";
import MouseEvtTest from "./MouseEvtTest";
import ScrollerTest from "./ScrollerTest";
import TextInputTest from "./TextInputTest";
import TreeTest from "./TreeTest";

export default class Test {
    constructor() {
        new MouseEvtTest()
        new ByteTest()
        new GraphicalTest()
        new GraphicisTest()
        new LayoutTest()
        new TreeTest()
        new TextInputTest()
        new ScrollerTest(true)
    }
}