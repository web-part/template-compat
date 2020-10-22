/**
* 
*/
KISP.route('ApplicationUsers', function (require, module) {


    return {
        'company-list': function () {
            var Master = module.require('Master');
            Master.open('Companys', []);
        },
        'product-list': function (company) {
            var Master = module.require('Master');
            Master.open('Products', [{ 'company': company, }]);
        },
        'application-list': function (data) {
            var Master = module.require('Master');
            Master.open('Application', [data]);
        },
        'add-users': function (data, application) {
            var Master = module.require('Master');
            Master.open('ApplicationUsers', [{ 'data': data, 'application': application, }]);
        }

    };
});
