/*
* babel time: 2020-10-19 16:42:32
*
* source md5: 5968B4446A16F04EC404E12A747C29A3
*
* source file: htdocs/views/login/Login/Main/Form/CapsLock.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

/**
* 大小写开关检查。
*/
KISP.panel('/Login/Main/Form/CapsLock', function (require, module, panel) {
    var KISP = require('KISP');

    var isOff = true; //假设是关闭的。 这个逻辑不是很严谨，只适用于进来页面之前，大小写开关是关闭状态的。


    panel.set('show', false);

    panel.on('init', function () {
        $(document.body).on({
            'keydown': function keydown(event) {
                var keyCode = event.originalEvent.keyCode;

                if (keyCode == 20) {
                    isOff = !isOff;
                }

                panel.toggle(!isOff);
            }
        });
    });

    panel.on('render', function () {});

    return {};
});