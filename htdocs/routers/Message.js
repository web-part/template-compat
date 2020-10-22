/**
* 
*/
KISP.route('Message', function (require, module) {


    return {
        'detail': function (item) {
            var Messages = module.require('Messages');
            Messages.render(item);
        },

        'get': function (count) {
            var Header = module.require('Header');

            Header.setMessageCount(count);
        },
      
    };
});
