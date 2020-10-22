/**
* 
*/
KISP.route('AccountRecover', function (require, module) {



    return {
      
        'ok': function (data) {
            var Master = module.require('Master');
            Master.open('Accounts',[data]);
        },

    };
});
