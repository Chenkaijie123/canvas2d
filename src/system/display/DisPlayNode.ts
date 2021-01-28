import { TOUCH_BEGIN, TOUCH_CANCEL, TOUCH_END, TOUCH_MOVE, TOUCH_TAP } from "../event/EventConst";
import Display from "./Display";
export default class DisPlayNode extends Display {
    private static readonly TOUCHEVT: symbol[] = [TOUCH_BEGIN, TOUCH_MOVE, TOUCH_TAP, TOUCH_CANCEL, TOUCH_END];
    parent: DisPlayNode
    children: DisPlayNode[] = []

    addChild(node: DisPlayNode) {
        node.removeSelf();
        this.children.push(node);
        node.parent = this;
        if (this.hasMouseEvt()) {
            this.setFocusMouseEvt();
        }
    }

    addChildAt(node: DisPlayNode, index: number) {
        node.removeSelf();
        if (index > this.children.length) {
            this.children.push(node)
        } else {
            this.children.splice(index, 0, node);
        }
        node.parent = this;
    }

    removeChild(node: DisPlayNode) {
        let idx = this.children.indexOf(node);
        if (idx >= 0) {
            this.children.splice(idx, 1);
            node.parent = null;
        } else {
            console.error(`节点没有附加在${this}上`)
        }
    }

    removeSelf(): void {
        if (this.parent) {
            this.parent.removeChild(this);
        }
    }

    on(type: string | symbol, callback: Function, caller: any, args?: any[]): boolean {
        let state = super.on(type, callback, caller, args);
        if (typeof type == "symbol" && DisPlayNode.TOUCHEVT.indexOf(type) >= 0 && state) {
            this.setFocusMouseEvt();
        }
        return state;
    }

    private setFocusMouseEvt(): void {
        this.ignoreMouseEnvent = false;
        let dispaly: DisPlayNode = this;
        while (dispaly.parent) {
            if (!dispaly.parent.ignoreMouseEnvent) return;
            dispaly.parent.ignoreMouseEnvent = false;
            dispaly = dispaly.parent;
        }
    }

    private hasMouseEvt(): boolean {
        for (let i of DisPlayNode.TOUCHEVT) {
            this.getEvtList(i).length;
            return true;
        }
        return false;
    }

}