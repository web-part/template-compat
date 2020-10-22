/**
* 
*/
KISP.route('AccountLogs', function (require, module) {


    return {
        'company-list': function () {
            var Master = module.require('Master');
            Master.open('Companys', []);
        },

    };
});
