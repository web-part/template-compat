// data = {
//     productType: 2,
//     itemlist: {}//关于应用数据
// }
//移动应用
define('AppData', function () {
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
            1: [
                {
                    'name': '购买详情',
                    'cmd': 'purchase',
                },
            ],  //试用中
            3: []  //已过期
        }

    }
    return product$status$list;
});
