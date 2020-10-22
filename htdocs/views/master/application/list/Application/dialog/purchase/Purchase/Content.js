

KISP.panel('/Application/Purchase/Content', function (require, module, panel) {

    
    var List = module.require('List');

    var meta = {
        list: [],       //最终要显示的用户列表。
    };

    panel.on('init', function () {
    });



    panel.on('render', function (data, pageinfo) {
        List.render(data);
    });




    return {
        get: List.get,
    };


});






