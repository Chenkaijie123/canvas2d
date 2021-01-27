import Display from "./Display";

export default class DisPlayNode extends Display{
    parent:DisPlayNode
    children:DisPlayNode[] = []

    addChild(node:DisPlayNode){
        node.removeSelf();
        this.children.push(node);
        node.parent = this;
    }

    addChildAt(node:DisPlayNode,index:number){
        node.removeSelf();
        if(index > this.children.length) {
            this.children.push(node)
        }else{
            this.children.splice(index,0,node);
        }
        node.parent = this;
    }

    removeChild(node:DisPlayNode){
        let idx = this.children.indexOf(node);
        if(idx >= 0) {
            this.children.splice(idx,1);
            node.parent = null;
        }else{
            console.error(`节点没有附加在${this}上`)
        }
    }

    removeSelf():void{
        if(this.parent){
            this.parent.removeChild(this);
        }
    }
}