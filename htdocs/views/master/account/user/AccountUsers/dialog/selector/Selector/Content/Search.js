

KISP.panel('/AccountUsers/Selector/Content/Search', function (require, module, panel) {

    panel.on('init', function () {

        //针对中文输入法，为 true 表示正在输入而未选中汉字。
        var compositing = false;

        function change(txt) {
            var value = panel.$.find('[data-type="txt"]').val();

            panel.fire('change', [value]);
        }

        panel.$.find('[data-type="txt"]').on({
            'keypress': function () {
                if (event.keyCode === 13) {
                    change();
                }
            }
        });
        panel.$.find('[data-type="search-icon"]').on({
            'click': function () {
                change(this);
            },

        });




    });


    /**
    * 
    */
    panel.on('render', function (para) {
        panel.$.find('[data-type="txt"]').val(para.phone);
    });


});