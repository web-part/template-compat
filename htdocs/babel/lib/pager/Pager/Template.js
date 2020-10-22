/*
* babel time: 2020-10-19 16:42:31
*
* source md5: B299CBC9211A2EA57B56A722AC48809E
*
* source file: htdocs/lib/pager/Pager/Template.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

define('Pager/Template', function (require, module) {

    var $ = require('$');
    var Template = KISP.require('Template');
    var $Array = KISP.require('Array');

    var tpl = new Template('#tpl-Pager');

    tpl.process({
        '': function _(data) {
            var no = data.no;
            var count = data.count;

            var regions = this.fill('region', data.regions, no);
            var sizes = this.fill('size', data.sizes, data.size);

            return {
                'regions': regions,
                'sizes': sizes,

                'count': data.count,
                'total': data.total,
                'ulId': data.ulId,
                'txtId': data.txtId,
                'sizerId': data.sizerId,
                'toNo': data.toNo,

                'first-disabled-class': no == Math.min(1, count) ? 'disabled' : '',
                'final-disabled-class': no == count ? 'disabled' : '',
                'jump-disabled-class': count == 0 ? 'disabled' : ''
            };
        },

        'region': {
            '': function _(region, index, no) {
                var from = region.from;
                var to = region.to;
                var items = $Array.pad(from, to + 1);

                items = this.fill('item', items, no);

                var more = region.more || '';
                if (more) {
                    more = this.fill('more', {});
                }

                var html = items + more;
                return html;
            },

            'item': function item(no, index, cno) {
                var active = no == cno ? 'active' : '';

                return {
                    'no': no,
                    'active': active
                };
            },

            'more': function more(data) {
                return data;
            }
        },

        'size': function size(item, index, _size) {
            this.fix('selected');

            return {
                'value': item,
                'selected': item == _size ? 'selected="selected"' : ''
            };
        }

    });

    return tpl;
});