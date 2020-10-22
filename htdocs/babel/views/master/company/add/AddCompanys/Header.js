/*
* babel time: 2020-10-19 16:41:38
*
* source md5: 8B350291472155C944923E36478011DB
*
* source file: htdocs/views/master/company/add/AddCompanys/Header.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

KISP.panel('/AddCompanys/Header', function (require, module, panel) {

    var KISP = require('KISP');

    var API = module.require('API');

    panel.on('init', function () {

        panel.$on('click', {
            '[data-cmd]': function dataCmd() {
                var cmd = this.getAttribute('data-cmd');
                panel.fire(cmd);
            },
            '[data-type="search"]': function dataTypeSearch() {
                var keyword = panel.$.find('[data-type="txt"]').val();
                panel.fire('search', [keyword]);
            }
        });

        panel.$.find('[data-type="txt"]').on({
            'keypress': function keypress() {
                if (event.keyCode === 13) {
                    var keyword = panel.$.find('[data-type="txt"]').val();
                    panel.fire('search', [keyword]);
                }
            }
        });

        API.on({
            'success': function success() {
                panel.fire('add-success');
            }
        });
    });

    panel.on('render', function () {});

    return {
        'postData': function postData(list) {
            if (!list.length) {
                return KISP.alert('请至少选择一项。');
            }
            API.post(list);
        }
    };
});