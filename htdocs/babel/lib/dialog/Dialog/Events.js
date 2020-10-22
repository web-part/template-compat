/*
* babel time: 2020-10-19 16:42:31
*
* source md5: E852D6A8A5C6B20B908EE733863486D6
*
* source file: htdocs/lib/dialog/Dialog/Events.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

define('Dialog/Events', function (require, module, exports) {
    var KISP = require('KISP');
    var $ = require('$');

    return {
        bind: function bind(meta) {

            //响应回车键。
            var name$fn = {
                'keyup': function keyup(event) {
                    if (event.keyCode != 13 || !meta.visible) {
                        return;
                    }

                    event.stopPropagation();
                    meta.emitter.fire('enter', [event]);
                }
            };

            $(document.body).on(name$fn);
            $('#' + meta.id).on(name$fn);

            $('#' + meta.headerId).on('click', 'i', function () {
                meta.this.close();
            });

            $('#' + meta.footerId).on('click', 'button[data-index]', function () {
                var index = +this.getAttribute('data-index');
                var item = meta.footer.buttons[index];
                var name = item.name || String(index);

                meta.emitter.fire('button', name, [item, index]);
                meta.emitter.fire('button', [item, index]);

                // item.autoClosed 优先级高于 meta.autoClosed
                var autoClose = 'autoClose' in item ? item.autoClose : meta.autoClose;

                if (autoClose) {
                    meta.this.close(true);
                }
            });
        }

    };
});