export default class StringUtils {
    /**16进制字符串转换成10进制 */
    static radix16To10(v: string): number {
        if (v[0] == "#") {
            return parseInt(v.substr(1), 16);
        } else if (v[0] == "0" && v[1] == "x") {
            return parseInt(v.substr(2), 16);
        } else {
            return parseInt(v, 16);
        }
    }
}