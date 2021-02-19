export default class Point {
    private _buffer: [number, number];
    constructor(x: number = 0, y: number = 0) {
        this._buffer = [x, y];
    }
    get x() {
        return this._buffer[0];
    }
    set x(v: number) {
        this._buffer[0] = v;
    }

    get y() {
        return this._buffer[1];
    }
    set y(v: number) {
        this._buffer[1] = v;
    }

    setTo(x: number, y: number) {
        this._buffer[0] = x;
        this._buffer[1] = y;
    }
}