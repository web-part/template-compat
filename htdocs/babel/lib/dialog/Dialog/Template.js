/*
* babel time: 2020-10-19 16:42:31
*
* source md5: 2D3D7B79AEED139A1851981849B84AC5
*
* source file: htdocs/lib/dialog/Dialog/Template.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

define('Dialog/Template', function (require, module) {

    var $ = require('$');
    var Template = KISP.require('Template');
    var $Array = KISP.require('Array');
    var $String = KISP.require('String');

    var tpl = new Template('#tpl-Dialog');

    tpl.process({
        '': function _(data) {
            var header = this.fill('header', data);
            var content = this.fill('content', data);
            var footer = this.fill('footer', data);

            var attributes = Object.entries(data.attributes).map(function (item) {
                return item[0] + '="' + item[1] + '"';
            });

            //因为原 html 中的 sample 给处理后 没有等号的属性值会给替换成有空值的属性值。
            //如 {attributes} 会给替换成 {attributes}=""，这不是我们想要的。
            //这里我们手动替换回来。
            this.fix('attributes');

            return {
                'id': data.id,
                'headerId': data.headerId,
                'contentId': data.contentId,
                'footerId': data.footerId,
                'attributes': attributes.join(' '),
                'cssClass': data.cssClass,
                'style': data.style,

                'header': header,
                'content': content,
                'footer': footer
            };
        },

        'header': function header(data) {
            return {
                'title': data.title,
                'sizerId': data.sizerId
            };
        },

        'content': function content(data) {
            return data.content;
        },

        'footer': {
            '': function _(data) {

                var footer = data.footer;

                var content = this.fill('content', footer);
                var buttons = this.fill('buttons', footer);
                var resizer = this.fill('resizer', data);

                return {
                    'content': content,
                    'buttons': buttons,
                    'resizer': resizer
                };
            },

            'content': function content(data) {
                return data.content;
            },

            'buttons': {
                '': function _(data) {
                    var buttons = data.buttons;
                    if (!buttons || buttons.length == 0) {
                        return '';
                    }

                    buttons = this.fill('button', buttons);

                    return {
                        'buttons': buttons
                    };
                },

                'button': function button(item, index) {
                    return {
                        'index': index,
                        'text': item.text,
                        'cssClass': item.cssClass || ''
                    };
                }
            },

            'resizer': function resizer(data) {
                if (!data.resizable) {
                    return '';
                }

                return {
                    'id': data.id
                };
            }
        }

    });

    return tpl;
});