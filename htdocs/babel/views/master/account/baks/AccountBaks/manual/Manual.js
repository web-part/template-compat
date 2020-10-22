/*
* babel time: 2020-10-19 16:41:37
*
* source md5: 743F5D3E2EB68CD3948C4539635744BA
*
* source file: htdocs/views/master/account/baks/AccountBaks/manual/Manual.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

/*
* 
*/
KISP.panel('/AccountBaks/Manual', function (require, module, panel) {
    var KISP = require('KISP');
    var API = module.require('API');
    var List = module.require('List');
    var Header = module.require('Header');
    var Pager = module.require('Pager');

    var meta = {
        company: null,
        product: null,
        no: 1, //当前页码，从 1 开始。
        size: 10, //每页的记录数。 即每页多少条记录。
        cache: false //指示是否为缓存数据。 如果是，则不请求后台。
    };

    panel.on('init', function () {

        Header.on({
            'check': function check(checked) {
                List.checkAll(checked);
            },

            'delete': function _delete() {
                var items = List.getChecks();

                if (!items.length) {
                    KISP.alert('请至少选择一项。');
                    return;
                }

                KISP.confirm('确认要批量删除选中的备份文件', function () {
                    panel.fire('delete', 'list', [items]);
                });
            }
        });

        List.on({
            'check': function check(list, count) {
                Header.render(meta, list, count);
            },

            'download': function download(item) {
                panel.fire('download', [item]);
            },

            'delete': function _delete(item) {
                panel.fire('delete', 'item', [item]);
            },

            'refresh': function refresh(item, index) {
                API.get(meta);
            }
        });

        Pager.on({
            //翻页。
            'change': function change(page) {
                meta.no = page.no;
                meta.size = page.size;

                API.get(meta);
            }
        });

        API.on('success', {
            'get': function get(list, page) {
                if (page.no == 1) {
                    Pager.render(page);
                }

                meta.cache = true; //指示拿到了数据，下次直接使用缓存。

                Header.render(meta, list);
                List.render(list);
            }

        });
    });

    /**
    * 渲染。
    *   data = {
    *       company: {},    //企业信息。
    *       product: {},    //产品信息。
    *   };
    */
    panel.on('render', function (data) {
        //已经缓存过了。
        if (meta.cache) {
            return;
        }

        //否则，需要发起请求。
        meta.company = data.company;
        meta.product = data.product;
        meta.no = 1;

        API.get(meta);
    });

    return {
        reset: function reset() {
            meta.cache = false;
        }
    };
});