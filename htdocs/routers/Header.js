/**
* 
*/
KISP.route('Header', function (require, module) {

    return {
        'messages': function () {
            var Messages = module.require('Messages');
            Messages.render();
        },

        'updates': function () {
            var Updates = module.require('Updates');
            Updates.render();
        },


        /**
        * 点击了头部左边的 logo，回到了首页。
        */
        'home': function () {
            var Messages = module.require('Messages');
            var Updates = module.require('Updates');
            Messages.hide();
            Updates.hide();
        },
    };
});
