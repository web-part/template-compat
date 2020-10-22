/*
* babel time: 2020-10-19 16:41:37
*
* source md5: 6584F82658B0C11DCE50CD9A09D12EF5
*
* source file: htdocs/views/master/account/list/Accounts/dialog/apps/Apps.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

/*
* 
*/
KISP.panel('/Accounts/Apps', function (require, module, panel) {
    var Content = module.require('Content');
    var API = module.require('API');

    var Dialog = require('Dialog');
    var dialog = null;

    var meta = {
        account: null
    };

    panel.on('init', function () {
        panel.set('show', false);

        dialog = Dialog.panel({
            'title': '应用列表',
            'width': 1098,
            'height': 660,
            'resizable': true,
            'z-index': 1023,

            'container': panel,
            'content': Content
        });

        dialog.on({
            'render': function render(data) {
                Content.render(data);
            }
        });

        Content.on({
            //点击了产品信息，打开对应的账套。
            'product': function product() {
                panel.fire('account', [meta.account]);
            },

            //点击了某个应用，获取链接。
            'app': function app(item) {
                API.getUrl(item);
            }

        });

        API.on('get', {
            //获取应用列表和账套信息成功。
            'list': function list(product, apps) {
                //列表为空。
                if (apps.length == 0) {
                    panel.hide();
                    panel.fire('account', [meta.account]);
                    return;
                }

                panel.show();
                dialog.render({
                    'product': product,
                    'apps': apps
                });
            },

            //获取应用的跳转地址成功。
            'url': function url(_url) {
                panel.fire('url', [_url]);
            }
        });
    });

    /**
    * 渲染。
    *   account: {},    //必选，账套信息。
    */
    panel.on('render', function (account) {
        meta.account = account;

        API.get(account);
    });

    return {};
});