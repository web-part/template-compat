
/*
* 弹出消息对话框。
*/
KISP.panel('/Message', function (require, module, panel) {
    var API = module.require('API');


    var meta = {
        item: null,
        pop: true, //是否弹出消息。
    };

    panel.on('init', function () {
        panel.set('show', false);   //不要在 render() 后自动显示。 改成手动控制显示。

        panel.$on('click', {
            '[data-cmd="close"]': function (event) {
                panel.hide();
            },

            '[data-cmd="detail"]': function (event) {
                panel.hide();
                panel.fire('detail', [meta.item]);
            },
        });


        API.on('success', {
            'get': function (count, item) {

                //指定了要弹出，并且有消息。
                if (meta.pop && item) {
                    meta.item = item;

                    panel.fill({
                        'title': item.title,
                    });

                    panel.show();
                }
               

                panel.fire('get', [count]);

            },
        });
    });


    panel.on('render', function () {
      
        meta.pop = true;

        API.get();
        

    });


    return {
        /**
        * 仅获取最新的未读消息条数。
        */
        getCount: function () {
            meta.pop = false;
            API.get();
        },
    };



});



