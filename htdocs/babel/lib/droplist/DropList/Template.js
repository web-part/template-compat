/*
* babel time: 2020-10-19 16:42:31
*
* source md5: 233E78C3B4612FD92F0D7E5DC36011E3
*
* source file: htdocs/lib/droplist/DropList/Template.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

define('DropList/Template', function (require, module) {

    var $ = require('$');
    var Template = KISP.require('Template');
    var $Array = KISP.require('Array');
    var $String = KISP.require('String');

    return {

        create: function create(meta) {

            var tpl = new Template('#tpl-DropList');

            tpl.process({
                '': function _() {

                    //因为原 html 中的 sample 给处理后 没有等号的属性值会给替换成有空值的属性值。
                    //如 {readonly} 会给替换成 {readonly}=""，这不是我们想要的。
                    //这里我们手动替换回来。
                    this.fix(['maxlength', 'readonly', 'disabled', 'tabIndex']);

                    var tabIndex = meta.tabIndex;
                    var maxLength = meta.maxLength;

                    tabIndex = tabIndex ? 'tabindex="' + tabIndex + '"' : '';
                    maxLength = maxLength ? 'maxlength="' + meta.maxLength + '"' : '';

                    return {
                        'txtId': meta.txtId,
                        'tableId': meta.tableId,
                        'text': meta.text,
                        'readonly': meta.readonly ? 'readonly' : '',
                        'disabled': meta.disabled ? 'disabled' : '',

                        'tabindex': tabIndex,
                        'maxlength': maxLength

                    };
                }

            });

            return tpl;
        }
    };
});