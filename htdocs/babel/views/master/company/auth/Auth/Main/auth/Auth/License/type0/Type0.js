/*
* babel time: 2020-10-19 16:41:38
*
* source md5: 9AB24975DBF0D4231B3F5FAF3EA8A746
*
* source file: htdocs/views/master/company/auth/Auth/Main/auth/Auth/License/type0/Type0.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

/*
* 
*/
KISP.panel('/Auth/Main/Auth/License/Type0', function (require, module, panel) {

    var Code = module.require('Code');
    var Photo = module.require('Photo');

    panel.set('show', false);

    panel.on('init', function () {});

    panel.on('render', function (actived) {

        panel.$.toggleClass('on', actived);

        Code.render();
        Photo.render();
    });

    return {
        reset: function reset() {
            panel.$.removeClass('on');
            Code.reset();
            Photo.reset();
        },

        get: function get() {
            var code = Code.get();
            var photo = Photo.get();

            return [{ key: 'code', value: code }, { key: 'photo', value: photo }];
        },
        setCode: Code.setCode
    };
});