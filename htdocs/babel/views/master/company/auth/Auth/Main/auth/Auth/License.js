/*
* babel time: 2020-10-19 16:41:38
*
* source md5: CBCB53A28EBFD4C88B3D97C025015FA7
*
* source file: htdocs/views/master/company/auth/Auth/Main/auth/Auth/License.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

/*
* 营业执照。
*/
KISP.panel('/Auth/Main/Auth/License', function (require, module, panel) {

    var meta = {
        type: '0'
    };

    panel.on('init', function () {});

    panel.on('render', function (type) {

        //入参 type 必须为严格的字符串 '0'、'2' 或 '3'，或不传。
        meta.type = type;

        ['0', '2', '3'].forEach(function (item, index) {

            var M = module.require('Type' + item);

            if (type) {
                M.render(item == type); //切换显示。
            } else {
                M.reset(); //清空旧数据。
            }
        });
    });

    return {
        get: function get() {
            var M = module.require('Type' + meta.type);
            var value = M ? M.get() : [];

            return value;
        },
        setCode: function setCode(data) {
            var Type0 = module.require('Type0');
            Type0.setCode(data);
        }
    };
});