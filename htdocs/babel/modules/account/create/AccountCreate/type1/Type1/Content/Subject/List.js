/*
* babel time: 2020-10-19 16:42:31
*
* source md5: C2E838A75321497DB342F5CB2D34D0F9
*
* source file: htdocs/modules/account/create/AccountCreate/type1/Type1/Content/Subject/List.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

/**
* 核算方式。
*/
KISP.panel('/AccountCreate/Type1/Content/Subject/List', function (require, module, panel) {

    var KISP = require('KISP');

    var list = [{ name: '企业会计制度科目', value: '1' }, { name: '新会计准则科目', value: '3' }, { name: '小企业会计制度科目', value: '2' }, { name: '2013小企业会计准则科目', value: '4' }];

    var tabs = null;

    var meta = {
        index: 0
    };

    /**
    * 初始化时触发。
    * 即首次 render 之前触发，且仅触发一次。
    * 适用于创建实例、绑定事件等只需要执行一次的操作。
    */
    panel.on('init', function () {
        tabs = KISP.create('Tabs', {
            container: panel.$.get(0),
            selector: '[data-index]',
            activedClass: 'on',
            eventName: 'click'
        });

        tabs.on('change', function (item, index) {
            meta.index = index;
            panel.fire('select-item', [index]);
        });
    });

    panel.on('render', function () {
        tabs.render(list, function (item, index) {
            return {
                'index': index,
                'name': item.name
            };
        });

        tabs.active(meta.index);
    });

    return {
        get: function get() {
            return list[meta.index];
        }
    };
});