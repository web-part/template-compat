/*
* babel time: 2020-10-19 16:42:31
*
* source md5: 27F5C8456E59C877438F1A30AF1509A7
*
* source file: htdocs/lib/period/CustomizePeriod/Content/Header/Years.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

/*
* 
*/
KISP.panel('CustomizePeriod/Content/Header/Years', function (require, module, panel) {
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

    /**
    * 渲染。
    *   data = {
    *       year: 2018,     //头部年份列表填充后，要选中的年份值。
    *       years: [],      //部年份列表要填充数据。
    *   };
    */
    panel.on('render', function (data) {
        List.render(data);
    });
});