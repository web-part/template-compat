
/*
* 
*/
KISP.panel('/ProductUsers/Main', function (require, module, panel) {
    var KISP = require('KISP');
    var API = module.require('API');
    var List = module.require('List');
    var Search = module.require('Search');


    var meta = {
        company: null,
        product: null,
    };


    panel.on('init', function () {

        Search.on({
            'submit': function (list, keyword) {
                List.render(list, keyword);
            },
        });



        List.on('cmd', {
            //踢除用户。
            'delete': function (item) {
                KISP.confirm(`确认注销在线用户：${item.name}`, function () {
                    API.delete(item);
                });
            },

        });
    


        API.on('success', {
            //获取用户列表成功。
            'get': function (list) {
                Search.render(list);
                List.render(list);
            },

            //踢除用户成功。
            'delete': function () {
                panel.refresh();
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
        meta = data;

        API.get(data);

    });



});





