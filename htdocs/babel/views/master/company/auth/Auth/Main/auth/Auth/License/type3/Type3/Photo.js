/*
* babel time: 2020-10-19 16:41:38
*
* source md5: 00AC90BACC5C7E01E0C9B6F767B6DA63
*
* source file: htdocs/views/master/company/auth/Auth/Main/auth/Auth/License/type3/Type3/Photo.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

/*
* 
*/
KISP.panel('/Auth/Main/Auth/License/Type3/Photo', function (require, module, panel) {
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
                toast.show('请提供证件扫描件');
                Flash.start(panel.$, 'warning');
            };
        }

    };
});