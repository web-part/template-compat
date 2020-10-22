/*
* babel time: 2020-10-19 16:42:31
*
* source md5: 512F6DCD58778E12235D17BAFA5DED9A
*
* source file: htdocs/modules/account/create/AccountCreate/type2/Type2/Content/Period/Month.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

/**
* 
*/
KISP.panel('/AccountCreate/Type2/Content/Period/Month', function (require, module, panel) {

    var KISP = require('KISP');
    var List = module.require('List');

    /**
    * 初始化时触发。
    * 即首次 render 之前触发，且仅触发一次。
    * 适用于创建实例、绑定事件等只需要执行一次的操作。
    */
    panel.on('init', function () {

        var masker = KISP.create('Mask', {
            opacity: 0,
            volatile: true,
            container: panel.$.get(0).parentNode
        });

        masker.on({
            'hide': function hide() {
                List.hide();
            }
        });

        List.on({
            'show': function show() {
                masker.show();
                masker.$.css('left', 0); //这里调整一下。
            },

            'change': function change(item) {
                var value = item.value;
                masker.hide();
                panel.$.find('button').html(value);
                panel.fire('change', [value]);
            }
        });

        panel.$.on('click', 'button', function () {
            List.show();
        });
    });

    panel.on('render', function () {
        List.render();
    });
});