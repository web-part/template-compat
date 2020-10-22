/**
* 
*/
KISP.route('Register', function (require, module) {


    return {
        'addcompany-list': function () {
            var Master = module.require('Master');
            Master.open('AddCompanys', []);
        },

    };
});
