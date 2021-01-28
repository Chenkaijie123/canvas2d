const littleEndian = (function () {
    var buffer = new ArrayBuffer(2);
    new DataView(buffer).setInt16(0, 256, true);
    return new Int16Array(buffer)[0] === 256;
})();
export default class Byte {
    private buffer: Uint8Array;
    private view: DataView;
    private position: number = 0;
    private wirtePosition: number = 0;
    constructor(public len: number = 1) {
        this.buffer = new Uint8Array(this.len);
        this.view = new DataView(this.buffer.buffer);
    }

    clear(): void {
        this.position = 0;
        this.wirtePosition = 0;
    }

    private ensure(size: number): void {
        if (size <= this.len) return;
        let newBuffer = new Uint8Array(size);
        newBuffer.set(this.buffer);
        this.len = size;
        this.buffer = newBuffer;
        this.view = new DataView(this.buffer.buffer);
    }



    readBigInt64(): bigint {
        let pos = this.position;
        this.position += 8;
        return this.view.getBigInt64(pos, littleEndian);
    }

    readBigUint64(): bigint {
        let pos = this.position;
        this.position += 8;
        return this.view.getBigUint64(pos, littleEndian);
    }

    readFloat32(): number {
        let pos = this.position;
        this.position += 4;
        return this.view.getFloat32(pos, littleEndian);
    }

    readFloat64(): number {
        let pos = this.position;
        this.position += 8;
        return this.view.getFloat64(pos, littleEndian);
    }

    readInt16(): number {
        let pos = this.position;
        this.position += 2;
        return this.view.getInt16(pos, littleEndian);
    }

    readInt32(): number {
        let pos = this.position;
        this.position += 4;
        return this.view.getInt32(pos, littleEndian);
    }

    readUint8(): number {
        let pos = this.position;
        this.position++;
        return this.view.getUint8(pos);
    }

    readUint16(): number {
        let pos = this.position;
        this.position += 2;
        return this.view.getUint16(pos, littleEndian);
    }

    readUint32(): number {
        let pos = this.position;
        this.position += 4;
        return this.view.getUint32(pos, littleEndian);
    }

    readInt8(): number {
        let pos = this.position;
        this.position++;
        return this.view.getInt8(pos);
    }

    writeBigInt64(value: bigint) {
        this.ensure(this.wirtePosition + 8);
        this.view.setBigInt64(this.wirtePosition, value, littleEndian);
        this.wirtePosition += 8;
    }

    writeBigUint64(value: bigint) {
        this.ensure(this.wirtePosition + 8);
        this.view.setBigUint64(this.wirtePosition, value, littleEndian);
        this.wirtePosition += 8;
    }

    writeFloat32(value: number) {
        this.ensure(this.wirtePosition + 4);
        this.view.setFloat32(this.wirtePosition, value, littleEndian);
        this.wirtePosition += 4;
    }

    writeFloat64(value: number) {
        this.ensure(this.wirtePosition + 8);
        this.view.setFloat64(this.wirtePosition, value, littleEndian);
        this.wirtePosition += 8;
    }

    writeInt16(value: number) {
        this.ensure(this.wirtePosition + 2);
        this.view.setInt16(this.wirtePosition, value, littleEndian);
        this.wirtePosition += 2;
    }

    writeInt32(value: number) {
        this.ensure(this.wirtePosition + 4);
        this.view.setInt32(this.wirtePosition, value, littleEndian);
        this.wirtePosition += 4;
    }

    writeInt8(value: number) {
        this.ensure(this.wirtePosition + 1);
        this.view.setInt8(this.wirtePosition, value);
        this.wirtePosition += 1;
    }

    writeUint16(value: number) {
        this.ensure(this.wirtePosition + 2);
        this.view.setUint16(this.wirtePosition, value, littleEndian);
        this.wirtePosition += 2;
    }
    writeUint32(value: number) {
        this.ensure(this.wirtePosition + 4);
        this.view.setUint32(this.wirtePosition, value, littleEndian);
        this.wirtePosition += 4;
    }

    writeUint8(value: number) {
        this.ensure(this.wirtePosition + 1);
        this.view.setUint8(this.wirtePosition, value);
        this.wirtePosition += 1;
    }

}