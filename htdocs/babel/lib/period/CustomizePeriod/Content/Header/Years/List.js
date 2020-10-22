/*
* babel time: 2020-10-19 16:42:31
*
* source md5: EA08437F13C9664794A273D1D7405072
*
* source file: htdocs/lib/period/CustomizePeriod/Content/Header/Years/List.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

/**
* 
*/
KISP.panel('CustomizePeriod/Content/Header/Years/List', function (require, module, panel) {

    var KISP = require('KISP');

    var list = [];

    var meta = {
        index: 0,
        $el: null
    };

    panel.set('show', false);

    /**
    * 初始化时触发。
    * 即首次 render 之前触发，且仅触发一次。
    * 适用于创建实例、绑定事件等只需要执行一次的操作。
    */
    panel.on('init', function () {
        panel.$.on('click', 'li', function (event) {
            var index = +this.getAttribute('data-index');
            var item = list[index];

            meta.$el = $(this);
            panel.$.find('li').removeClass('on');
            meta.$el.addClass('on');

            //让视觉上有个选中的效果。
            setTimeout(function () {
                panel.fire('change', [item]);
            }, 100);
        });
    });

    /**
    * 渲染。
    *   data = {
    *       year: 2018,     //渲染后要选中的项。
    *       years: [],      //要填充的列表数据。
    *   };
    */
    panel.on('render', function (data) {

        list = data.years || [];

        //填充列表。
        panel.fill(list, function (item, index) {
            return {
                'index': index,
                'value': item.value
            };
        });

        //选中(即激活)指定的项。
        var year = data.year;
        var el = '[data-value="' + year + '"]';
        var $el = meta.$el = panel.$.find(el);

        $el.click();
    });

    panel.on('show', function () {

        meta.$el.get(0).scrollIntoView();
        panel.fire('show');
    });
});