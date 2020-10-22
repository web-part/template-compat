/*
* babel time: 2020-10-19 16:41:38
*
* source md5: 9BDAB4A00BAC5FE7D180A17D86F170A1
*
* source file: htdocs/views/master/company/auth/Auth/Main/auth/Auth/License/type2/Type2/Photo.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

/*
* 
*/
KISP.panel('/Auth/Main/Auth/License/Type2/Photo', function (require, module, panel) {
    var KISP = require('KISP');
    var ImageReader = require('ImageReader');
    var ImageViewer = require('ImageViewer');
    var Flash = require('Flash');

    var toast = null;
    var reader = null;
    var photo = ''; //图片地址(base64)。


    panel.on('init', function () {
        var input = panel.$.find('input[type="file"]').get(0);

        toast = KISP.create('Toast', {
            duration: 1500,
            mask: 0,
            icon: 'close',
            width: 185
        });

        reader = new ImageReader(input);

        reader.on({
            'success': function success(data) {
                photo = data;
                panel.$.addClass('has');
            }

        });

        panel.$on('click', {
            '[data-cmd="show-photo"]': function dataCmdShowPhoto() {
                ImageViewer.render(photo);
            }

        });
    });

    panel.on('render', function () {

        reader.render();
    });

    return {
        reset: function reset() {
            photo = '';
            panel.$.removeClass('has');
        },

        get: function get() {
            if (photo) {
                return photo;
            }

            return function () {
                toast.show('请提供身份证扫描件');

                Flash.start(panel.$, 'warning');
            };
        }

    };
});