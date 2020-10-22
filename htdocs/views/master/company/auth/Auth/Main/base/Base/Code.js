
/*
* 企业名称。
*/
KISP.panel('/Auth/Main/Base/Code', function (require, module, panel) {
    

    var toast = null;


    panel.on('init', function () {


    });

    panel.on('render', function () {

    });


    return {
        get: function () {
            var txt = panel.$.find('input').get(0);
            var value = txt.value;

            return value;


        },
    };


});





