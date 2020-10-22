/**
* 
*/
KISP.route('AccountBaks', function (require, module) {


    return {
        'company-list': function () {
            var Master = module.require('Master');
            Master.open('Companys', []);
        },

        'product-list': function (company) {
            var Master = module.require('Master');
            Master.open('Products', [{ 'company': company, }]);
        },

    };
});