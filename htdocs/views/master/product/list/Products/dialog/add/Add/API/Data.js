
define('/Products/Add/API/Data', function (require, module, exports) {
    var $ = require('$');

    return {
        /**
        * 把后台返回的数据改成前端的结构。
        *
            {
                //一级列表。
                types: [
                    {
                        name: '金蝶KIS云专业版V15.0',
                        //二级列表。
                        items: [
                            { name: '金蝶KIS云专业版-总账包', },
                        ],
                        regions: [
                            { name: '华南区', id: '0', },
                        ],
                    },
                ],
                //地区列表。
                regions: [
                    { name: '华南区', id: '0', },
                ],
            };
        */
        format: function (data) {
            var id$region = {};
            var list = data || [];

            //从所有的产品中收集成完整的地区列表。
            //建立起以 id 为主键的关联关系。
            list.forEach(function (item) {
                var regions = item.region || [];

                regions.forEach(function (region) {
                    var id = region['region_id'];
                    id$region[id] = region;
                });
            });


            //一级列表。
            var types = list.map(function (item) {
                //目前后台还没二级列表的数据结构，到时再处理。
                var items = item['sec_product_list'] || [];
                var regions = item['region'] || [];

                regions = regions.map(function (region) {
                    return {
                        'name': region['region_name'],
                        'id': region['region_id'],
                        'origin': region,
                    };
                });

                return {
                    'name': item['product_name'],
                    'items': items,
                    'regions': regions,
                    'origin': item,
                };
            });

            //地区列表。
            var regions = Object.keys(id$region).map(function (id) {
                var region = id$region[id];

                return {
                    'name': region['region_name'],
                    'id': id,
                    'origin': region,
                };
            });

            //暂时写死两项，且禁用掉。
            types = types.concat([
                //{
                //    'name': '金蝶KIS旗舰版V6.0 Plus',
                //    'items': [],
                //    'regions': [],
                //    'origin': {},
                //    'disabled': true,
                //    'title': '该产品尚未上架，敬请期待。',
                //},

                
                // {
                //     'name': '金蝶KIS专业版V15.1 Plus',
                //     'items': [],
                //     'regions': [],
                //     'origin': {},
                //     'disabled': true,
                //     'title': '该产品尚未上架，敬请期待。',
                // },

            ]);


            return {
                'types': types,
                'regions': regions,
            };


        },

     


    };


});