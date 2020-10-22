/*
* babel time: 2020-10-19 16:42:31
*
* source md5: 39441DD8A914D2EB03A920F1FA931EF2
*
* source file: htdocs/lib/table/Table/Order.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

define('Table/Order', function (require, module, exports) {

    var KISP = require('KISP');
    var $Array = KISP.require('Array');
    var $String = KISP.require('String');
    var $Object = KISP.require('Object');

    var defaults = {
        sample: '{order}',
        add: true,
        index: 0
    };

    return exports = {

        normalize: function normalize(config) {
            var _item;

            var order = config.order;

            if (!order) {
                return config;
            }

            if (order === true) {
                order = {};
            }

            order = Object.assign({}, defaults, order);

            var fields = config.fields.slice(0);
            var item = (_item = {}, _defineProperty(_item, config.columnName, 'order'), _defineProperty(_item, 'caption', '序号'), _item);
            var index = order.index;

            if (order.add) {
                fields.splice(index, 0, item); //在指定位置插入。
            } else {
                fields[index] = item;
            }

            config = Object.assign({}, config, {
                'order': order,
                'fields': fields
            });

            return config;
        }

    };
});