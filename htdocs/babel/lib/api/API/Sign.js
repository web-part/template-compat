/*
* babel time: 2020-10-19 16:42:31
*
* source md5: 81ED70FAC8F805C9460E3C71F9B16F1D
*
* source file: htdocs/lib/api/API/Sign.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/**
* 签名。
*/
define('API/Sign', function (require, module, exports) {
    var $ = require('$');
    var KISP = require('KISP');
    var $Date = KISP.require('Date');
    var $String = KISP.require('String');
    var MD5 = module.require('MD5');

    /**
    * 获取当地时间转换成北京时间后的日期实例。
    */
    function getDate() {
        var zone = 8; //北京时间所在的时区，为东 8 区。 每个时区相差一个小时。
        var now = new Date(); //当地的现在时间。
        var offset = now.getTimezoneOffset(); //当地的现在时间和格林威治的时间差，单位为分钟。
        var target = now.getTime(); //本地时间距 1970 年 1 月 1 日午夜（GMT 时间）之间的毫秒数。

        zone = zone * 60 * 60 * 1000; //时区转成毫秒。
        offset = offset * 60 * 1000; //时间差转成毫秒。
        target = target + offset + zone; //当地时间对应到北京时间的毫秒。
        target = new Date(target); //当时时间对应到北京时间的日期实例。

        //console.log('当地时间：', $Date.format(now, 'yyyy-MM-dd HH:mm:ss'));
        //console.log('北京时间：', $Date.format(target, 'yyyy-MM-dd HH:mm:ss'));

        return target;
    }

    return {
        /**
        * 生成签名。
        *   disabled: false,    //是否禁止生成 `sign` 字段。
        *   time: Date,         //日期实例。
        *   args: [],           //要签名的参数列表。
        */
        get: function get(disabled, args) {
            var date = getDate();
            var time = $Date.format(date, 'yyyy-MM-dd HH:mm:ss');
            var state = $String.random(16);

            //把多个对象合并到一个新的对象中。
            var info = Object.assign.apply(Object, [{}].concat(_toConsumableArray(args), [{
                'timestamp': time, //时间戳。
                'state': state //随机串。
            }]));

            var keys = Object.keys(info).sort(); //按字典排序。

            var values = keys.map(function (key) {
                return info[key];
            });

            //没有禁用 sign 字段，则生成它。
            if (!disabled) {
                info['sign'] = MD5.encrypt.apply(MD5, _toConsumableArray(values));
            }

            return info;
        }

    };
});