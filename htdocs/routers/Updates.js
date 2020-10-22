/**
* 
*/
KISP.route('Updates', function (require, module) {


    return {
      
        /**
        * 跟消息中心是互斥显示的。
        */
        'show': function () {
            var Messages = module.require('Messages');
            Messages.hide();

        },
      
    };
});
