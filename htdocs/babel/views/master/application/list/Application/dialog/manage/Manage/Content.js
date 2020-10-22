/*
* babel time: 2020-10-19 16:41:37
*
* source md5: 0BECEC1DCF6DE6E0E5B562BA34E81A0B
*
* source file: htdocs/views/master/application/list/Application/dialog/manage/Manage/Content.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

KISP.panel('/Application/Manage/Content', function (require, module, panel) {
    var List = module.require('List');
    var Header = module.require('Header');
    var Pager = module.require('Pager');

    var meta = {
        list: [] //最终要显示的用户列表。
    };

    panel.on('init', function () {
        Header.on({
            'search': function search(list) {
                List.render(list);
            }
        });

        Pager.on({
            //翻页。
            'change': function change(page) {
                var pager = {
                    'no': page.no,
                    'size': page.size
                };
                panel.fire('page-chose', [pager]);
            }
        });
    });

    panel.on('render', function (numInfo, data, pageinfo) {
        panel.$.find('[data-cmd="no-data-tip"]').toggleClass('show', !data.length);
        Header.render(numInfo, data);
        List.render(data);
        Pager.render({
            'total': pageinfo.total,
            'size': pageinfo.pagesize,
            'no': pageinfo.page
        });
    });

    return {
        get: List.get
    };
});