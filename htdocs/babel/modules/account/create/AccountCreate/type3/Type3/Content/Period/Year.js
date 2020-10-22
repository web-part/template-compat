/*
* babel time: 2020-10-19 16:42:31
*
* source md5: BE2FB43BD5382EBB1AD444FA9D2C4BDC
*
* source file: htdocs/modules/account/create/AccountCreate/type3/Type3/Content/Period/Year.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

/**
* 
*/
KISP.panel('/AccountCreate/Type3/Content/Period/Year', function (require, module, panel) {

    var KISP = require('KISP');
    var List = module.require('List');

    var meta = {
        fromManual: false
    };

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

            'change': function change(item, list) {
                masker.hide();
                panel.$.find('button').html(item.value);

                if (!meta.fromManual) {
                    panel.fire('change', [item, list]);
                } else {
                    meta.fromManual = false; //外面手动调用 active() 进来的，重置一下。
                }
            }
        });

        panel.$.on('click', 'button', function () {
            List.show();
        });
    });

    panel.on('render', function () {
        List.render();
    });

    return {
        active: function active(year) {
            meta.fromManual = true; //指示是外面手动调用的，以做到禁止循环触发事件。
            List.active(year);
        }
    };
});