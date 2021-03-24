import { SCROLLER_CHANGE } from "../../../event/EventConst";
import DisPlayNode from "../../DisPlayNode";
import DisplayUtil from "../../math/DisplayUtil";
import Box from "./Box";
import Scroller from "./Scroller";

/**
 * 列表组件
 *       let list = new List;
 * 设置渲染列表项
 *       list.itemRender = ScItem
 * 设置列表大小
 *       list.width = 100
 *       list.height = 100
 *       list.x = 200
 *       list.y = 300
 * 设置滚动方向 1垂直2水平，默认垂直
 *       list.dirction = 2
 * 设置列表项渲染函数，列表项被渲染都会调用一次
 *       list.renderHandle = (item:ScItem,data:string) => {
 *           item.lab.text = data;
 *       }
 * 设置数据源
 *       list.data = datas
 * 添加到舞台
 *       GlobalMgr.stage.addChild(list)
 * 
 */
export default class List<T> extends Scroller {
    /**垂直间隙 */
    paddingTop: number = 0;
    /**水平间隙 */
    paddingLeft: number = 0;
    /**1垂直滚动 2水平滚动 */
    dirction: 1 | 2 = 1;
    private _itemRender: new () => Box;
    private _data: T[];
    private listItems: Box[] = [];
    private listItemsPool: Box[] = [];
    private _itemHeight: number = 0;
    private _itemWidth: number = 0;
    /**列表开始显示的数据下标 */
    private startIndex: number = 0;
    private container: Box = new Box;
    constructor() {
        super();
        this.addChild(this.container);
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
        let showLen = this.itemNum + 1;
        if (v.length < showLen) showLen = v.length;
        let d: T;
        for (let idx = 0; idx < showLen; idx++) {
            d = v[idx];
            item = this.addItem();
            this.renderHandle && this.renderHandle(item, d,idx);
            if (this.dirction == 1) {
                item.x = 0;
                item.y = temp;
                temp += this.itemHeight + this.paddingTop;
            } else {
                item.x = temp;
                item.y = 0;
                temp += this.itemWidth + this.paddingLeft;
            }
        }
        this.startIndex = 0;
        this.container.width = this.dirction == 1 ? this.width : this.itemWidth * v.length;
        this.container.height = this.dirction == 1 ? this.itemHeight * v.length : this.height;
    }

    get data() {
        return this._data;
    }

    private get itemHeight(): number {
        if (this._itemHeight) return this._itemHeight;
        let temp = new this.itemRender;
        temp.calcSizeNow();
        return this._itemHeight = temp.height;
    }

    private get itemWidth(): number {
        if (this._itemWidth) return this._itemWidth;
        let temp = new this.itemRender;
        temp.calcSizeNow();
        return this._itemWidth = temp.width;
    }

    get itemNum(): number {
        return this.dirction == 1 ? Math.ceil(this.height / this.itemHeight) : Math.ceil(this.width / this.itemWidth);
    }

    renderHandle: (v: DisplayUtil, data: T, index: number) => void;

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
        this.container.addChild(item);
        return item;
    }

    /**列表项复用 */
    private onScrollerChange(): void {
        if (this.dirction == 1) {
            if (this.listItems[0].y < -this.itemHeight - this.scrollY && this.data.length > this.startIndex + this.itemNum) {
                this.listItems[0].y = this.listItems[this.listItems.length - 1].y + this.itemHeight + this.paddingTop;
                this.listItems.push(this.listItems[0]);
                this.renderHandle && this.renderHandle(this.listItems[0], this.data[this.startIndex + this.itemNum + 1], this.startIndex + this.itemNum + 1)
                this.listItems.shift();
                this.startIndex++;
            } else if (this.listItems[0].y > -this.scrollY && this.startIndex > 0) {
                this.listItems[this.listItems.length - 1].y = this.listItems[0].y - this.itemHeight - this.paddingTop;
                this.listItems.unshift(this.listItems.pop());
                this.renderHandle && this.renderHandle(this.listItems[0], this.data[--this.startIndex], this.startIndex);
            }
        } else {
            if (this.listItems[0].x < -this.itemWidth - this.scrollX && this.data.length > this.startIndex + this.itemNum) {
                this.listItems[0].x = this.listItems[this.listItems.length - 1].x + this.itemWidth + this.paddingLeft;
                this.listItems.push(this.listItems[0]);
                this.renderHandle && this.renderHandle(this.listItems[0], this.data[this.startIndex + this.itemNum + 1], this.startIndex + this.itemNum + 1)
                this.listItems.shift();
                this.startIndex++;
            } else if (this.listItems[0].x > -this.scrollX && this.startIndex > 0) {
                this.listItems[this.listItems.length - 1].x = this.listItems[0].x - this.itemWidth - this.paddingLeft;
                this.listItems.unshift(this.listItems.pop());
                this.renderHandle && this.renderHandle(this.listItems[0], this.data[--this.startIndex], this.startIndex);
            }
        }
    }
}