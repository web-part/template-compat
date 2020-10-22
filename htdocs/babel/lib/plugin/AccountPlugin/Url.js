/*
* babel time: 2020-10-19 16:42:31
*
* source md5: 61FCB045A781796ABC64297DD453ABC6
*
* source file: htdocs/lib/plugin/AccountPlugin/Url.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

define('AccountPlugin/Url', function (require, module, exports) {
    var $ = require('$');
    var KISP = require('KISP');
    var $String = KISP.require('String');

    function getHost() {
        var apiUrl = KISP.config('API').url;

        var host = apiUrl.startsWith('https') ? //
        apiUrl.slice(0, -1) : //https 的，保留 `https://`。
        apiUrl.slice(7, -1); //http 的， 去掉 `http://`。

        return host;
    }

    return {

        /**
        * 
        *   data = {
        *       url: '',    //必选，
        *       host: '',   //可选，如果不提供，则使用配置文件里的。
        *       
        *   };
        */
        get: function get(data) {
            //生成一个随机 id，代表本次的浏览器。 
            //指定为 16 位随机数不是固定要求的。 
            //后面加个时间为了减少冲突。
            var id = $String.random(16) + Date.now();

            //如果后台没有返回 host，则取配置文件里的。
            var host = data.host || getHost();

            //最终的 url。
            var url = data.url + "&" + id + "&" + host;

            return {
                'id': id,
                'url': url
            };
        }

    };
});