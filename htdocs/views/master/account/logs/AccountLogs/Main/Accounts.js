

KISP.panel('/AccountLogs/Main/Accounts', function (require, module, panel) {
    var API = module.require('API');
    var List = module.require('List');



    panel.on('init', function () {

        API.on('success', {
            'get': function (list) {
                List.render(list);
            },

        });
    });




    /**
    * 渲染。
    *   data = {
    *       company: {},    //企业信息。
    *   };
    */
    panel.on('render', function (data) {

        API.get(data);

    });

  


});