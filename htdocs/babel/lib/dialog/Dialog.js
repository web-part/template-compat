/*
* babel time: 2020-10-19 16:42:31
*
* source md5: 1094292752CC452807B51C6265E6A15C
*
* source file: htdocs/lib/dialog/Dialog.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

define('Dialog', function (require, module, exports) {
    var KISP = require('KISP');
    var $ = require('$');
    var Defaults = require('Defaults');

    var Emitter = KISP.require('Emitter');
    var Mask = KISP.require('Mask');
    var Panel = KISP.require('Panel');

    var Meta = module.require('Meta');
    var Template = module.require('Template');
    var Drager = module.require('Drager');
    var Resizer = module.require('Resizer');
    var Style = module.require('Style');
    var Events = module.require('Events');

    var mapper = new Map();

    function Dialog(config) {

        config = Defaults.clone(module, config);

        var emitter = new Emitter(this);

        var meta = Meta.create(config, {
            'this': this,
            'emitter': emitter
        });

        mapper.set(this, meta);

        this.id = meta.id;
        this.$ = meta.$;
    }

    Dialog.prototype = {
        constructor: Dialog,

        id: '',
        $: null,

        render: function render(options) {
            options = options || {};

            var meta = mapper.get(this);
            var emitter = meta.emitter;

            //已渲染过。
            if (meta.rendered) {
                this.set(options);
                this.show();
                emitter.fire('render', [options]);
                return;
            }

            //首次渲染。
            var title = meta.title = options.title || meta.title;
            var content = meta.content = options.content || meta.content;
            var footer = meta.footer = options.footer || meta.footer;
            var style = Style.get(meta);
            var headerId = meta.headerId;

            var html = Template.fill({
                'id': meta.id,
                'headerId': headerId,
                'contentId': meta.contentId,
                'footerId': meta.footerId,
                'sizerId': meta.sizerId,
                'cssClass': meta.cssClass,
                'resizable': meta.resizable,
                'attributes': meta.attributes,
                'style': style,
                'title': title,
                'content': content,
                'footer': footer
            });

            $(document.body).prepend(html);
            meta.rendered = true; //更改状态。

            this.$ = meta.$ = $('#' + meta.id); //
            meta.$.toggleClass('auto-size', !meta.width || !meta.height);

            if (meta.mask) {
                meta.masker = new Mask({
                    'z-index': meta['z-index'] - 1,
                    'volatile': meta.mask.volatile //是否易消失。
                });

                //指定了易消失，则点击 masker 层后，关闭对话框。
                if (meta.mask.volatile) {
                    meta.masker.on('hide', function () {

                        //避免死循环。
                        if (!meta.fromClose) {
                            meta.this.close();
                        }

                        //重置一下。
                        meta.fromClose = false;
                    });
                }
            }

            if (meta.dragable) {
                Drager.set(headerId, meta);
            }

            if (meta.resizable) {
                Resizer.set(meta.id, meta);
            }

            Events.bind(meta);
            this.show();

            emitter.fire('first-render', [options]);
            emitter.fire('render', [options]);
        },

        /**
        * 显示本组件。
        */
        show: function show() {
            var meta = mapper.get(this);

            //尚未渲染或已是可见状态。
            if (!meta.rendered || meta.visible) {
                return;
            }

            var masker = meta.masker;
            if (masker) {
                var mask = Mask.normalize(meta.mask);
                masker.show(mask);
            }

            meta.$.show();
            meta.visible = true;
            meta.emitter.fire('show');
        },

        /**
        * 关闭本组件(仅隐藏)。
        */
        close: function close(sure) {
            var meta = mapper.get(this);

            //尚未渲染或已是隐藏状态。
            if (!meta.rendered || !meta.visible) {
                return;
            }

            var emitter = meta.emitter;
            var masker = meta.masker;

            if (!sure) {
                var values = emitter.fire('before-close');
                sure = values.slice(-1)[0];
                if (sure === false) {
                    //只有在事件中明确返回 false 才取消关闭。
                    return;
                }
            }

            meta.fromClose = true;

            if (masker) {
                masker.hide();
            }

            meta.$.hide();
            meta.visible = false;
            emitter.fire('close');
        },

        set: function set(key, value) {
            var data = (typeof key === 'undefined' ? 'undefined' : _typeof(key)) == 'object' ? key : _defineProperty({}, key, value);
            var meta = mapper.get(this);

            var key$tpl = {
                title: 'header',
                content: 'content',
                footer: 'footer'
            };

            for (key in data) {
                var tpl = key$tpl[key];

                if (tpl) {
                    var html = Template.fill(tpl, data);
                    var sid = meta[tpl + 'Id']; //headerId、contentId、footerId。

                    $('#' + sid).html(html);

                    continue;
                }

                switch (key) {
                    case 'width':
                    case 'height':
                        meta.$.css(key, value);
                        break;
                }
            }
        },

        on: function on(name, fn) {
            var meta = mapper.get(this);
            var emitter = meta.emitter;
            var args = Array.from(arguments);
            emitter.on(args);
        },

        destroy: function destroy() {
            var meta = mapper.get(this);

            //已销毁。
            if (!meta) {
                return;
            }

            meta.emitter.destroy();
            meta.masker.destroy();
            meta.$.off();

            var div = meta.$.get(0);
            div.parentNode.removeChild(div);

            Drager.remove(meta.headerId);
            Resizer.remove(meta.id);
        }
    };

    //静态方法。
    Object.assign(Dialog, {

        /**
        * 根据创建好的 panel 对应去填充对话框中相应的区域，同时会保留原 panel 中原有的逻辑和事件等。
        * 以使用户可以以熟悉的模块化方式去操纵对话框中的内容， 如模板填充、事件绑定等。
        *   options = {
        *       content: panel,
        *       container: panel,
        *       footer: panel,
        *       
        *   };
        */
        panel: function panel(options) {
            var Content = options.content;
            var Container = options.container;
            var Footer = options.footer;

            var content = Content.$.get(0);
            var container = Container.$.get(0);
            var footer = Footer ? Footer.$.get(0) : null;

            var attributes = {};

            Array.from(container.attributes).map(function (item) {
                var name = item.name;
                if (name == 'class') {
                    return true;
                }

                attributes[name] = item.value;
                return true;
            });

            var config = Object.assign({}, options, {
                'content': content.outerHTML,
                'cssClass': container.className,
                'attributes': attributes
            });

            if (footer) {
                config['footer'] = footer.outerHTML;
            }

            var dialog = new Dialog(config);

            dialog.on({
                'first-render': function firstRender() {
                    //删除 panel 中对应原先的 DOM 节点，
                    container.parentNode.removeChild(container);
                    content.parentNode.removeChild(content);
                    footer && footer.parentNode.removeChild(footer);

                    //重新绑定到对应原 Panel 中。
                    Container.set('$');

                    var moduleId = container.getAttribute('data-panel');
                    var selector = '[data-panel^="' + moduleId + '"]';
                    var list = Container.$.find(selector).toArray();

                    list = list.map(function (item) {
                        return item.getAttribute('data-panel');
                    });

                    Panel.update(list);

                    container = null;
                    content = null;
                    footer = null;
                }
            });

            return dialog;
        }
    });

    return Dialog;
});