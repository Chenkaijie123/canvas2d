export default class Utils {
    static readonly baseType = ["number", "boolean", "string"]
    static isNumber(v: string): boolean {
        return /^[0-9]+\.?[0-9]*$/.test(v)
    }

    static isBool(v: string): boolean {
        if (v.length != 4 && v.length != 5) return false;
        v = v.trim().toLocaleLowerCase();
        return v == "true" || v == "false";
    }

    /**是否是数字|布尔|字符串 */
    static isBasic(v: any): boolean {
        let type = typeof v;
        return Utils.baseType.indexOf(type) >= 0;
    }
}