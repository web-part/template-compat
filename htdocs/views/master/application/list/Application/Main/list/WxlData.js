// data = {
//     productType: 2,
//     itemlist: {}//关于应用数据
// }
//移动微系列应用
define('WxlData', function () {
    var product$status$list = {
        1: {  //已激活产品
            0: [  //未使用
                {
                    'name': '删除应用',
                    'cmd': 'delete',
                },

            ],
            1: [  //试用中
                {
                    'name': '更新服务',
                    'cmd': 'update',
                },
                {
                    'name': '购买详情',
                    'cmd': 'purchase',
                },
                {
                    'name': '参数设置',
                    'cmd': 'paramset',
                },
            ],
            2: [  //使用中
                {
                    'name': '更新服务',
                    'cmd': 'update',
                },
                {
                    'name': '购买详情',
                    'cmd': 'purchase',
                },
                {
                    'name': '参数设置',
                    'cmd': 'paramset',
                },
            ],
            3: [  //已过期
                {
                    'name': '更新服务',
                    'cmd': 'update',
                },

                {
                    'name': '购买详情',
                    'cmd': 'purchase',
                },

            ]
        },
        2: {  //未激活产品
            0: [  //未使用
                {
                    'name': '删除应用',
                    'cmd': 'delete',
                },
            ],
            1: [ //试用中
                {
                    'name': '购买详情',
                    'cmd': 'purchase',
                },
                {
                    'name': '参数设置',
                    'cmd': 'paramset',
                },
            ],  
            3: []  //已过期
        }

    }
    return product$status$list;
});
