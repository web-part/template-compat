

KISP.panel('/Application/Bind/Content', function (require, module, panel) {

    var List = module.require('List');
    var Pager = module.require('Pager');

    var meta = {
        list: [],       //最终要显示的用户列表。
        confirmList: [],           //已勾选数据列表
    };

    panel.on('init', function () {
        Pager.on({
            //翻页。
            'change': function (page) {
                var pager = {
                    'no': page.no,
                    'size': page.size,
                }
                panel.fire('page-chose', [pager]);
            },
        });

    });



    panel.on('render', function (data, isbind) {
        panel.$.find('[data-cmd="no-data-tip"]').toggleClass('show', !data.list.length);
        
        List.render(data.list, isbind);
        Pager.render({
            'total': data.pageinfo.total,
            'size': data.pageinfo.pagesize,
            'no': data.pageinfo.page,
        });

    });




    return {
        get: List.getChosed,
    };


});






