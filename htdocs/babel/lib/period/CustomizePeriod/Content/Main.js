/*
* babel time: 2020-10-19 16:42:31
*
* source md5: A259A241F55FF140970D38BC3E710715
*
* source file: htdocs/lib/period/CustomizePeriod/Content/Main.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

/*
* 
*/
KISP.panel('CustomizePeriod/Content/Main', function (require, module, panel) {
    var KISP = require('KISP');
    var Data = module.require('Data');
    var Years = module.require('Years');
    var Segments = module.require('Segments');

    var meta = {
        list: [],
        item: null //当前激活的项。 即左侧年份中给激活的项。
    };

    panel.on('init', function () {

        Years.on({
            'change': function change(item, index) {
                console.log('change: ', item);

                meta.item = item;
                Segments.render({ 'list': item.segments });
                panel.fire('change', 'year', [item, index]);
            }
        });

        Segments.on({
            'change': function change(item, value) {
                Data.update(item, value);
                Segments.render(item.siblings);
            }
        });
    });

    /**
    * 渲染。
    *   options = {
    *       year: 2018,     //开始年份。
    *       nature: true,   //是否启用自然年度会计期间。 如果是，则 segment 强行变为 12。
    *       segment: 12,    //期间长度，12 或 13。
    *   };
    */
    panel.on('render', function (data) {
        meta.list = Data.create(data);

        Years.render(meta.list);

        Segments.render({ 'nature': data.nature });
    });

    return {

        get: function get() {
            return meta;
        }
    };
});