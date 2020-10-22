/*
* babel time: 2020-10-19 16:41:38
*
* source md5: 3EB056A5A780D8D58856988B03A67243
*
* source file: htdocs/views/master/subject/Subject/Apps.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

/*
* 
*/
KISP.panel('/Subject/Apps', function (require, module, panel) {
    var KISP = require('KISP');
    var API = module.require('API');
    var List = module.require('List');

    panel.on('init', function () {

        //应用列表。
        List.on('use', {
            'product': function product(item) {
                console.log(item);

                //打开账套。
                panel.fire('product', [{
                    'tid': item.origin['tid'],
                    'acctid': item.origin['acctid']
                }]);
            },

            'app': function app(item) {
                console.log(item);

                API.getUrl(item);
            }
        });

        API.on('get', {
            //获取应用列表和账套信息成功。
            'list': function list(account, _list) {
                List.render(_list);
                panel.fire('render', [account]);
            },

            //获取应用的跳转地址成功。
            'url': function url(_url) {
                panel.fire('url', [_url]);
            }
        });

        panel.$on('click', '[data-cmd="{value}"]', {
            //关闭按钮。
            'close': function close(event) {
                panel.$.removeClass('on');
            }
        });
    });

    /**
    * 渲染。
    */
    panel.on('render', function (account) {

        API.get(account);
    });
});