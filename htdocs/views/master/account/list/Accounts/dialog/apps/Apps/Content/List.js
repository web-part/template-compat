

KISP.panel('/Accounts/Apps/Content/List', function (require, module, panel) {
    var KISP = require('KISP');

    var list = [];



    panel.on('init', function () {

        //后台使用的图标对应于前端使用 css 类名。
        var icon$class = {
            'SM': 'sm',             //商贸版。
            'PRO': 'zy',            //专业版。
            'UE': 'qj',             //旗舰版。
            'kisyjxc': 'jxc',       //kis 云进销存。
            'kisfxiaoke': 'share',  //纷享销客。
            'JGJ': 'jgj',           //KIS 金管家。 前端尚未提供。
        };


        panel.template(function (item, index) {
            return {
                'index': index,
                'name': item.name,
                'company': item.company,
                'show': item.company ? 'show' : '',
                'time': item.time,
                'icon-class': icon$class[item.icon],
            };
        });


        panel.$on('click', '[data-cmd="{value}"]', {
            'use': function () {
                var index = +this.getAttribute('data-index');
                var item = list[index];

                panel.fire('use', item.type, [item]);
            },
        });
    });





    /**
    * 
    */
    panel.on('render', function (items) {
        list = items;
        panel.fill(list);
    });




});