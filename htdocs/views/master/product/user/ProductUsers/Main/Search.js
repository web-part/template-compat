

KISP.panel('/ProductUsers/Main/Search', function (require, module, panel) {
    

    var meta = {
        list: [],   //外面传进来的列表数据，进行内部搜索。
    };




    panel.on('init', function () {
        var keys = ['phone', 'name', 'account', 'product', ];

        function search(keyword) {
            if (!keyword) {
                panel.fire('submit', [meta.list, '']);
            }


            var items = meta.list.filter(function (item) {
                var found = keys.some(function (key) {
                    var value = item[key];
                    if (typeof value != 'string') {
                        return;
                    }

                    return value.includes(keyword);
                });

                return found;
            });

            panel.fire('submit', [items, keyword]);
        }




        panel.$bind('input', {
            'input': function (event) {
                var keyword = panel.$.find('input').val();
                search(keyword);
            },
        });

        panel.$on('click', {
            '[data-cmd="submit"]': function () {
                var keyword = panel.$.find('input').val();
              
                search(keyword);
            },

        });


    });


   



    /**
    * 
    */
    panel.on('render', function (list) {

        meta.list = list;

    });




    return {
        
    };




});