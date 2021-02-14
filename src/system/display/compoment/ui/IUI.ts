import DisPlayNode from "../../DisPlayNode";

export interface IUI{
    release():void;
}

export interface ITreeNode extends DisPlayNode{
    selectHandle:(open: boolean,  data: any) => any;
}