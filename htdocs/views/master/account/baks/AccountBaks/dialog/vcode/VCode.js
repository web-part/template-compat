
/*
* 短信验证码对话框。
*/
KISP.panel('/AccountBaks/VCode', function (require, module, panel) {
    var Content = module.require('Content');
    var Footer = module.require('Footer');
    var API = module.require('API');
    var Dialog = require('Dialog');

    var dialog = null;

    var meta = {
        action: '',         //`delete` 或 `download` 。
        actionText: '',     //动作的描述文本，如 `删除` 或 `下载`。
        company: null,      //企业信息。
        account: null,      //账套信息。 针对单个操作时用到。

    };

    var action$text = {
        'delete': '删除',
        'download': '下载',
    };




    panel.on('init', function () {

        dialog = Dialog.panel({
            'width': 400,
            //'height': 416,
            'z-index': 1023,
            'resizable': false,

            'container': panel,
            'content': Content,
            'footer': Footer,
        });


        dialog.on({
            'render': function () {
                var action = meta.actionText;

                Content.render(action);
                Footer.render(action);


                //获取手机号。
                API.get(meta.company);
            },
        });



        API.on('success', {
            //手机号获取成功。
            'get': function (phone) {
                Content.set(phone);
            },

            //验证码发送成功。
            'send': function () {
                Content.countdown();
            },
        

        });



        API.on('fail', {
            //手机号获取失败。
            'get': function () {
                dialog.close();
            },

        });



        Content.on({
            //发送验证码。
            'send': function () {
                API.send({
                    'action': meta.action,
                    'company': meta.company,
                    'account': meta.account,
                });
            },
        });



        Footer.on({
            //确认提交。
            'ok': function () {
                var form = Content.get();
                if (!form) {
                    return;
                }

                panel.fire('submit', meta.action, [form]);
              
            },

            'cancel': function () {
                dialog.close();
            },
        });

    });


    /**
    * 参数：
    *   action: '',         //必选，`delete` 或 `download`。
    *   data = {
    *       company: {},    //必选，企业信息。
    *       account: {},    //可选，账套信息。 针对单个操作，需要提供。 如果是批量操作的，则无需提供。
    *       
    *   };
    */
    panel.on('render', function (action, data) {
        meta.action = action;
        meta.company = data.company;
        meta.account = data.account;
        meta.actionText = action$text[action];


        dialog.render();
        dialog.set('title', `${meta.actionText}账套备份文件`);

    });


    panel.on('hide', function () {
        dialog && dialog.close(); // dialog 有可能为空。
    });



    return {
        delete: function (company, account) {
            panel.render('delete', {
                'company': company,
                'account': account,
            });
        },

        download: function (company, account) {
            panel.render('download', {
                'company': company,
                'account': account,
            });
        },
    };

});





