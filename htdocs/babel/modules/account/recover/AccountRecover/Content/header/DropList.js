/*
* babel time: 2020-10-19 16:42:31
*
* source md5: 69199B3166FDA27AAAB58E2299EF161A
*
* source file: htdocs/modules/account/recover/AccountRecover/Content/header/DropList.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

KISP.panel('/AccountRecover/Content/Header/DropList', function (require, module, panel) {
    var KISP = require('KISP');
    var DropList = require('DropList');

    var droplist = null;
    var toast = null;

    var list = [];

    /**
    * 初始化时触发。
    * 即首次 render 之前触发，且仅触发一次。
    * 适用于创建实例、绑定事件等只需要执行一次的操作。
    */
    panel.on('init', function () {
        toast = KISP.create('Toast', {
            duration: 1500,
            mask: 0,
            icon: 'close',
            width: 150
        });

        droplist = new DropList({
            'container': panel.$.get(0),
            'columns': ['product_name'],
            'readonly': false,
            'field': {
                id: 'id',
                text: 'product_name',
                focus: 'product_name',
                title: 'product_name'
            }
        });

        droplist.render();

        droplist.on({
            'select': function select(item, opt) {
                var oItem = item.item;

                panel.fire('select', [oItem]);
            },

            'focus': function focus() {
                if (list.length == 0) {
                    panel.fire('loading');
                }
            }

        });
    });

    /**
    * 渲染时触发。
    * 即外界显式调用 render() 时触发，且每次调用都会触发一次。
    * 外界传进来的参数会原样传到这里。
    */
    panel.on('render', function (data) {
        if (data) {
            var num = 0;

            list = data.list;

            droplist.fill(list);
            list.map(function (item, index) {
                if (item.pid == data.currentItem.pid) {
                    num = index;
                }
            });
            droplist.select(num);

            if (list.length == 0) {
                droplist.$.find('td').html('加载中...');
            }
        }
    });
});