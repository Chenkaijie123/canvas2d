import Display from "../Display"

const anglePI = Math.PI / 180;
const sinMap: { [rotate: number]: number } = {};
const cosMap: { [rotate: number]: number } = {};
for (let i = 0; i < 360; i++) {
    sinMap[i] = Math.sin(i * anglePI)
}

for (let i = 0; i < 360; i++) {
    cosMap[i] = Math.cos(i * anglePI)
}



function sin(r: number) {
    let index: number = r < 0 ? -r : r;
    if (index >= 360) index %= 360;
    return r > 0 ? sinMap[index >> 0] : -sinMap[index >> 0]
}

function cos(r: number) {
    if (r < 0) r *= -1;
    if (r >= 360) r %= 360;
    return cosMap[r >> 0];
}


export default class Matrix {
    private _buffer: [number, number, number, number, number, number] = [1, 0, 0, 1, 0, 0]
    get a() { return this._buffer[0] }
    set a(v: number) { this._buffer[0] = v }
    get b() { return this._buffer[1] }
    set b(v: number) { this._buffer[1] = v }
    get c() { return this._buffer[2] }
    set c(v: number) { this._buffer[2] = v }
    get d() { return this._buffer[3] }
    set d(v: number) { this._buffer[3] = v }
    get e() { return this._buffer[4] }
    set e(v: number) { this._buffer[4] = v }
    get f() { return this._buffer[5] }
    set f(v: number) { this._buffer[5] = v }
    get buffer() { return this._buffer }
    setMatrix(a: number, b: number, c: number, d: number, e: number, f: number): void {
        this._buffer[0] = a;
        this._buffer[1] = b;
        this._buffer[2] = c;
        this._buffer[3] = d;
        this._buffer[4] = e;
        this._buffer[5] = f;
    }

    /**
 * 矩阵乘法，物理意义，实现物体的矩阵的叠加变换
 * 直接改变当前矩阵
 * @param target 叠加的矩阵
 */
    MatrixMulti(target: Matrix): this {
        let [a2, b2, c2, d2, e2, f2] = [
            this.a * target.a + this.c * target.b,
            this.b * target.a + this.d * target.b,
            this.a * target.c + this.c * target.d,
            this.b * target.c + this.d * target.d,
            this.a * target.e + this.c * target.f + this.e,
            this.b * target.e + this.d * target.f + this.f
        ]
        this.setMatrix(a2, b2, c2, d2, e2, f2)
        return this;
    }

    /**矩阵求逆 */
    invertMartix(): void {
        let a = this.a;
        let b = this.b;
        let c = this.c;
        let d = this.d;
        let tx = this.e;
        let ty = this.f;
        if (b == 0 && c == 0) {
            this.b = this.c = 0;
            if (a == 0 || d == 0) {
                this.a = this.d = this.e = this.f = 0;
            }
            else {
                a = this.a = 1 / a;
                d = this.d = 1 / d;
                this.e = -a * tx;
                this.f = -d * ty;
            }
            return;
        }
        let determinant = a * d - b * c;
        if (determinant == 0) {
            this.setMatrix(1, 0, 0, 1, 0, 0);
            return;
        }
        determinant = 1 / determinant;
        let k = this.a = d * determinant;
        b = this.b = -b * determinant;
        c = this.c = -c * determinant;
        d = this.d = a * determinant;
        this.e = -(k * tx + c * ty);
        this.f = -(b * tx + d * ty);
    }

    public setByStyle(style: Display): void {
        let { rotate, scaleX, scaleY, anchorX, anchorY, x, y, scrollX, scrollY } = style;
        let rotateC = cos(rotate);
        let rotateS = sin(rotate);
        let tx = (x + scrollX) * scaleX;
        let ty = (y + scrollY) * scaleY;
        let a = rotateC * scaleX;
        let b = rotateS * scaleX;
        let c = -rotateS * scaleY;
        let d = rotateC * scaleY;
        //锚点实现，设置锚点不影响x,y位置，只是固定相对于显示对象（0，0）点，用于旋转
        if (anchorX != 0 || anchorY != 0) {
            let sx = anchorX * a + c * anchorY + tx;//不设锚点会移动到的位置
            let sy = anchorX * b + d * anchorY + ty;
            tx = tx + tx - (sx - anchorX * scaleX);
            ty = ty + ty - (sy - anchorY * scaleY);
        }
        this.setMatrix(a, b, c, d, tx, ty);
    }

    setTo(matrix: Matrix): void {
        for (let i = 0; i < 6; i++) {
            this._buffer[i] = matrix._buffer[i];
        }
    }

    /**把传入的点传化成当前矩阵变化后的点，直接改变目标点 */
    transFormPoint(p: { x: number, y: number }): { x: number, y: number } {
        let [a, b, c, d, e, f] = this._buffer;
        let { x, y } = p;
        p.x = a * x + c * y + e;
        p.y = b * x + d * y + f;
        return p;
    }
}