

KISP.panel('/Products/Active/Content', function (require, module, panel) {
    var API = module.require('API');
    var Company = module.require('Company');
    var Sn = module.require('Sn');
    var Cdkey = module.require('Cdkey');



    panel.on('init', function () {
      

    });



    panel.on('render', function (data) {
        
        Company.render(data);
        Sn.render();
        Cdkey.render();

    });





    return {
        get: function () {
            var sn = Sn.get();
            var cdkey = Cdkey.get();

            if (!sn || !cdkey) {
                return false;
            }

            return {
                'sn': sn,
                'cdkey': cdkey,
            };
        },
    };
   

});






