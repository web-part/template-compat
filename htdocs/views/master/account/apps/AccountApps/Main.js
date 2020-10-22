
/*
* 
*/
KISP.panel('/AccountApps/Main', function (require, module, panel) {
    var KISP = require('KISP');
    var API = module.require('API');
    var List = module.require('List');



    panel.on('init', function () {



        //应用列表。
        List.on('use', {
            'product': function (item) {
                console.log(item);

                //打开账套。
                panel.fire('product', [{
                    'tid': item.origin['tid'],
                    'acctid': item.origin['acctid'],
                }]);
            },

            'app': function (item) {
                console.log(item);
                API.getUrl(item);
            },
        });


        API.on('get', {
            //获取应用列表和账套信息成功。
            'list': function (account, list) {
                List.render(list);
            },

            //获取应用的跳转地址成功。
            'url': function (url) {
                panel.fire('url', [url]);
            },
        });



        panel.$on('click', '[data-cmd="{value}"]', {
            //关闭按钮。
            'close': function (event) {
                panel.$.removeClass('on');
            },
        });



    });



    /**
    * 渲染。
    */
    panel.on('render', function (account) {

        API.get(account);

    });


});





