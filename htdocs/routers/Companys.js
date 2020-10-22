/**
* 
*/
KISP.route('Companys', function (require, module) {


    return {
        'item': function (company) {
            var Master = module.require('Master');
            var data = { 'company': company, };

            Master.set(data);
            Master.open('Products', [data]);
        },

        'add-company': function () {
            var Master = module.require('Master');
            Master.open('AddCompanys');
        },

        'auth': function (company) {
            var Master = module.require('Master');
            var data = { 'company': company, };

            Master.set(data);
            Master.open('Auth', [data]);
        },
        'no-company': function () { 
            var Master = module.require('Master');
            
            Master.open('AddCompanys');
        },
    };
});
