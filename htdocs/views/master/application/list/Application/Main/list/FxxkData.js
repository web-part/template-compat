// data = {
//     productType: 2,
//     itemlist: {}//关于应用数据
// }

//分享逍客应用
define('FxxkData', function () {
    var product$status$list = {
        1: {  //已激活产品
            0: [  //未使用
                {
                    'name': '删除应用',
                    'cmd': 'delete',
                },
            ],
            1: { //试用中
                0: [  //未绑定账套
                    {
                        'name': '删除应用',
                        'cmd': 'delete',

                    },
                    {
                        'name': '更新服务',
                        'cmd': 'update',
                    },
                ],
                1: [  //绑定账套
                    {
                        'name': '添加用户',
                        'cmd': 'add-users',
                    },
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
            2: { //使用中
                0: [  //未绑定账套
                    {
                        'name': '更新服务',
                        'cmd': 'update',
                    },
                ],
                1: [  //绑定账套
                    {
                        'name': '添加用户',
                        'cmd': 'add-users',
                    },
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
            3: [  //已过期
                {
                    'name': '更新服务',
                    'cmd': 'update',
                },
                {
                    'name': '购买详情',
                    'cmd': 'purchase',
                },
            ],
            4: [],  //开通中
        },
        2: {  //未激活产品
            0: [  //未使用
                {
                    'name': '删除应用',
                    'cmd': 'delete',
                },

            ],
            1: { //试用中
                0: [  //未绑定账套
                    {
                        'name': '删除应用',
                        'cmd': 'delete',

                    },
                ],
                1: [  //绑定账套
                    {
                        'name': '添加用户',
                        'cmd': 'add-users',
                    },
                    {
                        'name': '购买详情',
                        'cmd': 'purchase',
                    },

                ]
            },
            3: [],  //已过期
               
            
            4: [], //开通中
        }

    }
    return product$status$list;
});
