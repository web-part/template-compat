
/*
* 
*/
KISP.panel('/AccountBaks/Manual/Header/THeader', function (require, module, panel) {

    var meta = {
        list: [],           //外面传进来的总列表数据。
        checked: false,     //是否全选。
    };


    panel.on('init', function () {
        panel.template().fix('disabled');

        panel.$on('click', {
            '[data-cmd="check-all"]': function () {
                var checked = meta.checked = !meta.checked;
                var list = meta.list;
                var count = checked ? list.length : 0;


                $(this).toggleClass('on', checked);
                panel.fire('check', [checked]);
                panel.render(list, count);

            },

            '[data-cmd="delete"]': function () {
                panel.fire('delete');
            },
        });
    });


    panel.on('render', function (list, count) {
        list = meta.list = list || [];
        count = count || 0;
        meta.checked = count > 0 && count == list.length;

        panel.fill({
            'disabled': count > 0 ? '' : 'disabled',
            'count': count > 0 ? ` (${count})` : '',
            'checked': meta.checked ? 'on' : '',        //是否全部选中。
            'delete-title': count > 0 ? `已选中 ${count} 项` : '未选中任何项，禁止操作',
        });
    });



    return {

    };


});



