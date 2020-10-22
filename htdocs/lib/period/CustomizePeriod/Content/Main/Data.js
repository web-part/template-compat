
/*
* 年份和期间列表数据管理器。
*/
define('CustomizePeriod/Content/Main/Data', function (require, module, exports) {
    var KISP = require('KISP');
    var $Array = KISP.require('Array');
    var $Date = KISP.require('Date');
    var Segments = module.require('Segments');









    return exports = {
        /**
        * 根据开始年份、年份区间长度、期间长度，创建列表数据。
        *   options = {
        *       year: 2018,     //开始年份。
        *       nature: true,   //自然年度会计期间。 如果是，则 segment 强行变为 12。
        *       segment: 12,    //期间长度，12 或 13。
        *   };
        */
        create: function (data) {
            var begin = data.year;
            var end = begin + 50;
            var segment = data.nature ? 12 : data.segment;
            var valid = segment == 12 || segment == 13;

            if (!valid) {
                throw new Error('会计期间只能为 12 或 13。');
            }
          

            var list = $Array.pad(begin, end, function (year, index) {
                var item = {
                    'index': index,     //方便关联访问。
                    'year': year,
                    'modified': false,  //是否发生了修改，可取的值为 false、`auto`、`manual`。
                    'segments': [],     //关联的分期，这里先占位。
                    'siblings': [],     //就是 list 自己，方便关联访问，这里先占位。
                    'previous': null,   //上一个兄弟节点。
                    'next': null,       //下一个兄弟节点。
                };

                item.segments = Segments.create(year, segment, item);

                return item;
              
            });

            //重设一下。
            list.forEach(function (item, index) {
                Object.assign(item, {
                    'previous': list[index - 1] || null,
                    'next': list[index + 1] || null,
                    'siblings': list,
                });
            });



            return list;
        },


        /**
        * 手动更改数据后，自动更新关联的记录。
        *   segment: {},   //就是 segment 的数据项对象。
        *   value: '',  //改动后的值，如 `2018-03-22`。
        */
        update: function (segment, value) {
            var group = segment.parent;                         //当处理的分组，即左侧栏的年份。
            var groups = group.siblings.slice(group.index + 1); //从当前年份开始，后续的年份分组都要处理。
       

            group.modified = 'manual';              //标识一下，该分组(年份)的更新类型为手动的。

            Segments.update(segment, value, true);  //联动更新当前年份的。

            //自动更新后面的年份分组。
            groups.forEach(function (group) {
                group.modified = 'auto';            //标识一下，该分组(年份)的更新类型为自动的。

                group.segments.forEach(function (segment, index) {
                    var seg = group.previous.segments[index];               //上一年的同一分期。 如当前处理的是 `2019-06` 的，则以 `2018-06` 的为准。
                    var value = `${seg.year + 1}-${seg.month}-${seg.day}`;  //

                    Segments.update(segment, value, false); //仅更新当前项。

                });
           

            });




        },

    };


});





