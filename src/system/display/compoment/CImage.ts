
import GlobalMgr from "../../global/GlobalMgr";
import Render from "../../render/Render";
import Resource from "../../resource/Resource";
import Texture from "../../resource/Texture";
import DisPlayNode from "../DisPlayNode";

export default class CImage extends DisPlayNode {
    texture: Texture = new Texture;
    //精灵图实现
    private sprites = { x: 0, y: 0, width: 0, height: 0 };
    private _src: string
    get src() { return this._src }
    set src(v: string) {
        if (this._src === v) return;
        this.clear();
        if (v) {
            this._src = v;
            // Resource.ins.loadImage(v, this.loadComplete, this);
            this.delayCall();
        }

    }

    clear(): void {
        this.texture.clear();
        this._src = null;
    }

    setSprites(x = 0, y = 0, width = 0, height = 0): void {
        this.sprites.x = x;
        this.sprites.y = y;
        this.sprites.width = width;
        this.sprites.height = height;
        this._src && this.delayCall();
    }

    private loadComplete(): void {
        this.texture.init(this.src, this.sprites.x, this.sprites.y, this.sprites.width, this.sprites.height);
        this._measureAndLayout();
    }

    private delayCall(): void {
        GlobalMgr.ticker.nextTick(Resource.ins.loadImage, Resource.ins, [this._src, this.loadComplete, this])
    }

    protected onMeasure(): void {
        if (!this.texture.hasTexture) return;
        this.contentWidth = this.texture.width;
        this.contentHeight = this.texture.height;
        if (this.autoReSize) {
            this["_width"] = this.contentWidth;
            this["_height"] = this.contentHeight;
        }
    }

    render(render: Render): void {
        if (this.texture.hasTexture) {
            if (this.texture.rect) {
                render.ctx.drawImage(
                    this.texture.texture,
                    this.texture.rect.x,
                    this.texture.rect.y,
                    this.texture.rect.width,
                    this.texture.height,
                    this.scrollX, this.scrollY, this.width, this.height
                );
            } else {
                render.ctx.drawImage(this.texture.texture, this.scrollX, this.scrollY, this.width, this.height);
            }
        }
    }

    distory(): void {
        this.clear();
    }
}