/*
* babel time: 2020-10-19 16:42:31
*
* source md5: A075C9B3A9FE05ACA0836D37EBE789FB
*
* source file: htdocs/modules/account/create/AccountCreate/type2/Type2/Content/Period.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

/**
* 会计期间。
*/
KISP.panel('/AccountCreate/Type2/Content/Period', function (require, module, panel) {

    var Customize = module.require('Customize');
    var Year = module.require('Year');
    var Month = module.require('Month');

    var meta = {
        month: '' //选中的月份。
    };

    /**
    * 初始化时触发。
    * 即首次 render 之前触发，且仅触发一次。
    * 适用于创建实例、绑定事件等只需要执行一次的操作。
    */
    panel.on('init', function () {

        Year.on({
            'change': function change(item, list) {
                Customize.render({
                    'year': item.value,
                    'years': list
                });
            }
        });

        Month.on({
            'change': function change(value) {
                meta.month = value;
            }
        });

        //自定义会计期间对话框点击确定后。
        Customize.on({
            'ok': function ok(data) {
                Year.active(data.year);
            }
        });
    });

    /**
    * 
    */
    panel.on('render', function () {
        Year.render();
        Month.render();
    });

    return {
        /**
        * 获取用于提交给后台的数据。
        */
        get: function get() {

            var api = Customize.get({
                'start_period': meta.month
            });

            return api;
        }
    };
});