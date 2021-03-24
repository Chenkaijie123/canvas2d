export default class Scaner {
    private str: String;
    private len: number = 0;
    private _curser: number = 0;
    private readonly borderChars = ` /<>="'\n\t`;
    get curser() { return this._curser }
    set curser(v) {
        this._curser = v
    }
    read(v: string): void {
        this.str = v;
        this.curser = 0;
        this.len = v.length;
    }

    next(ignoreEmpty = true): string {
        let start = this.curser;
        let res: string
        if (this.borderChars.indexOf(this.str[start]) >= 0) {
            this.curser++;
            res = this.str.substr(start, 1);
            if (ignoreEmpty && "\n\t ".indexOf(res) >= 0 && !this.isEnd) return this.next();
            return res;
        }
        let end: number = ++this.curser;
        while (this.borderChars.indexOf(this.str[end]) < 0 && end < this.len) {
            end++;
        }
        this.curser = end;
        res = this.str.substring(start, end)
        if (ignoreEmpty && "\n\t ".indexOf(res) >= 0 && !this.isEnd) return this.next();
        return res;
    }

    get isEnd(): boolean {
        return this.len <= this.curser;
    }
}