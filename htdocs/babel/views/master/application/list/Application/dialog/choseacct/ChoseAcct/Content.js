/*
* babel time: 2020-10-19 16:41:37
*
* source md5: 6BCBE1B8351060F986E57218E941295C
*
* source file: htdocs/views/master/application/list/Application/dialog/choseacct/ChoseAcct/Content.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

KISP.panel('/Application/ChoseAcct/Content', function (require, module, panel) {

    var List = module.require('List');
    var Pager = module.require('Pager');

    var meta = {
        list: [], //最终要显示的用户列表。
        confirmList: [] //已勾选数据列表
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

    panel.on('render', function (data, nowChosed) {
        panel.$.find('[data-cmd="no-data-tip"]').toggleClass('show', !data.list.length);

        List.render(data.list, nowChosed);
        Pager.render({
            'total': data.pageinfo.total,
            'size': data.pageinfo.pagesize,
            'no': data.pageinfo.page
        });
    });

    return {
        get: List.getChosed
    };
});