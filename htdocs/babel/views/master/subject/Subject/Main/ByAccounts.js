/*
* babel time: 2020-10-19 16:41:38
*
* source md5: 30958AC2F3EB414F5BB66C7AE97A0394
*
* source file: htdocs/views/master/subject/Subject/Main/ByAccounts.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

KISP.panel('/Subject/Main/ByAccounts', function (require, module, panel) {
    var KISP = require('KISP');
    var list = [];

    panel.on('init', function () {
        panel.set('template', panel.$.find('[data-id="list"]'));

        panel.template(function (item, index) {
            var account = item.account;
            var company = item.company;

            return {
                'index': index,
                'account': account['acctname'],
                'product': account['productname'],
                'company': company['name'],

                'expire-class': account['expire'] == 'Y' ? 'expire' : '', //是否已过期。
                'recent-used-class': account['recent'] == 'Y' ? 'on' : '', //是否为最近使用的，只能有一项。
                'max-used-class': item.isMax ? 'has-lab' : '' //是否为使用最多的，只能有一项。
            };
        });

        panel.$on('click', {
            'li[data-index]': function liDataIndex(event) {
                var index = +this.getAttribute('data-index');
                var item = list[index];

                panel.$.find('li[data-index]').removeClass('on'); //先移除上一次高亮的。
                $(this).addClass('on');

                panel.fire('item', [item]);
            }
        });
    });

    /**
    */
    panel.on('render', function (accounts) {

        list = accounts;
        panel.fill(list);
    });
});