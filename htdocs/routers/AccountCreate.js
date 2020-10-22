/**
* 
*/
KISP.route('AccountCreate', function (require, module) {



    return {
        //账套创建成功。
        'success': function (data) {
            var Master = module.require('Master');
            Master.open('Accounts', [data]);
        },

        //'customize': function (data) {
        //    var CustomizePeriod = module.require('CustomizePeriod');
        //    CustomizePeriod.render(data);
        //},

    };
});
