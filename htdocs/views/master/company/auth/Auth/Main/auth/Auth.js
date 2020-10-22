
/*
* 认证信息。
*/
KISP.panel('/Auth/Main/Auth', function (require, module, panel) {
    

    var Type = module.require('Type');          //企业类型。
    var License = module.require('License');    //营业执照。



    panel.on('init', function () {
        
        Type.on({
            'change': function (item) {
                License.render(item.value);
            },
        });

       
    });



    panel.on('render', function () {

        Type.render();
        License.render();


    });


    return {
        get: function () {
            var type = Type.get();
            var license = License.get();

            return [
                { key: 'type', value: type, },
                ...license,
            ];

        },
        setCode: License.setCode,
    };


});





