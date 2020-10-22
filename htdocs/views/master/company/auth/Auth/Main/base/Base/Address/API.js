
define('/Auth/Main/Base/Address/API', function (require, module, exports) {
    var $ = require('$');
    var KISP = require('KISP');
    var API = require('API');
    var Emitter = KISP.require('Emitter');

    var emitter = new Emitter();



    //把一维的线性结构数组，转换成树型结构的数组。
    //具体就是把省、市、区按树型结构建立关系。
    function toTree(list) {

        var roots = [];
        var id$node = {};

        //以 id 为主键建立起节点关系。
        list.forEach(function (item) {
            var id = item.code;

            id$node[id] = {
                'id': id,
                'name': item.name,
                'item': item,
                'children': [],
                'parent': null,
            };
        });

        //归类到相应的子列表和父节点中。
        list.forEach(function (item) {
            var node = id$node[item.code];
            var parent = id$node[item.pcode];

            if (!parent) {
                roots.push(node);
                return;
            }

            parent.children.push(node);
            node.parent = parent;

        });
        return roots;
    }




    return {
        'on': emitter.on.bind(emitter),

        get: function (data) {
            // var api = new API('xxx', {
            //     proxy: 'auth/address.js',
            // });

            var api = new API('web/product/get_district_data', {
                proxy: true,
            });


            api.on({
                'success': function (data, json, xhr) {
                    var list = data || [];
                    // var trees = toTree(list);

                    emitter.fire('success', [list]);

                },

                'fail': function (code, msg, json) {
                    KISP.alert('获取地址列表失败: {0}', msg);
                },

                'error': function () {
                    KISP.alert('获取地址列表错误: 网络繁忙，请稍候再试');
                },
            });


            api.post();

        },


    };


});