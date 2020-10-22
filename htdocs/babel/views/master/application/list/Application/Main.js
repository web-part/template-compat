/*
* babel time: 2020-10-19 16:41:37
*
* source md5: 6D66FB10FA846721150F7922589E4533
*
* source file: htdocs/views/master/application/list/Application/Main.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

/*
* 
*/
KISP.panel('/Application/Main', function (require, module, panel) {
    var KISP = require('KISP');
    var API = module.require('API');
    var List = module.require('List');
    var Header = module.require('Header');
    var News = module.require('News');

    var meta = {
        company: null,
        product: null
    };

    panel.on('init', function () {

        List.on({
            'cmd': {
                '': function _(cmd, item) {
                    panel.fire(cmd, [item]);
                },
                'refresh': function refresh() {
                    API.get(meta);
                },
                'free-test': function freeTest(item) {
                    //免费试用
                    if (meta.product.status === 0) {
                        return KISP.alert('请先试用主产品后再进行副产品试用');
                    }
                    API.test({
                        'slv_icrm_id': item.origin.slv_icrm_id, //应用产品id
                        'slv_prod_id': item.origin.slv_prod_id, //产品添加ID
                        'tid': meta.company.origin.tid, //企业id。
                        'prod_id': meta.product.origin.prod_id //产品id。
                    });
                },
                'update': function update(item) {
                    //更新服务
                    API.update({
                        'meta': meta,
                        'item': item
                    });
                },
                'delete': function _delete(item) {
                    //删除应用
                    API.delete({
                        'slv_prod_id': item.origin.slv_prod_id, //产品添加ID
                        'tid': meta.company.origin.tid, //企业id。
                        'prod_id': meta.product.origin.prod_id //产品id。
                    });
                },
                'manage': function manage(item) {
                    //分享逍客应用管理
                    API.getUrl({
                        'tid': meta.company.origin.tid, //企业id。
                        'prod_id': meta.product.origin.prod_id //产品id。
                    });
                }
            }
        });

        API.on('success', {
            'get': function get(list) {
                Header.render();
                List.render(list, meta.product);
                News.render(list);
                panel.fire('get-list', [list]);
            },
            'get-wxlsuccess': function getWxlsuccess(data) {

                window.open(data.url, '_blank');
            },
            'get-success': function getSuccess(data) {
                window.open(data.url, '_blank');
            },
            //更新产品成功后/切换为私有云/启用公有云/修改产品名称后，需刷新列表。
            'refresh': function refresh() {
                API.get(meta);
            }
        });
        API.on({
            // 'update-fail': function (slvId, data) {  //暂时不弹框批量禁用用户
            //     panel.fire('update-fail', [slvId, data]);
            // },
            'update-fail': function updateFail(item) {
                panel.fire('add-users', [item]);
            }
        });
    });

    panel.on('render', function (data) {
        meta.company = data.company;
        meta.product = data.product;

        API.get(meta);
    });
    return {
        getwxlurl: function getwxlurl(meta) {
            API.getwxlUrl({
                'tid': meta.company.origin.tid, //企业id。
                'prod_id': meta.product.origin.prod_id, //产品id。
                'slv_prod_id': meta.application.origin.slv_prod_id, //产品添加ID
                'account_id': meta.acctitem.origin.account_id
            });
        }
    };
});