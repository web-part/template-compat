/*
* babel time: 2020-10-19 16:42:31
*
* source md5: EB5103FBC14B6D7EC7309CCF0A0A8E22
*
* source file: htdocs/lib/period/CustomizePeriod/Content/Main/Segments.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

/*
* 
*/
KISP.panel('CustomizePeriod/Content/Main/Segments', function (require, module, panel) {
    var KISP = require('KISP');
    var $Date = KISP.require('Date');

    var meta = {
        list: [],
        nature: false
    };

    /**
    * 初始化时触发。
    * 即首次 render 之前触发，且仅触发一次。
    * 适用于创建实例、绑定事件等只需要执行一次的操作。
    */
    panel.on('init', function () {

        panel.template({
            '': function _(data) {
                var table = this.fill('table', data);
                return table;
            },

            'table': {
                '': function _(data) {
                    var rows = this.fill('row', data.list);

                    return {
                        'rows': rows
                    };
                },

                'row': function row(item, index) {
                    this.fix(['readonly']);

                    return {
                        'no': index + 1,
                        'index': index,
                        'value': item.value,
                        'readonly': meta.nature ? 'readonly' : ''
                    };
                }
            }
        });

        panel.$.on('change', 'input', function (event) {
            var txt = this;
            var index = +txt.getAttribute('data-index');
            var item = meta.list[index];
            var value = txt.value;
            var dt = $Date.parse(value);

            if (isNaN(dt.getTime())) {
                KISP.alert('非法日期', function () {
                    txt.value = item.value;
                    txt.focus();
                });
                return;
            }

            console.log(index, value, item);
            panel.fire('change', [item, value]);
        });
    });

    /**
    * 渲染。
    *   data = {
    *       nature: true,   //
    *       list: [
    *           {
    *               value: '2018-03-01', //
    *           },
    *       ],
    *   };
    */
    panel.on('render', function (data) {
        Object.assign(meta, data);

        panel.fill({ 'list': meta.list });
        panel.$.toggleClass('disabled', !!meta.nature); //启用自然年度会计期间的，则禁用。

    });
});