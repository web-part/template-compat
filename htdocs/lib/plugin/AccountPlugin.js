


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
        open: function (opt) {
           
            API.getUrl(opt, function (data) {

                var info = Url.get(data);

                location.href = info.url;

                API.check(info.id); //检测是否打开成功。 不需要回调和事件。


            });


        },

        
    };


});