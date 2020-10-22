/*
* babel time: 2020-10-19 16:42:31
*
* source md5: C1B414AAFB4B95638B5C9C22911F3AFF
*
* source file: htdocs/modules/account/create/AccountCreate/type2/Type2/Content/Subject.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

/**
* 科目体系。
*/
KISP.panel('/AccountCreate/Type2/Content/Subject', function (require, module, panel) {
    var List = module.require('List');

    /**
    * 初始化时触发。
    * 即首次 render 之前触发，且仅触发一次。
    * 适用于创建实例、绑定事件等只需要执行一次的操作。
    */
    panel.on('init', function () {
        var url = 'http://kisdep.kingdee.com:8181/docs/show/';
        var value$href = {
            '0': '',
            '1': '93',
            '2': '100',
            '3': '99',
            '4': '101',
            '5': '102',
            '11': '103',
            '12': '332'
        };

        List.on({
            'select-item': function selectItem(value) {
                var $btn = '[data-cmd="subject-href"]';
                var a = panel.$.find($btn + ' a')[0];

                if (value == '0') {
                    panel.$.find('[data-cmd="subject-href"]').hide();
                    return;
                }

                panel.$.find('' + $btn).show();

                a.href = url + value$href[value];
            }
        });
    });

    panel.on('render', function () {
        List.render();
    });

    return {
        get: function get() {
            var item = List.get();

            return {
                'acct_type': item.value
            };
        }
    };
});