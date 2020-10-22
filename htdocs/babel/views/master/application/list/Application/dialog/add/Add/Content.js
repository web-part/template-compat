/*
* babel time: 2020-10-19 16:41:37
*
* source md5: 8FB6074983C7C4E18C13987EFAEA01BC
*
* source file: htdocs/views/master/application/list/Application/dialog/add/Add/Content.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

KISP.panel('/Application/Add/Content', function (require, module, panel) {
    var List = module.require('List');
    var Pager = module.require('Pager');

    var meta = {
        list: [] //最终要显示的用户列表。
    };

    panel.on('init', function () {

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

    panel.on('render', function (data, pageinfo) {
        panel.$.find('[data-cmd="no-data-tip"]').toggleClass('show', !data.length);

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