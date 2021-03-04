import { SCROLLER_CHANGE } from "../../../event/EventConst";
import DisPlayNode from "../../DisPlayNode";
import DisplayUtil from "../../math/DisplayUtil";
import Box from "./Box";
import Scroller from "./Scroller";

export default class List<T> extends Scroller {
    paddingTop: number = 0;
    paddingLeft:number = 0;
    itemNum:number = 5;
    /**1垂直滚动 2水平滚动 */
    dirction: 1 | 2 = 1;
    private _itemRender: new () => Box;
    private _data: T[];
    private listItems: Box[] = [];
    private listItemsPool: Box[] = [];
    private _itemHeight: number = 0;
    private _itemWidth:number = 0;
    constructor() {
        super();
        this.on(SCROLLER_CHANGE, this.onScrollerChange, this);
    }

    set itemRender(v: new () => Box) {
        if (this._itemRender && this._itemRender != v) {
            this.releaseAllItem();
            this.listItemsPool.length = 0;
        }
        this._itemRender = v;

    }

    get itemRender() {
        return this._itemRender;
    }

    set data(v: T[]) {
        if (!this._itemRender) return;
        this._data = v;
        this.releaseAllItem();
        let item: DisPlayNode;
        let temp = 0;
        for (let d of v) {
            item = this.addItem();
            this.renderHandle && this.renderHandle(item, d);
            if(this.dirction == 1){
                item.x = 0;
                item.y = temp;
                temp += this.itemHeight + this.paddingTop;
            }else{
                item.x = temp;
                item.y = 0;
                temp += this.itemWidth + this.paddingLeft
            }
        }
    }

    get data() {
        return this._data;
    }

    private get itemHeight(): number {
        if (this._itemHeight) return this._itemHeight;
        if (!this.listItems[0]) return 0;
        this.listItems[0].calcSizeNow();
        return this._itemHeight = this.listItems[0].height;
    }

    private get itemWidth():number{
        if (this._itemWidth) return this._itemWidth;
        if (!this.listItems[0]) return 0;
        this.listItems[0].calcSizeNow();
        return this._itemWidth = this.listItems[0].width;
    }

    renderHandle: (v: DisplayUtil, data: T) => void;

    //把列表项放入缓存
    private releaseAllItem(): void {
        let item: Box;
        while (item = this.listItems.pop()) {
            item.removeSelf();
            this.listItemsPool.push(item);
        }
    }

    addItem(): DisPlayNode {
        let item = this.listItemsPool.pop() || new this._itemRender();
        this.listItems.push(item);
        this.addChild(item); 
        return item;
    }

    private onScrollerChange(): void {
        /**
         * 1.计算出当前显示的列表项
         * 2.复用列表项并且赋值刷新
         */
        let start :number,end:number;
        if(this.dirction == 1){
            start = Math.ceil(Math.abs(this.scrollX) / this.itemHeight) - 1;
            start < 0 && (start = 0);
            end = start + this.itemNum - 1;
        }

        //TODO
    }
}