/*
* babel time: 2020-10-19 16:42:31
*
* source md5: 93A81D6B29A9DC1F364D0B2391904948
*
* source file: htdocs/lib/datepicker/DateTimePicker.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

/**
* 日期时间选择器类。
*/
define('DateTimePicker', function (require, module, exports) {

    var $ = require('$');
    var KISP = require('KISP');
    var $Object = KISP.require('Object');
    var Emitter = KISP.require('Emitter');
    var $String = KISP.require('String');
    var Defaults = require('Defaults');

    var mapper = new Map();

    //调用原始控件的方法
    function invoke(self, name, $argumetns) {
        var args = Array.from($argumetns);
        var meta = mapper.get(self);
        var $this = meta.$;

        args = [name].concat(args);

        return $this.datetimepicker.apply($this, args);
    }

    /**
    * 构造函数。
    */
    function DateTimePicker(selector, config) {

        // 重载 NumberField( config )
        if ($Object.isPlain(selector)) {
            config = selector;
            selector = config.selector;
            delete config.selector; //删除，避免对原始造成不可知的副作用
        }

        config = Defaults.clone(module, config);

        var options = Object.assign({}, config);
        var emitter = new Emitter(this);
        var id = $String.random();

        var meta = {
            'id': id,
            '$': null,
            'txt': null,
            'emitter': emitter,
            'selector': selector,
            'options': options,
            'disabled': false,
            'this': this
        };

        mapper.set(this, meta);
    }

    DateTimePicker.prototype = { //实例方法
        constructor: DateTimePicker,

        id: '',
        $: null,

        render: function render(options) {
            var meta = mapper.get(this);
            var emitter = meta.emitter;
            var self = this;

            meta.$ = this.$ = $(meta.selector);
            meta.txt = meta.$.get(0);

            meta.$.datetimepicker(meta.options);

            meta.$.on({
                'focus': function focus() {
                    this.select();
                },
                'change': function change() {
                    var value = this.value;
                    meta.value = value;
                    console.log(value);

                    emitter.fire('change', [value]);
                },
                'click': function click() {
                    meta.this.show();
                }
            });

            if (options) {
                var value = options.value;
                value && meta.$.val(value);
            }
        },

        on: function on(name, fn) {
            var _meta$emitter;

            var meta = mapper.get(this);
            (_meta$emitter = meta.emitter).on.apply(_meta$emitter, arguments);
        },

        remove: function remove() {
            invoke(this, 'remove', arguments);
        },

        show: function show() {
            invoke(this, 'show', arguments);
        },

        hide: function hide() {
            invoke(this, 'hide', arguments);
        },

        update: function update() {
            invoke(this, 'update', arguments);
        },

        setStartDate: function setStartDate() {
            invoke(this, 'setStartDate', arguments);
        },

        setEndDate: function setEndDate() {
            invoke(this, 'setEndDate', arguments);
        },

        setDaysOfWeekDisabled: function setDaysOfWeekDisabled() {
            invoke(this, 'setDaysOfWeekDisabled', arguments);
        },

        destroy: function destroy() {
            var meta = mapper.get(this);

            //已销毁。
            if (!meta) {
                return;
            }

            meta.emitter.destroy();
            meta.$.off();

            mapper.delete(this);
        },

        set: function set(key, value) {
            var meta = mapper.get(this);
            var txt = meta.txt;

            switch (key) {
                case 'disabled':
                    value = !!value;
                    meta.disabled = value;
                    txt.disabled = value;
                    break;
                case 'value':
                    meta.$.val(value);
                    break;
            }
        },

        get: function get(key) {
            var meta = mapper.get(this);

            switch (key) {
                case 'disabled':
                    return meta[key];
            }
        }
    };

    return DateTimePicker;
});