
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
        item: null,   //当前激活的项。 即左侧年份中给激活的项。
    };

    panel.on('init', function () {

        Years.on({
            'change': function (item, index) {
                console.log('change: ', item);

                meta.item = item;
                Segments.render({ 'list': item.segments, });
                panel.fire('change', 'year', [item, index]); 
            },
        });

        Segments.on({
            'change': function (item, value) {
                Data.update(item, value);
                Segments.render(item.siblings);
            },
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

        Segments.render({ 'nature': data.nature, });
    });


    return {

        get: function () {
            return meta;
        },
    };
  
});





