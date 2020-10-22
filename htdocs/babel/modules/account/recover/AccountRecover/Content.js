/*
* babel time: 2020-10-19 16:42:31
*
* source md5: 0F620D4C7FE29C35BA4ABC140003A825
*
* source file: htdocs/modules/account/recover/AccountRecover/Content.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

/*
* 恢复账套对话框。
*/
KISP.panel('/AccountRecover/Content', function (require, module, panel) {

    var Header = module.require('Header');
    var List = module.require('List');
    var API = module.require('API');
    var Tabs = module.require('Tabs');
    var Pager = module.require('Pager');

    var init = true; //是否第一次打开恢复账套弹框
    var nowIndex = 0; //当前切换项
    var meta = {
        list: [], //手动备份列表
        autolist: [], //自动备份列表
        currentPro: '', //目前进入企业
        chosedPro: ','
    };

    panel.on('init', function () {
        Pager.on({
            //翻页。
            'change': function change(page) {
                meta.no = page.no;
                meta.size = page.size;
                API.get({
                    'tid': meta.currentPro.tid,
                    'folder_id': meta.chosedPro['folder_id'],
                    'total': meta.total,
                    'size': meta.size,
                    'no': meta.no
                });
            }
        });
        Header.on({
            'select': function select(item) {
                meta.list = [];
                meta.autolist = [];
                meta.chosedPro = item;
                if (init) {
                    init = false;
                    Tabs.render(nowIndex);
                    return;
                }
                if (nowIndex === 0) {
                    API.get({
                        'tid': meta.currentPro.tid,
                        'folder_id': meta.chosedPro['folder_id']
                    });
                }

                if (nowIndex === 1) {
                    API.getAuto({
                        'pid': meta.chosedPro['pid']
                    });
                }
            }
        });
        Tabs.on({
            'change': function change(index) {
                nowIndex = index;
                if (index === 0) {
                    if (!meta.list.length) {
                        API.get({
                            'tid': meta.currentPro.tid,
                            'folder_id': meta.chosedPro['folder_id']
                        });
                    } else {
                        List.render(meta.list);
                    }
                }

                if (index === 1) {
                    if (!meta.autolist.length) {
                        API.getAuto({
                            'pid': meta.chosedPro['pid']
                        });
                    } else {
                        List.render(meta.autolist);
                    }
                }
            }
        });
        API.on({
            'success': function success(list, type) {
                if (type === 'auto') {
                    meta.autolist = list;
                } else {
                    meta.list = list;
                }

                List.render(list);
            }
        });
    });
    panel.on('render', function (data) {
        meta = {
            list: [], //手动备份列表
            autolist: [], //自动备份列表
            currentPro: '', //目前进入企业
            chosedPro: ','
        };
        meta.currentPro = data;
        nowIndex = 0;
        init = true;
        Header.render(data);
    });
    return {
        get: function get() {
            var item = nowIndex === 0 ? meta.list[List.get()] : meta.autolist[List.get()];
            return {
                'item': item,
                'nowIndex': nowIndex
            };
        }
    };
});