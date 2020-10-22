
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
        cache: false,       //指示是否为缓存数据。 如果是，则不请求后台。
    };


    panel.on('init', function () {

        Header.on({
            
        });





        List.on({

            'download': function (item) {
                panel.fire('download', [item]);
            },

            'delete': function (item) {
                panel.fire('delete', 'item', [item]);

            },

            'refresh': function (item, index) {
                API.get(meta);

            },
        });



        API.on('success', {
            'get': function (list) {
                meta.cache = true; //指示拿到了数据，下次直接使用缓存。
                Header.render();
                List.render(list);
            },

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
        reset: function () {
            meta.cache = false;
        },
    };


});





