/*
* babel time: 2020-10-19 16:41:38
*
* source md5: A2121ED21756EB8325FE79A148462BA1
*
* source file: htdocs/views/master/company/auth/Auth/Main/auth/Auth/License/type2/Type2.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

/*
* 
*/
KISP.panel('/Auth/Main/Auth/License/Type2', function (require, module, panel) {

    var Name = module.require('Name');
    var Code = module.require('Code');
    var Photo = module.require('Photo');

    panel.set('show', false);

    panel.on('init', function () {});

    panel.on('render', function (actived) {

        panel.$.toggleClass('on', actived);

        Name.render();
        Code.render();
        Photo.render();
    });

    return {
        reset: function reset() {
            panel.$.removeClass('on');

            Name.reset();
            Code.reset();
            Photo.reset();
        },

        get: function get() {
            var name = Name.get();
            var code = Code.get();
            var photo = Photo.get();

            return [{ key: 'name', value: name }, { key: 'code', value: code }, { key: 'photo', value: photo }];
        }

    };
});