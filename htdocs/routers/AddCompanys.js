/**
* 
*/
KISP.route('AddCompanys', function (require, module) {


    return {
        'to-companys': function () {
            var Master = module.require('Master');
            Master.open('Companys');
        },
        'register': function () {
            var Master = module.require('Master');
            Master.open('Register');
        },
        'add-success': function () {
            var Master = module.require('Master');
            Master.open('Companys');
        },
    };
});
