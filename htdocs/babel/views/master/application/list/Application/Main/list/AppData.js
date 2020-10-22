/*
* babel time: 2020-10-19 16:41:37
*
* source md5: 5CB411376B01FCCEBE411C6FFBC9B8CA
*
* source file: htdocs/views/master/application/list/Application/Main/list/AppData.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

// data = {
//     productType: 2,
//     itemlist: {}//关于应用数据
// }
//移动应用
define('AppData', function () {
    var product$status$list = {
        1: { //已激活产品
            0: [//未使用
            {
                'name': '删除应用',
                'cmd': 'delete'
            }],
            1: [//试用中
            {
                'name': '更新服务',
                'cmd': 'update'
            }, {
                'name': '购买详情',
                'cmd': 'purchase'
            }],
            2: [//使用中
            {
                'name': '更新服务',
                'cmd': 'update'
            }, {
                'name': '购买详情',
                'cmd': 'purchase'
            }],
            3: [//已过期
            {
                'name': '更新服务',
                'cmd': 'update'
            }, {
                'name': '购买详情',
                'cmd': 'purchase'
            }]
        },
        2: { //未激活产品
            0: [//未使用
            {
                'name': '删除应用',
                'cmd': 'delete'
            }],
            1: [{
                'name': '购买详情',
                'cmd': 'purchase'
            }], //试用中
            3: [] //已过期
        }

    };
    return product$status$list;
});