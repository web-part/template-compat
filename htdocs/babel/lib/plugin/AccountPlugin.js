/*
* babel time: 2020-10-19 16:42:31
*
* source md5: BAFAD36F3E40B45DE0B8997F53451DA5
*
* source file: htdocs/lib/plugin/AccountPlugin.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

define('AccountPlugin', function (require, module, exports) {
    var KISP = require('KISP');
    var API = module.require('API');
    var Url = module.require('Url');

    return {

        /**
        * 获取指定的账套连接信息，并打开它。
        * 会检测是否打开成功。
        *   opt = {
        *       tid: '',        //必选，企业 id。
        *       acctid: '',     //必选，账套 id。
        *   };
        */
        open: function open(opt) {

            API.getUrl(opt, function (data) {

                var info = Url.get(data);

                location.href = info.url;

                API.check(info.id); //检测是否打开成功。 不需要回调和事件。

            });
        }

    };
});