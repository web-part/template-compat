/*
* babel time: 2020-10-19 16:41:37
*
* source md5: 27AC3C58B5F39DF529AFD56C09455FCA
*
* source file: htdocs/views/master/account/baks/AccountBaks/auto/Auto.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

/*
* 
*/
KISP.panel('/AccountBaks/Auto', function (require, module, panel) {
    var KISP = require('KISP');
    var API = module.require('API');
    var List = module.require('List');
    var Header = module.require('Header');
    var meta = {
        company: null,
        product: null,
        cache: false //指示是否为缓存数据。 如果是，则不请求后台。
    };

    panel.on('init', function () {

        Header.on({});

        List.on({

            'download': function download(item) {
                panel.fire('download', [item]);
            },

            'delete': function _delete(item) {
                panel.fire('delete', 'item', [item]);
            },

            'refresh': function refresh(item, index) {
                API.get(meta);
            }
        });

        API.on('success', {
            'get': function get(list) {
                meta.cache = true; //指示拿到了数据，下次直接使用缓存。
                Header.render();
                List.render(list);
            }

        });
    });

    /**
    * 渲染。
    *   data = {
    *       company: {},    //企业信息。
    *       product: {},    //产品信息。
    *   };
    */
    panel.on('render', function (data) {
        //已经缓存过了。
        if (meta.cache) {
            return;
        }

        //否则，需要发起请求。
        meta.company = data.company;
        meta.product = data.product;

        API.get(meta);
    });

    return {
        reset: function reset() {
            meta.cache = false;
        }
    };
});