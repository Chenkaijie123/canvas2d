import Graphical from "./Graphical";

export default class Line extends Graphical{
    _color:number = 12957078;
    get color(){return this._color}
    set color(v:number){
        this._color = v;
    }
    setColorByStr(v:string){
        if(v[0] == "#"){
            this._color = parseInt(v.substr(1),16);
        }else{
            this._color = parseInt(v,16);
        }
    }
    
}