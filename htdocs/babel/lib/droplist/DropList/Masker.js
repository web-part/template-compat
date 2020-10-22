/*
* babel time: 2020-10-19 16:42:31
*
* source md5: 19B7E5820D09AE21428614BAEDA5C547
*
* source file: htdocs/lib/droplist/DropList/Masker.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

define('DropList/Masker', function (require, module, exports) {
                    var KISP = require('KISP');
                    var $ = require('$');

                    return {
                                        create: function create(meta) {

                                                            var masker = KISP.create('Mask', {
                                                                                'volatile': true, //易消失。
                                                                                'opacity': meta.mask,
                                                                                'container': meta.dialog,
                                                                                'position': 'absolute', //这里用回绝对定位。
                                                                                'z-index': 1022
                                                            });

                                                            masker.on({
                                                                                'show': function show() {
                                                                                                    meta.$.addClass('on');
                                                                                                    meta.visible = true;

                                                                                                    meta.adjust();
                                                                                                    meta.$table.get(0).scrollIntoViewIfNeeded(); //在对话框环境中，可能会给遮挡住了。

                                                                                                    var row = meta.current.row;
                                                                                                    row && row.element.scrollIntoViewIfNeeded();

                                                                                                    meta.emitter.fire('focus');
                                                                                },

                                                                                'hide': function hide() {
                                                                                                    var item = meta.old.item;
                                                                                                    var isEmpty = meta.txt.value === '';

                                                                                                    if (isEmpty && !meta.empty && item) {
                                                                                                                        meta.this.fill(meta.list);
                                                                                                                        meta.this.select(item);
                                                                                                    }

                                                                                                    //是否非法的: true 表示非法。 false 表示合法。
                                                                                                    var invalid = !meta.custom && //不允许自定义输入。
                                                                                                    !meta.current.item && //尚未选中任何项。
                                                                                                    !!meta.text; //输入框中有内容。


                                                                                                    if (invalid) {
                                                                                                                        meta.$txt.addClass('error');

                                                                                                                        KISP.alert('输入的数据不存在，请重新输入。', function () {
                                                                                                                                            meta.txt.focus();
                                                                                                                        });
                                                                                                                        return false; //返回 false 阻止 masker 关闭。
                                                                                                    }

                                                                                                    meta.$.removeClass('on');
                                                                                                    meta.visible = false;
                                                                                                    meta.emitter.fire('blur');

                                                                                                    //if (invalid) {
                                                                                                    //    meta.$txt.addClass('error');
                                                                                                    //    meta.txt.focus();
                                                                                                    //    //meta.emitter.fire('error', ['custom', '输入的数据不存在，请重新输入。']);


                                                                                                    //    setTimeout(function () {
                                                                                                    //        meta.txt.focus();
                                                                                                    //    }, 100);

                                                                                                    //    //KISP.alert('输入的数据不存在，请重新输入。', function () {
                                                                                                    //    //    meta.txt.focus();

                                                                                                    //    //});
                                                                                                    //}
                                                                                }

                                                            });

                                                            return masker;
                                        }

                    };
});