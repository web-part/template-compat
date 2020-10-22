/*
* babel time: 2020-10-19 16:42:31
*
* source md5: 443337885C5560E6CFADAFABF0CDA23F
*
* source file: htdocs/data/Sidebar.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

define('data.Sidebar', function () {

    var environment = KISP.data('environment');
    var second = [];
    if (environment == 'official') {
        first = [{ name: '我的账套', view: 'Subject', icon: 'product' }];
        second = [{ name: '我的企业', view: 'Companys', icon: 'company', href: '' },

        //对应的视图需要传递企业信息过去的 (通过指定 requireCompany: true)。
        { name: '我的产品', view: 'Products', icon: 'product', href: '', requireCompany: true }, { name: '删除记录', view: 'AccountLogs', icon: 'delete', href: '', requireCompany: true }];
    } else {
        first = [{ name: '我的账套', view: 'Subject', icon: 'product' }, { name: '体验账套', view: 'Exp', icon: 'exp', href: '' }];
        second = [{ name: '我的企业', view: 'Companys', icon: 'company', href: '' }, { name: '体验账套', view: 'Exp', icon: 'exp', href: '' },

        //对应的视图需要传递企业信息过去的 (通过指定 requireCompany: true)。
        { name: '我的产品', view: 'Products', icon: 'product', href: '', requireCompany: true }, { name: '删除记录', view: 'AccountLogs', icon: 'delete', href: '', requireCompany: true },

        //外部链接 (通过指定 href)。
        { name: 'KIS云之家', view: '', icon: 'yzj', href: 'https://www.yunzhijia.com' }, { name: '云进销存体验', view: '', icon: 'yjxc', href: 'http://mob.cmcloud.cn/KISWebERP/kispro/yunic/index.html?type=ty' }, { name: '金蝶云盘', view: '', icon: 'yp', href: 'https://pan.kingdee.com' }];
    }
    return {
        //普通用户
        1: first,

        //管理员。

        2: second,
        //视图要对应高亮到的目标菜单。
        highlights: {
            'Register': 'Companys', //注册企业页面的，要高亮我的企业菜单项。
            'Auth': 'Companys', //
            'AddCompanys': 'Companys', //
            'Accounts': 'Products', //
            'AccountUsers': 'Products', //
            'AccountBaks': 'Products', //
            'Application': 'Products',
            'ApplicationUsers': 'Products'
        }
    };
});