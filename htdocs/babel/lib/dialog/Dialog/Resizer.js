/*
* babel time: 2020-10-19 16:42:31
*
* source md5: 7B692B79782759692170E3415749A40B
*
* source file: htdocs/lib/dialog/Dialog/Resizer.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

define('Dialog/Resizer', function (require, module, exports) {
    var KISP = require('KISP');
    var $ = require('$');

    var Template = KISP.require('Template');

    var x = 0; //��갴��ʱ�� pageX ֵ��
    var y = 0; //��갴��ʱ�� pageY ֵ��
    var width = 0;
    var height = 0;

    var cursor = ''; //��갴��ʱ�� cursor ָ��ֵ��
    var body = document.body;

    var id$meta = {};
    var meta = null;
    var header = null;
    var sizer = null;

    function stop(event) {
        body.style.cursor = cursor;
        //����input����򣬲���ֹĬ���¼�������ᵼ���ı�ȫѡ֮����ͨ�����ȡ��ȫѡ
        event && event.target.tagName != 'INPUT' && event.preventDefault();
        header && header.removeClass('resizing');

        meta = null;
        header = null;
        sizer = null;
    }

    function setSizer(width, height) {
        var html = width + ' x ' + height;
        sizer.html(html);
    }

    $(body).on({
        'mousedown': function mousedown(event) {
            var target = event.target;
            var id = target.getAttribute('data-id');
            meta = id$meta[id];

            if (!meta) {
                return;
            }

            x = event.pageX;
            y = event.pageY;

            cursor = body.style.cursor;
            body.style.cursor = $(target).css('cursor');

            width = meta.$.css('width');
            height = meta.$.css('height');
            width = parseInt(width);
            height = parseInt(height);

            header = $('#' + meta.headerId);
            header.addClass('resizing');

            sizer = $('#' + meta.sizerId);
            setSizer(width, height);

            return false; //��ֹѡ���ı�
        },

        'mousemove': function mousemove(event) {
            if (!meta) {
                return;
            }

            //����������ȥʱ�� event.which ��ֵΪ 1��
            //��ҷ dialog һֱ�뿪����������ɿ���꣬�����ᴥ�� mouseup �¼���
            //Ȼ������ٻص����������mousemove �¼����ǻ������������ event.which ��ֵΪ 0��
            //����� dialog ����ҷ���뿪���������ʱ������ִ�и� mouseup һ�����߼���
            if (event.which != 1) {
                stop();
                return;
            }

            var dx = event.pageX - x;
            var dy = event.pageY - y;

            var w = width + dx;
            var h = height + dy;

            var maxWidth = meta.maxWidth;
            if (maxWidth && w > maxWidth) {
                w = maxWidth;
            }

            var minWidth = meta.minWidth;
            if (minWidth && w < minWidth) {
                w = minWidth;
            }

            var maxHeight = meta.maxHeight;
            if (maxHeight && h > maxHeight) {
                h = maxHeight;
            }

            var minHeight = meta.minHeight;
            if (minHeight && h < minHeight) {
                h = minHeight;
            }

            meta.$.css({
                'width': w,
                'height': h
            });

            setSizer(w, h);
        },

        'mouseup': function mouseup(event) {
            stop(event);
        }
    });

    return {
        set: function set(id, meta) {
            id$meta[id] = meta;
        },

        remove: function remove(id) {
            delete id$meta[id];
        }

    };
});