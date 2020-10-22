

KISP.panel('/Companys/Main/List', function (require, module, panel) {
    
    var User = require('User');


    var list = [];



    panel.on('init', function () {
        panel.template(function (item, index) {
            return {
                'index': index,
                'avatar': item.avatar || 'style/img/bk1.png',
                'name': item.name,
                'count': item.count,
                'status': item.status,
                'show': item.proNum ? '' : 'show',
            };
        });
    });


    panel.on('init', function () {

        panel.$on('click', {
            '[data-cmd]': function (event) {
                event.stopPropagation();

                var index = +this.getAttribute('data-index');
                var type = this.getAttribute('data-cmd');
                var item = list[index];

                panel.fire(type, [item]);
            },

            'li[data-index]': function (event) {
                var index = +this.getAttribute('data-index');
                var item = list[index];

                panel.fire('item', [item]);
            },

        });

    });



    /**
    */
    panel.on('render', function (items) {



        list = items;
        panel.fill(list);
        var userInfo = User.get();
        if (userInfo) {
            panel.$.find('[data-type="0"]').addClass('on');
            return;
        }
        panel.$.find('[data-type="0"]').removeClass('on');



    });




});