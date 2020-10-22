

KISP.panel('/Application/Manage/Content', function (require, module, panel) {
    var List = module.require('List');
    var Header = module.require('Header');
    var Pager = module.require('Pager');

    var meta = {
        list: [],       //最终要显示的用户列表。
    };

    panel.on('init', function () {
        Header.on({
            'search': function (list) { 
                List.render(list);
            }
        });

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



    panel.on('render', function (numInfo, data, pageinfo) {
        panel.$.find('[data-cmd="no-data-tip"]').toggleClass('show', !data.length);
        Header.render(numInfo, data);
        List.render(data);
        Pager.render({
            'total': pageinfo.total,
            'size': pageinfo.pagesize,
            'no': pageinfo.page,
        });

    });




    return {
        get: List.get,
    };


});






