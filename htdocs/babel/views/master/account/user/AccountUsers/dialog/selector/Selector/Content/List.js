/*
* babel time: 2020-10-19 16:41:37
*
* source md5: 3E5DA994A1647EC4E7DAD5436694DBD7
*
* source file: htdocs/views/master/account/user/AccountUsers/dialog/selector/Selector/Content/List.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

KISP.panel('/AccountUsers/Selector/Content/List', function (require, module, panel) {

    var User = require('User');

    var list = [];
    var selects = new Set();
    var Info; //筛选出来的列表显示用户

    panel.on('init', function () {

        // function highlight(keyword, content) {
        //     if (!keyword) {
        //         return content;
        //     }

        //     var html = "<span class='keyword'>" + keyword + "</span>";

        //     content = content.split(keyword).join(html);
        //     return content;

        // }


        panel.template({
            '': function _(data) {
                var table = this.fill('table', data);

                return {
                    'table': table
                };
            },

            'table': {
                '': function _(data) {
                    var rows = this.fill('row', data.items, data.keyword);

                    return {
                        'rows': rows
                    };
                },

                'row': function row(item, index, keyword) {
                    return {
                        'index': index,
                        'phone': item.phone, // highlight(keyword, item.phone)
                        'name': item.name, // highlight(keyword, item.name),
                        'email': item.email || '' // highlight(keyword, ),
                    };
                }
            }
        });
    });

    panel.on('init', function () {
        panel.$on('click', {
            '[data-cmd="check"]': function dataCmdCheck() {
                var index = +this.getAttribute('data-index');

                var checked = $(this).hasClass('on');

                var tr = panel.$.find('tr[data-index=' + index + ']');
                if (tr.hasClass('has-chosed')) {
                    return;
                }

                if (checked) {

                    selects.delete(index);
                    panel.fire('delete-checked', [Info[index]]);
                } else {
                    selects.add(index);
                }

                $(this).toggleClass('on', !checked);
                panel.$.find('[data-type="0"]').removeClass('on');
            }

        });
    });

    /**
    * 
    */

    panel.on('render', function (items, para) {
        Info = [];
        var chosedData = items.accounts;
        var confirmList = items.confirmList;

        if (para.phone == '') {
            list = items.accounts;
            Info = items.list;
        } else {
            list = items.searchList;
            Info = removeData(para.phone);
        }

        selects.clear();
        panel.$.toggleClass('no-data', !Info.length);

        panel.fill({
            'items': Info,
            'keyword': para.phone
        });

        // 处理已添加进来的

        var uid$item = {};
        chosedData.forEach(function (item) {
            var uid = item.origin['account_uid'];
            uid$item[uid] = item;
        });
        Info.map(function (item, index) {
            if (uid$item[item.uid]) {
                panel.$.find('tr[data-index=' + index + ']').addClass('has-chosed');
            }
        });

        // 处理之前页面已经勾选的

        var uid$item = {};
        confirmList.forEach(function (item) {
            var uid = item['uid'];
            uid$item[uid] = item;
        });
        Info.map(function (item, index) {
            if (uid$item[item.uid]) {
                panel.$.find('span[data-index=' + index + ']').addClass('on');
            }
        });

        var userInfo = User.get();
        if (userInfo) {
            panel.$.find('[data-type="0"]').addClass('on');
            return;
        }
        panel.$.find('[data-type="0"]').removeClass('on');
    });

    function removeData(keyword) {
        var Info = [];

        if (!keyword) {
            Info = list;
            return Info;
        }
        list.map(function (item, index) {
            if (item.phone.indexOf(keyword) != -1 || item.name.indexOf(keyword) != -1 || item.email && item.email.indexOf(keyword) != -1) {
                Info.push(item);
            }
        });
        return Info;
    }
    return {
        get: function get() {

            var items = Array.from(selects).map(function (index) {
                return Info[index];
            });
            return items;
        },

        add: function add(item) {
            var index = list.length;
            var tr = 'tr[data-index="' + index + '"]';

            list.push(item);
            panel.render(list);

            panel.$.find(tr).get(0).scrollIntoView();
        }
    };
});