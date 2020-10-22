/*
* babel time: 2020-10-19 16:41:38
*
* source md5: 0FD5120B98EE67029DDF6FA9ED50D5F4
*
* source file: htdocs/views/master/application/user/ApplicationUsers/dialog/selector/Selector/Content/Search.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

KISP.panel('/ApplicationUsers/Selector/Content/Search', function (require, module, panel) {

    panel.on('init', function () {

        //针对中文输入法，为 true 表示正在输入而未选中汉字。
        var compositing = false;

        function change(txt) {
            var value = panel.$.find('[data-type="txt"]').val();

            panel.fire('change', [value]);
        }

        panel.$.find('[data-type="txt"]').on({
            'keypress': function keypress() {
                if (event.keyCode === 13) {
                    change();
                }
            }
        });
        panel.$.find('[data-type="search-icon"]').on({
            'click': function click() {
                change(this);
            }

        });
    });

    /**
    * 
    */
    panel.on('render', function (para) {
        panel.$.find('[data-type="txt"]').val(para.phone);
    });
});