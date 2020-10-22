/*
* babel time: 2020-10-19 16:41:38
*
* source md5: F1A8917AC6654E0637657B382BD1DDC8
*
* source file: htdocs/views/master/company/auth/Auth/Main/auth/Auth/License/type0/Type0/Photo.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

/*
* 
*/
KISP.panel('/Auth/Main/Auth/License/Type0/Photo', function (require, module, panel) {
    var KISP = require('KISP');
    var ImageReader = require('ImageReader');
    var ImageViewer = require('ImageViewer');
    var Flash = require('Flash');

    var toast = null;
    var reader = null;
    var photo = ''; //图片地址(base64)。
    var demo = 'http://p.cloudsz.kingdee.com/qy/public/dist/images/app/register/eg-big-b000610787.png';

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
            '[data-cmd="demo"]': function dataCmdDemo() {
                ImageViewer.render(demo);
            },

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
                toast.show('请提供营业执照图片');
                Flash.start(panel.$, 'warning');
            };
        }
    };
});