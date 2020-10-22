/*
* babel time: 2020-10-19 16:41:38
*
* source md5: 33EBC192BBAC3B63C3B9F98038593773
*
* source file: htdocs/views/master/product/list/Products/Main.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

/*
* 
*/
KISP.panel('/Products/Main', function (require, module, panel) {
    var API = module.require('API');
    var List = module.require('List');
    var Header = module.require('Header');
    var News = module.require('News');

    var meta = {
        company: null
    };

    panel.on('init', function () {

        List.on({
            'save': function save(item, value) {
                API.save(item, value);
            },

            'kis-o2o': function kisO2o(type, item) {
                API.o2o(type, item);
            },

            'cmd': {
                '': function _(cmd, item) {
                    panel.fire('cmd', cmd, [item]);
                },

                'update': function update(item) {
                    API.update({
                        'company': meta.company,
                        'product': item
                    });
                },
                'change': function change(item) {
                    API.change({
                        'tid': item.origin.tid,
                        'prodid': item.origin['prod_id']
                    });
                },
                'to-pub': function toPub(item) {
                    API.toPub({
                        'tid': item.origin.tid,
                        'prodid': item.origin['prod_id'],
                        'type': 1
                    });
                },

                'free-test': function freeTest(item) {

                    panel.fire('trial', [item]);
                }

            }
        });

        API.on('success', {
            'get': function get(list) {

                //只要发现有一项是需要隐藏的，即认为是需要隐藏。
                var hasHide = list.some(function (item, index) {
                    return !!item.hide;
                });

                Header.render(hasHide);
                List.render(list, hasHide);
                News.render(list);

                panel.fire('get-list', [list]);
            },

            //更新产品成功后/切换为私有云/启用公有云/修改产品名称后，需刷新列表。
            'refresh': function refresh() {
                API.get(meta);
            },

            //获取跳转到 kis-o2o 链接成功。
            'kis-o2o': function kisO2o(url, defaults) {
                if (defaults.test == 1) {
                    window.open(url);
                } else {
                    console.log(url);
                }
            }
        });
    });

    panel.on('render', function (company) {
        meta.company = company;
        API.get(meta);
    });

    return {};
});