/*
* babel time: 2020-10-19 16:41:37
*
* source md5: ED516DF7AA58E0A5B0CF20901FFD2D27
*
* source file: htdocs/views/master/account/list/Accounts/dialog/delete/Delete.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

/*
* 删除账套对话框。
*/
KISP.panel('/Accounts/Delete', function (require, module, panel) {

    var Content = module.require('Content');
    var Footer = module.require('Footer');
    var API = module.require('API');

    var Dialog = require('Dialog');
    var dialog = null;

    var meta = {
        company: null,
        account: null
    };

    panel.on('init', function () {

        dialog = Dialog.panel({
            'title': '删除账套',
            'width': 400,
            //'height': 416,
            'z-index': 1023,
            'resizable': false,

            'container': panel,
            'content': Content,
            'footer': Footer
        });

        dialog.on({
            'render': function render(data) {
                Content.render();
                Footer.render();

                //获取手机号。
                API.get({
                    'company': meta.company
                });
            }
        });

        API.on('success', {
            //手机号获取成功。
            'get': function get(data) {
                Content.render(data);
            },
            //删除账套成功。
            'delete': function _delete() {

                dialog.close();
                panel.fire('success');
            },
            //验证码发送成功。
            'send': function send() {
                Content.countdown();
            }
        });

        API.on('fail', {
            //手机号获取失败。
            'get': function get(data) {
                dialog.close();
            },
            //删除账套失败。
            'delete': function _delete() {
                //清空验证码。
                Content.empty();
            }
        });

        Content.on({
            //发送验证码。
            'send': function send() {
                API.send({
                    'company': meta.company,
                    'account': meta.account,
                    'type': 1
                });
            }
        });

        Footer.on({
            //确认删除。
            'ok': function ok() {
                var form = Content.get();

                form && API.delete({
                    'company': meta.company,
                    'account': meta.account,
                    'form': form
                });
            },

            'cancel': function cancel() {
                dialog.close();
            }
        });
    });

    /**
    *   data = {
    *       company: {},    //企业信息。
    *       account: {},    //账套信息。
    *   };
    */
    panel.on('render', function (data) {

        meta = data;
        dialog.render(data);
    });

    return {
        'delete': function _delete(item) {
            //提供方法直接删除账套，无需验证码
            API.delete(item);
        }
    };
});