/*
* babel time: 2020-10-19 16:42:32
*
* source md5: AE86BDBA3BA9835AD1E03293E9110095
*
* source file: htdocs/routers/Message.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

/**
* 
*/
KISP.route('Message', function (require, module) {

    return {
        'detail': function detail(item) {
            var Messages = module.require('Messages');
            Messages.render(item);
        },

        'get': function get(count) {
            var Header = module.require('Header');

            Header.setMessageCount(count);
        }

    };
});