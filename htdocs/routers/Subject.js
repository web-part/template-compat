/**
* 
*/
KISP.route('Subject', function (require, module) {

    var AccountPlugin = require('AccountPlugin');

    return {

        /**
        * 点击了产品信息，打开对应的账套。
        *   data = {
        *       tid: '',        //必选，企业 id。
        *       acctid: '',     //必选，账套 id。
        *   };
        */
        'product': function (data) {
            AccountPlugin.open(data);
        },



        /**
        * 打开第三方应用。
        *
        */
        'url': function (url) {
            //location.href = url;
            window.open(url);   //打开新窗口，可能会给浏览器拦截。
        },

       

    };
});
