
/**
* 第一步中的表单。
*/
KISP.panel('/AccountCreate/Type4/Content/Store', function (require, module, panel) {

    var KISP = require('KISP');

    var toast = null;
    var checked = true;
    /**
    * 初始化时触发。
    * 即首次 render 之前触发，且仅触发一次。
    * 适用于创建实例、绑定事件等只需要执行一次的操作。
    */
    panel.on('init', function () {
        toast = KISP.create('Toast', {
            icon: 'close',
            duration: 1500,
        });

    });

    panel.on('init', function () {
        panel.$on('click', {
            '[data-cmd="check-box"]': function () {
                checked = !checked;

                $(this).toggleClass('on', checked);
            },
        });
    });

    panel.on('render', function (data) {

    });





    return {
        get: function () {
            var store = checked ? 1 : 0;
            return {
                muti_stock_calculate: store,
            }
        },
    };



});






