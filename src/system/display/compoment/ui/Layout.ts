
import ILayout from "./ILayout";

export default class Layout {

    static onLayout(...nodes: ILayout[]): void {
        nodes.forEach(node => {
            if (node.parent) {
                let needChangeSizeFlag: boolean = true;
                if (node.left != void 0) {
                    node.x = node.left;
                } else {
                    needChangeSizeFlag = false;
                }
                if (node.right != void 0) {
                    if (needChangeSizeFlag) {
                        node.width = node.parent.width - node.width >> 1;
                    } else {
                        node.x = node.parent.width - node.width - node.right;
                    }
                }
    
                needChangeSizeFlag = true;
                if (node.top != void 0) {
                    node.y = node.top;
                } else {
                    needChangeSizeFlag = false;
                }
                if (node.bottom != void 0) {
                    if (needChangeSizeFlag) {
                        node.height = node.parent.height - node.height >> 1;
                    } else {
                        node.y = node.parent.height - node.height - node.bottom;
                    }
                }

                if(node.centerX != void 0){
                    node.x = (node.parent.width - node.width >> 1) + node.centerX;
                }
                if(node.centerY != void 0){
                    node.y = (node.parent.height - node.height >> 1) + node.centerY;
                }
            }
        })

    }
}