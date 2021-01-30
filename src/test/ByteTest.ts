import Byte from "../system/display/math/Byte";
import TestBase from "./TestBase";

export default class ByteTest extends TestBase{
    test(){
        console.log("byte test")
        let byte = new Byte(10)
        byte.writeInt8(125)
        byte.writeInt8(10);
        byte.writeInt8(11);
        byte.writeInt8(12);
        byte.writeInt32(1024)
        console.log(byte.readInt8())
        console.log(byte.readInt8())
        console.log(byte.readInt8())
        console.log(byte.readInt8())
        console.log(byte.readInt32())
        console.log(byte)
    }
}