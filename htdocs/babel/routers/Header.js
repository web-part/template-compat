/*
* babel time: 2020-10-19 16:42:32
*
* source md5: E54257C6EF660D32A46FAD0B35AD64E2
*
* source file: htdocs/routers/Header.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

/**
* 
*/
KISP.route('Header', function (require, module) {

    return {
        'messages': function messages() {
            var Messages = module.require('Messages');
            Messages.render();
        },

        'updates': function updates() {
            var Updates = module.require('Updates');
            Updates.render();
        },

        /**
        * 点击了头部左边的 logo，回到了首页。
        */
        'home': function home() {
            var Messages = module.require('Messages');
            var Updates = module.require('Updates');
            Messages.hide();
            Updates.hide();
        }
    };
});