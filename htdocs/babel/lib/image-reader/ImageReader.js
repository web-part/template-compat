/*
* babel time: 2020-10-19 16:42:31
*
* source md5: 49D1F8D9973E1A8FC47A6F4A2D179077
*
* source file: htdocs/lib/image-reader/ImageReader.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

/**
* 本地图片读取器。
*/
define('ImageReader', function (require, module, exports) {
    var Emitter = KISP.require('Emitter');
    var Loading = KISP.require('Loading');

    var mapper = new Map();

    function ImageReader(input) {
        var emitter = new Emitter(this);
        var loading = new Loading({
            text: '读取中...'
        });

        var meta = {
            'emitter': emitter,
            'input': input,
            'loading': loading,
            '$': null,
            'this': this
        };

        mapper.set(this, meta);
    }

    ImageReader.prototype = /**@lends ImageReader*/{
        constructor: ImageReader,

        $: null,

        /**
        * 渲染。
        */
        render: function render() {
            var meta = mapper.get(this);

            if (meta.$) {
                return;
            }

            meta.$ = this.$ = $(meta.input);

            meta.$.on('change', function (event) {
                var input = this; //这样是安全的，因为外面传进来的可能是一个 jQuery 选择器。
                var img = input.files[0];

                //第一次选择了，但第二次未选择时，为空。
                if (!img) {
                    meta.emitter.fire('cancel');
                    return;
                }

                var type = img.type;

                if (type.indexOf('image/') != 0) {
                    var code = 201;
                    var msg = '所选择的文件类型不是图片';
                    var data = { 'img': img };

                    meta.emitter.fire('fail', [code, msg, data]);
                    return;
                }

                var reader = new FileReader();

                reader.onload = function (e) {
                    var data = e.target.result;

                    meta.loading.hide();
                    meta.emitter.fire('success', [data]);
                };

                meta.loading.show();
                reader.readAsDataURL(img);
            });
        },

        /**
        * 绑定事件。
        */
        on: function on() {
            var _meta$emitter;

            var meta = mapper.get(this);
            (_meta$emitter = meta.emitter).on.apply(_meta$emitter, arguments);
        }

    };

    return ImageReader;
});