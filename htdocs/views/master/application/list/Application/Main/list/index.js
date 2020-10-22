// data = {
//     productType: 2,
//     itemlist: {}//关于应用数据
// }
define('list.Index', function (require, module, panel) {
    var AppData = require('AppData');
    var FxxkData = require('FxxkData');
    var Qanalyse = require('Qanalyse');
    var WxlData = require('WxlData');

    var type$data = {
        'kisfxiaoke': FxxkData,
        'kismobapp': AppData,
        'kisqing': Qanalyse,
        'kiswei': WxlData,
    }
    function getIconList(data) {
        var tag = data.itemlist.tag;
        var tagData = type$data[tag] || {};
        if (JSON.stringify(tagData) === '{}') {
            KISP.alert(tag + '无法识别的应用类型');
            return;
        }
        var productType = data.productType;
        var status = data.itemlist.status;
        var bind = data.itemlist.bind;
        var result = [];
        if (tagData[productType][status].length !== undefined) {  //此时当前状态不存在是否绑定的对象
            result = tagData[productType][status];
        } else {
            result = tag == 'kisfxiaoke' ? tagData[productType][status][bind] : tagData[productType][status];
        }

        return result;
    }
    return getIconList;
});
