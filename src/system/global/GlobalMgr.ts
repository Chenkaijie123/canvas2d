import Stage from "../display/Stage";
import Dispatcher from "../event/Dispatcher";
import Ticker from "../ticker/Ticker";
import Canvas from "./Canvas";

export default class GlobalMgr{
    static stage:Stage;
    static ticker:Ticker;
    static canvas:Canvas;
    static dispatcher:Dispatcher
}