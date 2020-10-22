/*
* babel time: 2020-10-19 16:41:38
*
* source md5: CB9DD7F8693845340262DF87CB010EF5
*
* source file: htdocs/views/master/subject/Subject/Main.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

/*
* 
*/
KISP.panel('/Subject/Main', function (require, module, panel) {
    var KISP = require('KISP');
    var API = module.require('API');
    var Tabs = module.require('Tabs');
    var ByCompanys = module.require('ByCompanys');
    var ByAccounts = module.require('ByAccounts');

    var meta = {
        companys: [],
        accounts: []
    };

    function hide(fn) {
        panel.$.removeClass('on');

        setTimeout(function () {
            panel.hide();
            panel.fire('visible', [false]);
            fn && fn();
        }, 300);
    }

    function show(fn) {
        panel.show();
        panel.$.addClass('on');

        setTimeout(function () {
            panel.fire('visible', [true]);
            fn && fn();
        }, 300);
    }

    panel.on('init', function () {
        panel.set('show', false);

        Tabs.on({
            //按企业。
            'companys': function companys() {
                ByCompanys.render(meta.companys);
                ByAccounts.hide();
            },

            //按账套。
            'accounts': function accounts() {
                ByCompanys.hide();
                ByAccounts.render(meta.accounts);
            }
        });

        //企业列表。
        ByCompanys.on({
            'item': function item(_item) {

                panel.fire('item', [_item]);
            }
        });

        //账套列表。
        ByAccounts.on({
            'item': function item(_item2) {

                panel.fire('item', [_item2]);
            }
        });

        API.on('get', {
            //获取列表成功。
            'list': function list(companys, accounts) {
                meta.companys = companys;
                meta.accounts = accounts;

                show(function () {
                    Tabs.render(0);
                    panel.$.find('[data-id="content"]').toggleClass('no-dataspe', !accounts.length);
                });
            }

        });

        panel.$on('click', '[data-cmd="{value}"]', {
            //关闭按钮。
            'close': function close(event) {
                hide();
            }
        });
    });

    /**
    * 渲染。
    */
    panel.on('render', function () {
        var visible = panel.visible();

        //当前是可见的。
        if (visible) {
            hide();
        } else {
            API.get();
        }
    });

    return {
        //让应用列表先加载渲染完，再手动调用本 hide()。
        'hide': hide
    };
});