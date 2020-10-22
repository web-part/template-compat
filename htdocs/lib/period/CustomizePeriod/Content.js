
/*
* 
*/
KISP.panel('CustomizePeriod/Content', function (require, module, panel) {
    var KISP = require('KISP');
    var $Array = KISP.require('Array');
    var Header = module.require('Header');
    var Main = module.require('Main');


    /**
    * 
    */
    panel.on('init', function () {

        Header.on({
            'change': function (data) {
                Main.render(data);
            },
        });

        Main.on('change', {
            'year': function (item, index) {
                Header.enable(index == 0);
            },
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
        Header.render(data);
    });




    return {
        /**
        * 获取数据。
        */
        get: function () {
            var header = Header.get();
            var main = Main.get();
            var settings = [];
            var current = main.item;
            var groups = main.list;

            //当前激活的年份的分期的值列表。
            var settings2 = current.segments.map(function (item) {
                return item.value;
            });


            if (!header.nature) {
                settings = groups.filter(function (group) {
                    return group.modified == 'manual';
                });

                settings = settings.map(function (group) {
                    //
                    var values = group.segments.map(function (item) {
                        return item.value;
                    });

                    var data = `${group.year}:${values.join(',')};`;

                    return data;
                });
            }

            return {
                'year': header.year,
                'nature': header.nature,
                'segment': header.segment,
                'current': current,         //当前激活的项。
                'groups': groups,

                //针对后台 API 接口的数据。
                api: {
                    'start_year': header.year,
                    'period_count': header.segment,
                    'Nature': header.nature ? 1 : 0,
                    'PeriodSettings': settings.join(''),
                    'CurrentYearSettings': settings2.join(','),
                },
            };
        },

        /**
        * 获取指定年份的缺省的 API 数据。
        * 该方法针对没有打开对话框、但需要获取用于提交给后台的数据的情况。
        * 可以根据给定的年份，获得默认的用于提交给后台的数据。
        */
        getDefaultApiData: function (year) {

            var list = $Array.pad(1, 13, function (month) {
                month = month.toString().padStart(2, '0'); //不足两位的月份前面补 `0`；
                return `${year}-${month}-01`;
            });

            return {
                'start_year': year,                     //年份。
                'period_count': 12,                     //12 期
                'Nature': 1,                            //启用自然年度
                'PeriodSettings': '',                   //
                'CurrentYearSettings': list.join(','),  //
            };
        },


    };



    
});





