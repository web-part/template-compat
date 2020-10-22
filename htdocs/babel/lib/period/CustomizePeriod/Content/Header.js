/*
* babel time: 2020-10-19 16:42:31
*
* source md5: 58C3524DD03E2831401FA0141F2277BC
*
* source file: htdocs/lib/period/CustomizePeriod/Content/Header.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

/*
* 
*/
KISP.panel('CustomizePeriod/Content/Header', function (require, module, panel) {
    var KISP = require('KISP');
    var Years = module.require('Years');
    var Nature = module.require('Nature');
    var Segment = module.require('Segment');

    var meta = {
        'year': 0,
        'nature': true,
        'segment': 12
    };

    panel.on('init', function () {

        //把短时间内的多次触发合并成一次进行触发。
        //同时会合并数据参数。
        var tid = null;

        function fire(opt) {
            clearTimeout(tid);
            Object.assign(meta, opt);

            tid = setTimeout(function () {
                panel.fire('change', [meta]);
            }, 200);
        }

        Years.on({
            'change': function change(year) {
                fire({ 'year': year });
            }
        });

        Nature.on({
            'change': function change(checked) {
                Segment.render({
                    'disabled': checked
                });

                fire({ 'nature': checked });
            }
        });

        Segment.on({
            'change': function change(segment) {
                fire({ 'segment': segment });
            }
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
        Years.render(data);

        Nature.render({ 'checked': true });
    });

    return {
        enable: function enable(enabled) {
            panel.$.find('[data-id="container"]').toggleClass('disabled', !enabled);
        },

        get: function get() {
            return meta;
        }
    };
});