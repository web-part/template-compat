/*
* babel time: 2020-10-19 16:41:38
*
* source md5: 892815D485629C0E15EA54237E7BE274
*
* source file: htdocs/views/master/application/user/ApplicationUsers/dialog/selector/Selector.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

/*
* 选择用户对话框。
*/
KISP.panel('/ApplicationUsers/Selector', function (require, module, panel) {
    var KISP = require('KISP');

    var API = module.require('API');
    var Content = module.require('Content');
    var Footer = module.require('Footer');

    var Dialog = require('Dialog');
    var dialog = null;
    var meta = {
        company: null,
        product: null,
        application: null,
        list: [] //账套用户列表。 它是要展示的云之家用户列表的一个子集。
    };
    var searchlistNum = 1;
    var init = true;
    var ifFirst = true;
    var confirmList = [];

    // var mobile='';  //新增的暂存手机号码

    panel.on('init', function () {

        function unique(data) {
            var result = {};
            var finalResult = [];
            for (var i = 0; i < data.length; i++) {
                result[data[i].uid] = data[i];
            }
            for (a in result) {
                finalResult.push(result[a]);
            }
            return finalResult;
        }
        dialog = Dialog.panel({
            'title': '选择云之家用户',
            'width': 670,
            'height': 626,
            'z-index': 1023,
            'container': panel,
            'content': Content,
            'footer': Footer
        });

        dialog.on({
            'render': function render(data) {
                if (ifFirst) {
                    ifFirst = false; //先初始化列表，以防页面错乱
                    return;
                }
                API.get({
                    'companyId': meta.company.origin['tid'],
                    'no': meta.no,
                    'size': meta.size,
                    'mobile': '',
                    'ifSearch': false,
                    'ifGet': false
                });

                //Content.render(meta, []);
                //Footer.render();
            },
            'enter': function enter(event) {}
        });

        API.on('success', {
            'get': function get(list, page) {
                meta.total = page.total;
                if (page.ifGet || page.ifAdd) {
                    //判断是否是首次进来获取所有数据
                    searchlistNum++;
                    meta.searchList = meta.searchList.concat(list);

                    meta.searchList = unique(meta.searchList);
                    if (searchlistNum <= Math.ceil(page.total / 100)) {
                        toGetSearchList();
                    } else {
                        dialog.render(meta);
                    }
                } else {
                    init = false;
                }

                if (!init) {
                    var para = {
                        'ifSearch': page.ifSearch,
                        'phone': page.phone
                    };
                    list = list.reverse();
                    Content.render(meta, list, confirmList, para);
                    Footer.render();
                }
            },
            'post': function post() {
                dialog.close();
                panel.fire('ok');
            }
        });

        //失败的，也让外面的列表刷新。
        API.on('fail', {
            'post': function post() {
                dialog.close();
                panel.fire('ok');
            }
        });

        Content.on({
            //添加成功，刷新列表。
            'add': function add(item) {
                // meta.no = Math.ceil(meta.total / meta.size);          //由于正式环境数据没有追加到最后，所以取去请求最后一页数据没有意义
                searchlistNum = 1;
                init = true;
                //meta.searchList.unshift(item);
                API.get({
                    'companyId': meta.company.origin['tid'],
                    'no': searchlistNum,
                    'size': 100,
                    'mobile': '',
                    'ifSearch': false,
                    'ifAdd': true
                });
            },

            'page-chose': function pageChose(page) {
                confirmList = confirmList.concat(Content.get());
                confirmList = unique(confirmList);

                meta.no = page.no;
                meta.size = page.size;
                API.get({
                    'companyId': meta.company.origin['tid'],
                    'no': meta.no,
                    'size': meta.size,
                    'mobile': meta.mobile,
                    'ifSearch': false
                });
            },
            'delete-checked': function deleteChecked(info) {
                confirmList = confirmList.filter(function (item, index) {
                    return item.uid != info.uid;
                });
            }
        });

        Footer.on({
            'ok': function ok() {
                var list = Content.get();
                list = unique(list);
                confirmList = [];
                if (!list.length) {
                    return KISP.alert('请至少选择一项。');
                }
                API.post(meta, list);
            },

            'cancel': function cancel() {
                dialog.close();
            }
        });
    });

    panel.on('render', function (data) {
        meta = data;
        meta.mobile = '';
        meta.no = 1;
        meta.size = 20;
        meta.searchList = [];
        searchlistNum = 1;
        init = true;
        ifFirst = true;
        dialog.render(meta);
        toGetSearchList();
    });
    function toGetSearchList() {
        API.get({
            'companyId': meta.company.origin['tid'],
            'no': searchlistNum,
            'size': 100,
            'mobile': '',
            'ifSearch': false,
            'ifGet': true
        });
    }
});