/*
* babel time: 2020-10-19 16:41:37
*
* source md5: 432B56BF364956DEE56AE78F0317F54C
*
* source file: htdocs/views/master/application/list/Application/Main/list/FxxkData.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

// data = {
//     productType: 2,
//     itemlist: {}//关于应用数据
// }

//分享逍客应用
define('FxxkData', function () {
    var product$status$list = {
        1: { //已激活产品
            0: [//未使用
            {
                'name': '删除应用',
                'cmd': 'delete'
            }],
            1: { //试用中
                0: [//未绑定账套
                {
                    'name': '删除应用',
                    'cmd': 'delete'

                }, {
                    'name': '更新服务',
                    'cmd': 'update'
                }],
                1: [//绑定账套
                {
                    'name': '添加用户',
                    'cmd': 'add-users'
                }, {
                    'name': '更新服务',
                    'cmd': 'update'
                }, {
                    'name': '购买详情',
                    'cmd': 'purchase'
                }]
            },
            2: { //使用中
                0: [//未绑定账套
                {
                    'name': '更新服务',
                    'cmd': 'update'
                }],
                1: [//绑定账套
                {
                    'name': '添加用户',
                    'cmd': 'add-users'
                }, {
                    'name': '更新服务',
                    'cmd': 'update'
                }, {
                    'name': '购买详情',
                    'cmd': 'purchase'
                }]

            },
            3: [//已过期
            {
                'name': '更新服务',
                'cmd': 'update'
            }, {
                'name': '购买详情',
                'cmd': 'purchase'
            }],
            4: [] //开通中
        },
        2: { //未激活产品
            0: [//未使用
            {
                'name': '删除应用',
                'cmd': 'delete'
            }],
            1: { //试用中
                0: [//未绑定账套
                {
                    'name': '删除应用',
                    'cmd': 'delete'

                }],
                1: [//绑定账套
                {
                    'name': '添加用户',
                    'cmd': 'add-users'
                }, {
                    'name': '购买详情',
                    'cmd': 'purchase'
                }]
            },
            3: [], //已过期


            4: [] //开通中
        }

    };
    return product$status$list;
});