import Dispatcher from "../system/event/Dispatcher";

export default class EditorMdl extends Dispatcher{
    static ATTRCHANGE:string = "ATTRCHANGE";
    static get ins():EditorMdl{
        return EditorMdl["_ins"] || (EditorMdl["_ins"] = new EditorMdl)
    }
}