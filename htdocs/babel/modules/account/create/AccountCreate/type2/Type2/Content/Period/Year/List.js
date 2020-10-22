/*
* babel time: 2020-10-19 16:42:31
*
* source md5: F1327EF3399F8AF40FA9733EE752296A
*
* source file: htdocs/modules/account/create/AccountCreate/type2/Type2/Content/Period/Year/List.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

/**
* 
*/
KISP.panel('/AccountCreate/Type2/Content/Period/Year/List', function (require, module, panel) {
    var KISP = require('KISP');
    var $Array = KISP.require('Array');

    var list = [];

    var meta = {
        index: 0,
        $el: null
    };

    panel.set('show', false);

    function _active(index) {
        var el = '[data-index="' + index + '"]';
        var $el = panel.$.find(el);

        meta.index = index;
        $el.click();
    }

    /**
    * 初始化时触发。
    * 即首次 render 之前触发，且仅触发一次。
    * 适用于创建实例、绑定事件等只需要执行一次的操作。
    */
    panel.on('init', function () {

        //今年。
        var current = new Date().getFullYear();

        list = $Array.pad(1970, 2100, function (value, index) {
            if (value == current) {
                meta.index = index;
            }

            return {
                'value': value
            };
        });

        panel.$.on('click', 'li', function (event) {
            var index = +this.getAttribute('data-index');
            var item = list[index];

            meta.$el = $(this);
            panel.$.find('li').removeClass('on');
            meta.$el.addClass('on');

            //让视觉上有个选中的效果。
            setTimeout(function () {

                panel.fire('change', [item, list]); //把 list 传出去给外面用。
            }, 100);
        });
    });

    panel.on('render', function () {
        panel.fill(list, function (item, index) {
            return {
                'index': index,
                'value': item.value
            };
        });
    });

    panel.on('after-render', function () {
        _active(meta.index);
    });

    panel.on('show', function () {
        meta.$el.get(0).scrollIntoViewIfNeeded();
        panel.fire('show');
    });

    return {
        active: function active(value) {
            var index = list.findIndex(function (item, index) {
                return item.value == value;
            });

            if (index < 0) {
                throw new Error('\u5217\u8868\u4E2D\u4E0D\u5B58\u5728 ' + value + ' \u7684\u5E74\u4EFD\u3002');
            }

            _active(index);
        }
    };
});