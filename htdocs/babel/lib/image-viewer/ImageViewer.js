/*
* babel time: 2020-10-19 16:42:31
*
* source md5: B64A5C76B02763BD627B5C26C979E0BC
*
* source file: htdocs/lib/image-viewer/ImageViewer.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

/*
* 简易图片查看器。
*/
KISP.panel('ImageViewer', function (require, module, panel) {
    var KISP = require('KISP');

    var Content = module.require('Content');
    var Dialog = require('Dialog');
    var dialog = null;

    panel.on('init', function () {

        dialog = Dialog.panel({
            //'title': '查看图片',
            'width': 720,
            //'height': 416,
            'z-index': 1023,
            'resizable': false,
            'container': panel,
            'content': Content,

            'mask': {
                'volatile': true //易消失。
            }
        });

        dialog.on({
            'render': function render(img) {
                Content.render(img);
            }
        });

        Content.on({
            'resize': function resize(width) {
                panel.$.css({
                    'width': width,
                    'margin-left': 0 - width / 2
                });
            }
        });
    });

    panel.on('render', function (img) {

        dialog.render(img);
    });
});