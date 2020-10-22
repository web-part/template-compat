/*
* babel time: 2020-10-19 16:42:31
*
* source md5: 0C3C8E6CD30EFA3785B9BEBE5B3DAFDE
*
* source file: htdocs/lib/period/CustomizePeriod/Content/Main/Years.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

/*
* 
*/
KISP.panel('CustomizePeriod/Content/Main/Years', function (require, module, panel) {
    var KISP = require('KISP');

    var list = [];
    var tabs = null;

    /**
    * 初始化时触发。
    * 即首次 render 之前触发，且仅触发一次。
    * 适用于创建实例、绑定事件等只需要执行一次的操作。
    */
    panel.on('init', function () {

        tabs = KISP.create('Tabs', {
            container: panel.$.get(0),
            selector: '>li',
            activedClass: 'on',
            eventName: 'click'
        });

        tabs.on('change', function (item, index) {
            item = list[index];
            panel.fire('change', [item, index]);
        });
    });

    /**
    * 渲染。
    */
    panel.on('render', function (items) {

        list = items;

        //填充列表。
        tabs.render(list, function (item, index) {
            return {
                'index': index,
                'year': item.year
            };
        });

        tabs.active(0);
    });
});