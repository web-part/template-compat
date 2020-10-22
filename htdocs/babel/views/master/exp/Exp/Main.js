/*
* babel time: 2020-10-19 16:42:32
*
* source md5: 19F40C0F0EADC147189BDA3CD827B3A6
*
* source file: htdocs/views/master/exp/Exp/Main.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

/*
* 
*/
KISP.panel('/Exp/Main', function (require, module, panel) {
    var KISP = require('KISP');

    var API = module.require('API');

    var _list = [];

    panel.on('init', function () {
        panel.template({
            '': function _(data) {
                var groups = this.fill('group', data.groups);
                return {
                    'groups': groups
                };
            },

            'group': {
                '': function _(group, no) {
                    var items = this.fill('item', group.items, no);
                    return {
                        'name': group.name,
                        'items': items
                    };
                },

                'item': function item(_item, index, no) {
                    return {
                        'no': no,
                        'index': index,
                        'name': _item.name,
                        'desc': _item.desc,
                        'class': _item.class,
                        'button': _item.button,
                        'yzj': 'no-icon'
                    };
                }
            }
        });
        panel.$.on('click', 'button[data-index]', function () {
            var index = +this.getAttribute('data-index');
            var no = +this.getAttribute('data-no');
            var group = _list[no];
            var item = group.items[index];
            API.getUrl({
                'acctid': item.origin.acctid,
                'tid': group.origin.tid
            });
        });
        API.on('get', {
            'list': function list(data) {
                panel.$.toggleClass('no-dataspe', !data.length);
                _list = data.map(function (group, no) {

                    var items = group.acctdata.map(function (item) {
                        return {

                            'name': item['acctname'],
                            'desc': item['productname'],
                            'button': '开始使用',
                            'origin': item,
                            'class': item.expire == 'Y' ? 'expire' : ''
                        };
                    });

                    return {
                        'name': group.name,
                        'items': items,
                        'origin': group
                    };
                });

                panel.fill({
                    'groups': _list
                });
            },

            'url': function url(_url) {
                var date = new Date().getTime();
                var randoms = '' + createRandoms(16) + date;

                var configUrl = KISP.config('API').url;
                var len = configUrl.length - 1;

                configUrl = !configUrl.includes('https') ? configUrl.slice(7, len) : configUrl.slice(0, len);
                location.href = _url + "&" + randoms + "&" + configUrl;
                API.checkBrowser(randoms);
            }
        });
    });

    function createRandoms(formater) {
        if (formater === undefined) {
            formater = 12;
        }
        //如果传入的是数字，则生成一个指定长度的格式字符串 'xxxxx...'
        if (typeof formater == 'number') {
            var size = formater + 1;
            if (size < 0) {
                size = 0;
            }
            formater = [];
            formater.length = size;
            formater = formater.join('x');
        }

        return formater.replace(/x/g, function (c) {
            var r = Math.random() * 16 | 0;
            return r.toString(16);
        }).toUpperCase();
    };

    /**
    * 渲染。
    */
    panel.on('render', function () {
        API.get();
    });
});