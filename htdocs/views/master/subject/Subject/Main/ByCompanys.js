
/**
* 以企业进行分组进行展示。
*/
KISP.panel('/Subject/Main/ByCompanys', function (require, module, panel) {
    var KISP = require('KISP');


    var list = [];





    panel.on('init', function () {
        panel.template({
            '': function (data) {
                var groups = this.fill('group', data.groups);
                return {
                    'groups': groups,
                };
            },

            'group': {
                '': function (group, no) {
                    var company = group.company;
                    var items = this.fill('item', group.accounts, no);

                    return {
                        'company': company['name'],
                        'items': items,
                    };

                },

                'item': function (item, index, no) {
                    var account = item.account;

                    return {
                        'no': no,
                        'index': index,

                        'account': account['acctname'],
                        'product': account['productname'],


                        'expire-class': account['expire'] == 'Y' ? 'expire' : '',   //是否已过期。
                        'recent-used-class': account['recent'] == 'Y' ? 'on' : '',  //是否为最近使用的，只能有一项。
                        'max-used-class': item.isMax ? 'has-lab' : '',              //是否为使用最多的，只能有一项。

                    };
                },
            },
        });


        panel.$on('click', {
            'li[data-index]': function (event) {
                var no = +this.getAttribute('data-no');
                var index = +this.getAttribute('data-index');
                var group = list[no];
                var item = group.accounts[index];


                panel.$.find(`li[data-index]`).removeClass('on'); //先移除上一次高亮的。
                $(this).addClass('on');

                panel.fire('item', [item]);
            },
        });
    });


   



    /**
    */
    panel.on('render', function (companys) {

        list = companys;

        panel.fill({
            'groups': list,
        });


    });




});