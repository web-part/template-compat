
/*
* 
*/
define('CustomizePeriod/Content/Main/Data/Segments', function (require, module, exports) {
    var KISP = require('KISP');
    var $Array = KISP.require('Array');
    var $Date = KISP.require('Date');

    //解析日期成 item。
    function parseDate(dt) {
        var value = $Date.format(dt, 'yyyy-MM-dd');
        var a = value.split('-');

        return {
            'year': Number(a[0]),
            'month': Number(a[1]),
            'day': Number(a[2]),
            'value': value,
            'date': dt,
        };
    }



    return {
        /**
        * 根据指定的年份、期间数，创建期间列表。
        */
        create: function (year, segment, parent) {
            var begin = 1;
            var end = segment + 1;

            var list = $Array.pad(begin, end, function (month, index) {
                var day = '01';

                //针对第 13 期的。
                if (month == 13) {
                    month = 12;
                    day = '31';
                }


                //不足两位的月份前面补 `0`，如 `3` 得到 `03`。
                month = month.toString();
                month = month.padStart(2, '0');

                var value = `${year}-${month}-${day}`;
                var date = $Date.parse(value);

                return {
                    //这些年月日分开的字段，提供一下，方便可能用到。
                    'year': Number(year),
                    'month': Number(month),
                    'day': Number(day),
                    'value': value,
                    'date': date,       //Date 实例。
                    'index': index,
                    'parent': parent,   //反向关联到自己所属的组(即父节点)，方便 js 内部访问父节点。
                    'previous': null,   //上一个兄弟节点。
                    'next': null,       //下一个兄弟节点。
                    'siblings': [],     //兄弟结点，这里先占位。
                };

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
        * 手动更改数据后，自动更新关联的记录(需显式指定)。
        *   item: {},   //就是 segment 的数据项对象。
        *   value: '',  //改动后的值，如 `2018-03-22`。
        */
        update: function (item, value, related) {
            var dt = $Date.parse(value);

            if (isNaN(dt.getTime())) {
                throw new Error('要更新的值不是一个合法的日期。');
            }
       
            var info = parseDate(dt);

            Object.assign(item, info);


            //没有指定要同时更新关联的记录。
            if (!related) {
                return;
            }

            var siblings = item.siblings;
            var max = $Date.addYears(siblings[0].date, 1);//第一期的加多一年作为参考。
            var base = {
                'year': info.year,
                'month': info.month,
                'day': info.day,
                'decreased': false, //是否已减了一天。 只需要减一次即可。
            };


            //处理后续的兄弟节点。
            siblings.slice(item.index + 1).forEach(function (item) {

                console.log('base:', base);

                //先简单让月份加 1。
                base.month++;

                //跨年了。
                if (base.month > 12) {
                    base.year++;
                    base.month = 1;
                }

                //以年月日构建一个真实的 Date 实例。
                
                var dt = $Date.parse(`${base.year}-${base.month}-${base.day}`); //如 `2018-02-30`，解析后为 `2018-03-02`
                var month = dt.getMonth() + 1; //获取月份，如 `3`。

                //看是否发生了跨月，如果是，则取回当前月的最后一天。
                //如 `2018-02-30`，实际为 `2018-03-02`，发生了跨月，
                //则取 2 月份的最后一天，即 `2018-02-28`。
                //取当月的最后一天有个小技巧：
                //先取下个月的 1 号，然后再减一天即可。
                //如要取 2018年2月份的最后天，为避免计算闰年，可以先取 `2018-03-01`，
                //再减去一天，即可得到 2 月份的最后一天。
                if (month > base.month) {
                    dt = $Date.parse(`${base.year}-${base.month + 1}-01`);
                    dt = $Date.addDays(dt, -1);
                }
                

                //如果超过允许的最大值，则日期减一。
                if (dt > max && !base.decreased) {
                    dt = $Date.addDays(dt, -1);
                    base.decreased = true;
                    base.day = dt.getDate();
                }

                //
                //2月29日的，强行改回2月28号，方便后续的年份统一处理。
                if (dt.getMonth() + 1 == 2 && dt.getDate() == 29) {
                    dt = $Date.parse(`${dt.getFullYear()}-02-28`);
                }


                var info = parseDate(dt);

                Object.assign(item, info);
            });


        },

    };


});





