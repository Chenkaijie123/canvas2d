import Resource from "./Resource";

export default class Texture {
    texture: HTMLImageElement;
    width: number
    height: number
    hasTexture: boolean = false;
    private _rect: Rect;
    init(src: string, x = 0, y = 0, width = 0, height = 0) {
        this.clear();
        if (width && height) {
            this.setSprites(x, y, width, height);
        }
        this.texture = Resource.ins.getRES(src);
        if (!this.texture) {
            throw new Error(`资源${src}未加载!`);
        }
        this.hasTexture = true;
        this.width = this.rect ? this.rect.width : this.texture.width;
        this.height = this.rect ? this.rect.height : this.texture.height;
    }

    clear(): void {
        this.texture = null;
        this.rect && this.rect.release();
        this.rect = null;
        this.hasTexture = false;
    }



    get rect(): Rect {
        return this._rect;
    }

    set rect(v: Rect) {
        if (this._rect) this._rect.release();
        this._rect = v;
        this.width = v ? v.width : 0;
        this.height = v ? v.height : 0;
    }

    setSprites(x: number, y: number, width: number, height: number): void {
        this.rect = Rect.create(x, y, width, height);
    }
}


let pool: Rect[] = [];
class Rect {
    width: number = 0
    height: number = 0
    x: number = 0
    y: number = 0
    release() {
        this.width = this.height = this.x = this.y = 0;
        pool.push(this);
    }

    static create(x = 0, y = 0, width = 0, height = 0): Rect {
        let rect = pool.pop() || new Rect;
        rect.x = x;
        rect.y = y;
        rect.width = width;
        rect.height = height;
        return rect;
    }
}