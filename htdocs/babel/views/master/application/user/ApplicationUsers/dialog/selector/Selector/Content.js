/*
* babel time: 2020-10-19 16:41:38
*
* source md5: 3BCA93DFEF16BC31864F95083BE350A1
*
* source file: htdocs/views/master/application/user/ApplicationUsers/dialog/selector/Selector/Content.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

KISP.panel('/ApplicationUsers/Selector/Content', function (require, module, panel) {
    var Search = module.require('Search');
    var List = module.require('List');
    var Add = module.require('Add');
    var Pager = module.require('Pager');

    var meta = {
        list: [], //最终要显示的用户列表。
        applications: [], //已存在的账套用户列表。
        searchList: [],
        confirmList: [] //已勾选数据列表

    };

    panel.on('init', function () {
        Pager.on({
            //翻页。
            'change': function change(page) {
                var pager = {
                    'no': page.no,
                    'size': page.size
                };
                panel.fire('page-chose', [pager]);
            }
        });
        List.on({
            'delete-checked': function deleteChecked(info) {
                meta.confirmList = meta.confirmList.filter(function (item, index) {
                    return item.uid != info.uid;
                });
                panel.fire('delete-checked', [info]);
            }
        });
        Search.on({
            'change': function change(value) {
                var para = {
                    'phone': value
                };
                List.render(meta, para);

                // List.highlight(value);
            }

        });

        Add.on({
            'ok': function ok(item) {

                panel.fire('add', [item]);
            }
        });
    });

    /**
    *   从 list 中减去 data.list 的共同项，就是最终要显示的用户列表。
    *   data = {
    *       list: [],       //已存在的账套用户列表。
    *       company: {},    //企业信息。
    *   };
    *   list = [];          //本来要显示的全部用户列表。
    */
    panel.on('render', function (data, list, confirmList, para) {

        //要显示的列表为: list = list - data.list;
        //通过 uid 确定每一项。
        //data.list 是已存在的账套用户列表。
        //把它的每一项用 uid 作为主键建立关联关系，
        meta.searchList = data.searchList;
        meta.list = list;
        meta.applications = data.list;
        meta.confirmList = confirmList;
        Search.render(para);
        List.render(meta, para);
        Add.render({
            'company': data.company,
            'users': meta.list,
            'applications': meta.applications
        });

        if (para.ifSearch && para.phone != '') {
            Pager.render({
                'total': 1,
                'size': 20,
                'no': 1
            });
            return;
        }
        Pager.render({
            'total': data.total,
            'size': data.size,
            'no': data.no
        });
    });

    return {
        get: function get() {
            meta.confirmList = meta.confirmList.concat(List.get());
            return meta.confirmList;
        }
    };
});