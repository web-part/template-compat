
/*
* 营业执照。
*/
KISP.panel('/Auth/Main/Auth/License', function (require, module, panel) {
    

    var meta = {
        type: '0',
    };


    panel.on('init', function () {


    });


    panel.on('render', function (type) {
        
        //入参 type 必须为严格的字符串 '0'、'2' 或 '3'，或不传。
        meta.type = type;

        ['0', '2', '3'].forEach(function (item, index) {

            var M = module.require('Type' + item);

            if (type) {
                M.render(item == type); //切换显示。
            }
            else {
                M.reset(); //清空旧数据。
            }

        });
    });




    return {
        get: function () {
            var M = module.require('Type' + meta.type);
            var value = M ? M.get() : [];

            return value;
          
        },
        setCode: function (data) { 
            var Type0 = module.require('Type0');
            Type0.setCode(data);
        },
    };


});





