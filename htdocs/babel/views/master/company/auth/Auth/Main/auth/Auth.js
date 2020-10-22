/*
* babel time: 2020-10-19 16:41:38
*
* source md5: DA7B3DA81E77F4129846AE2F8405E280
*
* source file: htdocs/views/master/company/auth/Auth/Main/auth/Auth.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/*
* 认证信息。
*/
KISP.panel('/Auth/Main/Auth', function (require, module, panel) {

    var Type = module.require('Type'); //企业类型。
    var License = module.require('License'); //营业执照。


    panel.on('init', function () {

        Type.on({
            'change': function change(item) {
                License.render(item.value);
            }
        });
    });

    panel.on('render', function () {

        Type.render();
        License.render();
    });

    return {
        get: function get() {
            var type = Type.get();
            var license = License.get();

            return [{ key: 'type', value: type }].concat(_toConsumableArray(license));
        },
        setCode: License.setCode
    };
});