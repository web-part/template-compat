/*
* babel time: 2020-10-19 16:42:31
*
* source md5: 30393DE0A4C4E2556FE6C5917577190C
*
* source file: htdocs/lib/dialog/Dialog/Meta.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

define('Dialog/Meta', function (require, module, exports) {
    var KISP = require('KISP');
    var $ = require('$');
    var $String = KISP.require('String');

    return {
        create: function create(config, others) {
            var id = 'Dialog-' + $String.random(4);
            var footer = config.footer;
            var mask = config.mask;

            if (Array.isArray(footer)) {
                footer = {
                    'content': '',
                    'buttons': footer
                };
            } else if (typeof footer == 'string') {
                footer = {
                    'content': footer,
                    'buttons': []
                };
            } else {
                footer = footer || {};
            }

            if (mask === true) {
                mask = {
                    'volatile': false //�Ƿ�����ʧ��
                };
            }

            var meta = {
                'dragable': config.dragable,
                'resizable': config.resizable,
                'cssClass': config.cssClass,
                'autoClose': config.autoClose, //����κ�һ����ť���Ƿ��Զ��ر����
                'mask': mask,
                'z-index': config['z-index'], //����͸����ʱҪ�õ�
                'width': config.width,
                'height': config.height,
                'container': config.container,
                'title': config.title,
                'content': config.content,
                'footer': footer,
                'maxWidth': config.maxWidth,
                'minWidth': config.minWidth,
                'maxHeight': config.maxHeight,
                'minHeight': config.minHeight,
                'attributes': config.attributes,
                'masker': null,

                'id': id,
                'headerId': id + '-header',
                'contentId': id + '-content',
                'footerId': id + '-footer',
                'sizerId': id + '-sizer',

                'rendered': false, //�Ƿ�����Ⱦ���ˡ�
                'visible': false, //��¼��ǰ����Ƿ�����ʾ
                '$': null, //$(this)���ڲ�ʹ�õ�һ�� jQuery ����
                'this': this,

                'fromClose': false //��¼ this.close() �� masker.hide() ֮��Ĺ�ϵ��������ѭ����
            };

            Object.assign(meta, others);

            return meta;
        }
    };
});