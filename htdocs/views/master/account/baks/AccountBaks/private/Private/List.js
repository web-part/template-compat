

KISP.panel('/AccountBaks/Private/List', function (require, module, panel) {
    

    var list = [];


    panel.on('init', function () {

        panel.template({
            '': function (data) {
                var table = this.fill('table', data);

                return {
                    'table': table,
                };
            },

            'table': {
                '': function (data) {
                    var rows = this.fill('row', data.items, data.isPublic);

                    return {
                        'rows': rows,
                    };
                },

                'row': {
                    '': function (item, index, isPublic) {

                        return {
                            'index': index,
                            'name': item.name,
                            'size': item.size,
                            'datetime': item.datetime,
                        };
                    },

                    'refresh': function (item, index) {
                        return item.status == 0 ? {
                            'index': index,
                        } : '';
                    },
                },
            },
        });

     
    });



    panel.on('init', function () {


        panel.$on('click', {
            '[data-cmd]': function () {
                var cmd = this.getAttribute('data-cmd');
                var index = +this.getAttribute('data-index');
                var item = list[index];

                //禁用的，禁止下载。
                if ($(this).hasClass('forbid')) {
                    return;
                }

                panel.fire(cmd, [item, index]);

            },

            

        });
    });





    /**
    *   items = [
    *       { },
    *   ];
    */
    panel.on('render', function (items) {
        list = items;

        panel.fill({
            'items': items,
        });

        panel.$.toggleClass('no-data', !items.length);

    });


    return {
       
    };



});