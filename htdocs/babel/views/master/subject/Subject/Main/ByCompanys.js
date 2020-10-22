/*
* babel time: 2020-10-19 16:41:38
*
* source md5: 27E1C7F93F156E57BCCC9CE3FC5C553B
*
* source file: htdocs/views/master/subject/Subject/Main/ByCompanys.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

/**
* 以企业进行分组进行展示。
*/
KISP.panel('/Subject/Main/ByCompanys', function (require, module, panel) {
    var KISP = require('KISP');

    var list = [];

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
                    var company = group.company;
                    var items = this.fill('item', group.accounts, no);

                    return {
                        'company': company['name'],
                        'items': items
                    };
                },

                'item': function item(_item, index, no) {
                    var account = _item.account;

                    return {
                        'no': no,
                        'index': index,

                        'account': account['acctname'],
                        'product': account['productname'],

                        'expire-class': account['expire'] == 'Y' ? 'expire' : '', //是否已过期。
                        'recent-used-class': account['recent'] == 'Y' ? 'on' : '', //是否为最近使用的，只能有一项。
                        'max-used-class': _item.isMax ? 'has-lab' : '' //是否为使用最多的，只能有一项。

                    };
                }
            }
        });

        panel.$on('click', {
            'li[data-index]': function liDataIndex(event) {
                var no = +this.getAttribute('data-no');
                var index = +this.getAttribute('data-index');
                var group = list[no];
                var item = group.accounts[index];

                panel.$.find('li[data-index]').removeClass('on'); //先移除上一次高亮的。
                $(this).addClass('on');

                panel.fire('item', [item]);
            }
        });
    });

    /**
    */
    panel.on('render', function (companys) {

        list = companys;

        panel.fill({
            'groups': list
        });
    });
});