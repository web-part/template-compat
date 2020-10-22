

KISP.panel('/Application/Forbidden/Content', function (require, module, panel) {
    var List = module.require('List');
    var Head = module.require('Head');

    var meta = {
        list: [],       //最终要显示的用户列表。
    };

    panel.on('init', function () {
        Head.on({
            'check-all': function (checked) {
                List.checkall(checked);
            }
        });
        List.on({
            'allcheck': function (checked) { 
                Head.checkall(checked);
            }
        })

    });



    panel.on('render', function (data,updateInfo) {
        List.render(data);
        Head.render(updateInfo);
    });




    return {
        get: List.get,
    };


});






