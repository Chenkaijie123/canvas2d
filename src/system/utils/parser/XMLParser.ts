
import { multiData } from "../../display/compoment/ui/HtmlLabel";
import Utils from "../Utils";
import Scaner from "./Scaner";

export default class XMLParser {
    private scaner: Scaner = new Scaner;
    private queue: token[] = [];
    private res: token;
    parse(v: string) {
        this.scaner.read(v);
        this.queue.length = 0;
        let root = Object.create(null);
        root.tag = "root";
        root.children = [];
        this.res = root;
        this.parseToken(this.scaner.next(), false, false, true);
        return this.parseIntoHtmlData(this.res as any);//this.res;
    }

    parseToken(words: string, nextIsTag: boolean = false, isCloseTag: boolean = false, nextIsContent: boolean = false) {
        let nextIsValue: boolean = false;
        let content: string = "";
        let key: string;
        while (!this.scaner.isEnd) {
            switch (words) {
                case "/":
                    while (words = this.scaner.next()) {
                        if (words != " ") {
                            if (words == ">") {
                                this.queue.pop();
                                break;
                            }
                        }
                    }
                    break;
                case "=":
                    nextIsValue = true;
                    break;
                case ">":
                    nextIsContent = true;
                    break;
                case "<":
                    nextIsContent = false;
                    if (content) {
                        if (this.queue.length) {
                            this.queue[this.queue.length - 1].children.push({ content: content });
                        } else {
                            this.res.children.push({ "content": content });
                        }
                        content = "";
                    }
                    while (words = this.scaner.next()) {
                        if (words != " ") {
                            if (words == "/") {//闭合标签
                                let temp: string
                                while (words = this.scaner.next()) {
                                    if (words == ">") break;
                                    //默认闭合标签斜杆后面就只有标签名,没有其他内容 eg:</font>
                                    else temp = words;
                                }
                                this.parseToken(temp, false, true, true);
                            } else {//开始标签
                                this.parseToken(words, true);
                                break;
                            }
                        }
                    }
                    break
                default:
                    if ("\n\t ".indexOf(words) >= 0 && !nextIsContent) { }
                    else if (nextIsTag) {
                        let obj: token = Object.create(null);
                        obj.tag = words;
                        obj.children = [];
                        this.queue.push(obj);
                        if (this.queue.length == 1) {
                            this.res.children.push(this.queue[0]);
                        } else {
                            this.queue[this.queue.length - 2].children.push(this.queue[this.queue.length - 1]);
                        }
                    } else if (isCloseTag) {
                        for (let i = this.queue.length - 1; i >= 0; i--) {
                            if (this.queue[i].tag == words) {
                                this.queue.splice(i);
                                break;
                            }
                        }
                        isCloseTag = false;
                    } else if (nextIsContent) {
                        content += words;
                    } else {
                        if (nextIsValue) {
                            if (words == "'" || words == '"') {
                                let close = words;
                                let str = [];
                                while (words = this.scaner.next(false)) {
                                    if (words != close) {
                                        str.push(words);
                                    } else break;
                                }
                                words = str.join("");
                            } else {
                                if (Utils.isNumber(words)) {
                                    words = parseInt(words) as any;
                                } else if (Utils.isBool(words)) {
                                    words = (words.length == 4) as any;
                                }
                            }
                            this.queue[this.queue.length - 1][key] = words;
                            nextIsValue = false;
                            key = null;
                        } else if (key == void 0) {
                            key = words
                        }
                    }
                    break;
            }
            words = this.scaner.next(false);
            nextIsTag = false;
        }
    }

    private parseIntoHtmlData(v: token & multiData, fontSize: number = 18, fontFamily: string = null, fontColor: string = null, border: boolean = false): multiData[] {
        let res: multiData[] = [];
        let _fontSzie: number = v.fontSize || fontSize;
        let _fontFamily: string = v.fontFamily || fontFamily;
        let _fontColor: string = v.color || fontColor;
        let _border: boolean = v.border || border;
        let _text: string = v.content;
        if (_text) res.push({ fontSize: _fontSzie, color: _fontColor, fontFamily: _fontFamily, text: _text, border: _border });
        else if (v.children.length) {
            for (let i of v.children) {
                res.push(...this.parseIntoHtmlData(i as any, _fontSzie, _fontFamily, _fontColor, _border))
            }
        }
        return res;
    }

}

type token = {
    tag?: string
    children?: token[]
    content?: any
}