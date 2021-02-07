import DisPlayNode from "../DisPlayNode";

export default class DisplayUtil {
    static getSize(...children: DisPlayNode[]) {
        let width = Math.max(...children.map(v => v.x + v.width));
        let height = Math.max(...children.map(v => v.y + v.height));
        width < 0 && (width = 0);
        height < 0 && (height = 0);
        return { width, height };
    }
}