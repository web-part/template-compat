
/*
* 基础信息。
*/
KISP.panel('/Auth/Main/Base', function (require, module, panel) {
    
  
    var Company = module.require('Company');    //企业名称。
    var Industry = module.require('Industry');  //所属行业。
    var Address = module.require('Address');    //企业地址。
    var Scale = module.require('Scale');        //企业规模。

  


    panel.on('init', function () {
        Company.on({
            'set-code': function (data) {
                panel.fire('set-code', [data]);
                
            }
        });
      
    });



    panel.on('render', function (company) {
        Company.render(company);
        Industry.render();
        Address.render();
        Scale.render();

    });

    return {
        get: function () {
            var company = Company.get();
            var industry = Industry.get();
            var address = Address.get();
            var scale = Scale.get();

            return [
                { key: 'company', value: company, },
                { key: 'industry', value: industry, },
                ...address,
                { key: 'scale', value: scale, },

            ];
         
        },
    };


});





