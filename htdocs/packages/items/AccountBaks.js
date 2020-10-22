

define('/AccountBaks/Auto/List/Remark', function (require, module, exports) {
    


    return {
        process: function (str) {
            if (!str) {
                return '';
            }


            var remark = '';
            var remarkNum = str.length / 24;

            if (str && str.length > 24) {
                for (var i = 0; i < remarkNum; i++) {
                    remark = remark + str.slice(i * 24, (i + 1) * 24) + '&#10;';
                }
                if (str.length % 24 > 0) {
                    remark = remark + str.slice(remarkNum * 24, str.length);
                }

            }
            else {
                remark = str;
            }

            return remark;
        },
    };




});

define('/AccountBaks/Auto/API', function (require, module, exports) {
    var $ = require('$');
    var KISP = require('KISP');
    var API = require('API');
    var Emitter = KISP.require('Emitter');

    var emitter = new Emitter();

    var loading = KISP.create('Loading', {
        mask: 0,
    });


    return {
        'on': emitter.on.bind(emitter),

        /**
        * 获取公有云账套备份列表。
        *   opt = {
        *       company: {},    //企业信息。
        *       product: {},    //产品信息。
        *   };
        */
        get: function (opt) {


            var api = new API('web/product/get_account_auto_back_up_list', {
                'proxy': true,
            });


            api.on({
                'request': function () {
                    loading.show('获取中...');
                },

                'response': function () {
                    loading.hide();
                },

                'success': function (data, json, xhr) {

                    var list = data || [];


                    list = list.map(function (item) {
                        return {
                            'name': item['name'],       //账套名字
                            // 'number': item['account_num'],      //账套号。
                            'size': item['size'],               //账套大小，单位M
                            'datetime': item['create_time'],    //备份时间
                            'status': item['status'],           //备份状态，0为正在备份，1为备份完成，2备份异常，备份失败
                            'type': item['type'],               //备份类型：1为自动备份，2为人工备份 
                            // 'remark': item['remark'],           //备份失败原因 
                            'sqlVersion': item['sql_version'],  //数据库版本。
                            // 'checked': false,                   //用于多选里的批量操作。
                            'origin': item,
                        };
                    });

                    ////test only-------------------------------
                    //var item = list[0];
                    //if (item) {
                    //    item = JSON.stringify(list[0]);
                    //    list = [
                    //       JSON.parse(item),
                    //       JSON.parse(item),
                    //       JSON.parse(item),
                    //       JSON.parse(item),
                    //    ];
                    //}

                   

                    emitter.fire('success', 'get', [list]);

                },

                'fail': function (code, msg, json) {
                    KISP.alert('获取公有云账套备份列表失败: {0}(错误码: {1})', msg, code);
                },

                'error': function () {
                    KISP.alert('获取公有云账套备份列表错误: 网络繁忙，请稍候再试');
                },
            });


            api.post({
                'tid': opt.company.origin['tid'],   //企业 id。
                'pid': opt.product.origin['pid'],   //产品实例ID。
            });

        },



    };


});

/*
* 
*/
KISP.panel('/AccountBaks/Auto/Header', function (require, module, panel) {

    panel.on('init', function () {
        //跟据需求无删除，下载等操作

    });


    panel.on('render', function (list, count) {

    });



    return {

    };


});






KISP.panel('/AccountBaks/Auto/List', function (require, module, panel) {
    var $ = require('$');
    var Remark = module.require('Remark');

    var list = [];


    panel.on('init', function () {
        var status$item = {
            0: { text: '正在备份', class: 'default', },
            1: { text: '备份完成', class: 'default', },
            2: { text: '备份失败', class: 'warning', },
            default: { text: '(未定义)', class: 'warning', },
        };



        panel.template({
            '': function (data) {
                var table = this.fill('table', data);

                return {
                    'table': table,
                };
            },

            'table': {
                '': function (data) {
                    var rows = this.fill('row', data.items);

                    return {
                        'rows': rows,
                    };
                },

                'row': {
                    '': function (item, index) {
                        var status = item.status;
                        var statusItem = status$item[status] || status$item['default'];
                        var refresh = this.fill('refresh', item, index);
                        var remark = Remark.process(item.remark);


                        return {//公有云。
                            'index': index,
                            'name': item.name,
                            'size': item.size,
                            'datetime': item.datetime,
                            'status': status,
                            'status-text': statusItem.text,
                            'status-text-class': statusItem.class,
                            'sqlVersion': item.sqlVersion,
                            'remark': remark || '',
                            'download-class': status == 1 ? 'primary' : 'forbid',   //只有备份成功的，才允许下载。
                            'delete-class': status == 0 ? 'forbid' : 'normal',      //只有正在备份的，才禁止删除。
                            'refresh': refresh,
                        };


                    },

                    'refresh': function (item, index) {
                        return item.status == 0 ? {
                            'index': index,

                        } : '';
                    },
                },
            },
        });


    });



    panel.on('init', function () {


        // panel.$on('click', {
        //     '[data-cmd]': function () {
        //         var cmd = this.getAttribute('data-cmd');
        //         var index = +this.getAttribute('data-index');
        //         var item = list[index];

        //         //如果给选中了，则交给批量操作，而行内的操作则禁用。
        //         var disabled = item.checked || $(this).hasClass('forbid') || list.some(function (item) {
        //             return item.checked;
        //         });


        //         if (disabled) {
        //             return;
        //         }

        //         panel.fire(cmd, [item, index]);

        //     },

        //     '[data-cmd="check"]': function () {
        //         var index = +this.getAttribute('data-index');
        //         var item = list[index];
        //         var checked = item.checked = !item.checked;

        //         //过滤出选中的项。
        //         var checks = list.filter(function (item) {
        //             return !!item.checked;
        //         });

        //         var count = checks.length;



        //         $(this).toggleClass('on', checked);
        //         panel.$.toggleClass('checked', count > 0);

        //         panel.fire('check', [list, count]);

        //     },

        // });
    });





    /**
    *   items = [
    *       { },
    *   ];
    */
    panel.on('render', function (items) {
        list = items;

        panel.fill({
            'items': items,
        });

        panel.$.toggleClass('no-data', !items.length);
        // panel.$.removeClass('checked'); //移除之前可能存在的，比如翻页重新填充后，需要移除上一页的选中状态。

    });


    return {
        // checkAll: function (checked) {
        //     panel.$.find('[data-cmd="check"]').toggleClass('on', checked);
        //     panel.$.toggleClass('checked', checked);

        //     list.forEach(function (item, index) {
        //         item.checked = checked;
        //     });
        // },

        // getChecks: function () {
        //     var items = list.filter(function (item, index) {
        //         return !!item.checked;
        //     })

        //     return items;
        // },
    };




});

/*
* 
*/
KISP.panel('/AccountBaks/Auto', function (require, module, panel) {
    var KISP = require('KISP');
    var API = module.require('API');
    var List = module.require('List');
    var Header = module.require('Header');
    var meta = {
        company: null,
        product: null,
        cache: false,       //指示是否为缓存数据。 如果是，则不请求后台。
    };


    panel.on('init', function () {

        Header.on({
            
        });





        List.on({

            'download': function (item) {
                panel.fire('download', [item]);
            },

            'delete': function (item) {
                panel.fire('delete', 'item', [item]);

            },

            'refresh': function (item, index) {
                API.get(meta);

            },
        });



        API.on('success', {
            'get': function (list) {
                meta.cache = true; //指示拿到了数据，下次直接使用缓存。
                Header.render();
                List.render(list);
            },

        });


    });

    /**
    * 渲染。
    *   data = {
    *       company: {},    //企业信息。
    *       product: {},    //产品信息。
    *   };
    */
    panel.on('render', function (data) {
        //已经缓存过了。
        if (meta.cache) {
            return;
        }

       

        //否则，需要发起请求。
        meta.company = data.company;
        meta.product = data.product;

        API.get(meta);
    });


    return {
        reset: function () {
            meta.cache = false;
        },
    };


});








KISP.panel('/AccountBaks/Confirm/Content', function (require, module, panel) {


    panel.on('init', function () {


    });



    panel.on('render', function (data) {

        panel.fill({
            'action': data.action,
            'name': data.name,
        });

    });



});









KISP.panel('/AccountBaks/Confirm/Footer', function (require, module, panel) {


    panel.on('init', function () {

        panel.$on('click', {
            '[data-cmd]': function () {
                var cmd = this.getAttribute('data-cmd');
                panel.fire(cmd);
            },

        });

    });



    panel.on('render', function () {

    });


});







/*
* 删除账套确认对话框。
*/
KISP.panel('/AccountBaks/Confirm', function (require, module, panel) {
    var Content = module.require('Content');
    var Footer = module.require('Footer');
    var Dialog = require('Dialog');

    var dialog = null;

    var meta = {
        action: '',     //动作类型，`delete` 或 `download`。
        account: null,  //账套信息。
    };

    var action$text = {
        'delete': '删除',
        'download': '下载',
    };

    panel.on('init', function () {

        dialog = Dialog.panel({
            'width': 400,
            'z-index': 1023,
            'resizable': false,
            'container': panel,
            'content': Content,
            'footer': Footer,
        });


        dialog.on({
            'render': function () {

                Content.render({
                    'action': action$text[meta.action],
                    'name': meta.account.name,
                });

                Footer.render();
            },
        });

        Footer.on({
            'ok': function () {
                dialog.close();
                panel.fire(meta.action);
            },

            'cancel': function () {
                dialog.close();
            },
        });

    });

    /**
    * 
    *   action: '',     //动作类型，`delete` 或 `download`。
    *   account: {},    //账套备份信息。
    */
    panel.on('render', function (action, account) {
        meta.action = action;
        meta.account = account;

        dialog.render();
        dialog.set('title', `${action$text[action]}账套备份文件`);

    });



    return {
        delete: function (account) {
            panel.render('delete', account);
        },

        download: function (account) {
            panel.render('download', account);
        },
    };


});







define('/AccountBaks/VCode/API', function (require, module, exports) {
    var $ = require('$');
    var KISP = require('KISP');
    var API = require('API');
    var Emitter = KISP.require('Emitter');

    var emitter = new Emitter();

    var loading = KISP.create('Loading', {
        mask: 0,
    });

    var toast = KISP.create('Toast', {
        duration: 1500,
        mask: 0,
    });




    return {
        'on': emitter.on.bind(emitter),

        /**
        * 获取手机号。
        *   company: {},    //企业信息。
        */
        get: function (company) {
            var api = new API('web/user/get_enter_creator', {
                proxy: true,
            });

            api.on({
                'request': function () {
                    loading.show('号码获取中...');
                },

                'response': function () {
                    loading.hide();
                },

                'success': function (data, json, xhr) {

                    var phone = data.mobile;

                    emitter.fire('success', 'get', [phone]);
                },

                'fail': function (code, msg, json) {
                    KISP.alert('获取手机号失败: {0}', msg, function () {
                        emitter.fire('fail', 'get');
                    });

                },

                'error': function () {
                    KISP.alert('获取手机号错误: 网络繁忙，请稍候再试', function () {
                        emitter.fire('fail', 'get');
                    });
                },
            });

            api.post({
                'tid': company.origin['tid'],   //用户企业ID
            });
        },



        /**
        * 发送手机短信验证码。
        *   opt = {
        *       action: '',     //必选，`download` 或 `delete`。
        *       company: {},    //必选，企业信息。
        *       account: {},    //可选，账套信息。 针对单个操作，需要提供。 批量操作的，则无需提供。
        *   };
        */
        send: function (opt) {
            var api = new API('web/product/send_del_account_code', {
                proxy: true,
            });

            api.on({
                'request': function () {
                    loading.show('发送中...');
                },

                'response': function () {
                    loading.hide();
                },

                'success': function (data, json, xhr) {

                    toast.show('发送成功', function () {
                        emitter.fire('success', 'send', [data]);
                    });

                },

                'fail': function (code, msg, json) {
                    KISP.alert('短信验证码发送失败: {0}', msg);
                    emitter.fire('fail', 'send', []);

                },

                'error': function () {
                    KISP.alert('短信验证码发送错误: 网络繁忙，请稍候再试');
                },
            });



            var action$type = {
                'download': 2,
                'delete': 3,
            };

            var type = action$type[opt.action];
            var company = opt.company.origin;
            var account = opt.account;

            var params = {
                'type': type,
                'tid': company['tid'],      //用户企业ID
            };

            //针对单个的，则需要提供账套名给后台。
            if (account && !Array.isArray(account)) {
                params['account_name'] =
                    account.origin['account_name'] ||   //公有云的。
                    account.origin['back_name'];        //私有云的。
            }

            api.post(params);
        },



    };


});


KISP.panel('/AccountBaks/VCode/Content', function (require, module, panel) {

    var KISP = require('KISP');
    var disabled = false;



    panel.on('init', function () {
        var toast = KISP.create('Toast', {
            duration: 1500,
            mask: 0,
            icon: 'close',
        });

        panel.$on('click', {
            '[data-cmd="send"]': function () {
                if (disabled) {
                    return;
                }

                panel.fire('send');
            },
        });

        panel.$on('blur', {
            '[name="code"]': function () {
                var txt = this;
                var value = txt.value;
                var regexp = /^\d{4}$/;

                if (!value) {
                    return;
                }

                if (regexp.test(value)) {
                    return;
                }

                toast.show('验证码非法', function () {
                    txt.value = '';
                    txt.focus();
                });
            },
        });

    });


    /**
    * 已重载 render(action);   //传入一个字符串。
    * 已重载 render(data);     //传入一个对象。
    *
    * 参数：
    *   data = {
    *       action: '', //必选，动作类型的描述文本，如 `删除` 或 `下载`。
    *       phone: '',  //可选，要填充的手机号。
    *   };
    */
    panel.on('render', function (data) {
        //重载 render(action);
        if (typeof data == 'string') {
            data = { 'action': data };
        }

        disabled = false;

        panel.fill({
            'action': data.action,
            'phone': data.phone || '',

            'code': '',
        });

    });


    return {

        /**
        * 设置手机号。
        */
        set: function (phone) {
            panel.$.find('input[name="phone"]').val(phone);
        },


        get: function () {
            var $code = panel.$.find('[name="code"]');
            var code = $code.val();

            if (!code) {
                KISP.alert('请输入验证码', function () {
                    $code.focus();
                });
                return;
            }

            return {
                'code': code,
            };
        },


        /**
        * 倒计时。
        * 在发送短信验证码成功后，禁用发送按钮。 
        * 同时开始倒计时，归零后启用发送按钮。
        */
        countdown: function () {
            var count = 60;
            var $btn = panel.$.find('[data-cmd="send"]');
            var $code = panel.$.find('[name="code"]');

            var html = $btn.html();

            var tid = setInterval(function () {
                count--;
                setHtml();

                if (count <= 0) {
                    disabled = false;
                    $btn.removeClass('disabled');
                    $btn.html(html);
                    clearInterval(tid);
                }

            }, 1000);

            function setHtml() {
                var text = '等待 ' + count + 's';
                $btn.html(text);
            }

            $code.attr('disabled', false);
            disabled = true;
            setHtml();
            $btn.addClass('disabled');

        },

        empty: function () {
            var $code = panel.$.find('[name="code"]');
            $code.val('');
        },


    };
});









KISP.panel('/AccountBaks/VCode/Footer', function (require, module, panel) {




    panel.on('init', function () {

        panel.$on('click', {
            '[data-cmd]': function () {
                var cmd = this.getAttribute('data-cmd');
                panel.fire(cmd);
            },

        });

    });


    panel.on('render', function (action) {
        panel.fill({
            'action': action,
        });
    });


});







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







define('/AccountBaks/Manual/Header/API', function (require, module, exports) {
    var $ = require('$');
    var KISP = require('KISP');
    var API = require('API');
    var Emitter = KISP.require('Emitter');

    var emitter = new Emitter();

    var loading = KISP.create('Loading', {
        mask: 0,
    });


    return {
        'on': emitter.on.bind(emitter),

        get: function (opt) {


            var api = new API('web/user/get_pan_kingdee_info', {
                'proxy': true,
            });


            api.on({
                'request': function () {
                    loading.show('获取中...');
                },

                'response': function () {
                    loading.hide();
                },

                'success': function (data, json, xhr) {
                    emitter.fire('getpan', [{
                        'used': data.used,
                        'total':data.total,
                        'rate':data.used_per,
                    }]);

                },

                'fail': function (code, msg, json) {
                    emitter.fire('getpan');
                },

                'error': function () {
                    emitter.fire('getpan');
                },
            });


            api.post({
                'tid': opt.company.origin['tid'],   //企业 id。
            });

        },



    };


});

/*
* 
*/
KISP.panel('/AccountBaks/Manual/Header/Bar', function (require, module, panel) {

    var $ = require('$');

    panel.on('init', function () {

    });


    panel.on('render', function (data) {
        panel.fill({
            'used': data && data.used || '0.0G',
            'total': data && data.total || '0.0G',
        });
      
        panel.$.find('[data-cmd="bar-num"]').width(data.rate);
    });



    return {

    };


});





/*
* 
*/
KISP.panel('/AccountBaks/Manual/Header/THeader', function (require, module, panel) {

    var meta = {
        list: [],           //外面传进来的总列表数据。
        checked: false,     //是否全选。
    };


    panel.on('init', function () {
        panel.template().fix('disabled');

        panel.$on('click', {
            '[data-cmd="check-all"]': function () {
                var checked = meta.checked = !meta.checked;
                var list = meta.list;
                var count = checked ? list.length : 0;


                $(this).toggleClass('on', checked);
                panel.fire('check', [checked]);
                panel.render(list, count);

            },

            '[data-cmd="delete"]': function () {
                panel.fire('delete');
            },
        });
    });


    panel.on('render', function (list, count) {
        list = meta.list = list || [];
        count = count || 0;
        meta.checked = count > 0 && count == list.length;

        panel.fill({
            'disabled': count > 0 ? '' : 'disabled',
            'count': count > 0 ? ` (${count})` : '',
            'checked': meta.checked ? 'on' : '',        //是否全部选中。
            'delete-title': count > 0 ? `已选中 ${count} 项` : '未选中任何项，禁止操作',
        });
    });



    return {

    };


});






define('/AccountBaks/Manual/List/Remark', function (require, module, exports) {
    


    return {
        process: function (str) {
            if (!str) {
                return '';
            }


            var remark = '';
            var remarkNum = str.length / 24;

            if (str && str.length > 24) {
                for (var i = 0; i < remarkNum; i++) {
                    remark = remark + str.slice(i * 24, (i + 1) * 24) + '&#10;';
                }
                if (str.length % 24 > 0) {
                    remark = remark + str.slice(remarkNum * 24, str.length);
                }

            }
            else {
                remark = str;
            }

            return remark;
        },
    };




});

define('/AccountBaks/Manual/API', function (require, module, exports) {
    var $ = require('$');
    var KISP = require('KISP');
    var API = require('API');
    var Emitter = KISP.require('Emitter');

    var emitter = new Emitter();

    var loading = KISP.create('Loading', {
        mask: 0,
    });


    return {
        'on': emitter.on.bind(emitter),

        /**
        * 获取公有云账套备份列表。
        *   opt = {
        *       company: {},    //企业信息。
        *       product: {},    //产品信息。
        *       no: 1,          //页码。
        *       size: 20,       //每页的大小。
        *   };
        */
        get: function (opt) {


            var api = new API('web/product/account_back_up_list', {
                'proxy': true,
            });


            api.on({
                'request': function () {
                    loading.show('获取中...');
                },

                'response': function () {
                    loading.hide();
                },

                'success': function (data, json, xhr) {

                    var list = data['back_up_list'] || [];


                    list = list.map(function (item) {
                        return {
                            'product': item['product_name'],
                            'name': item['account_name'],       //账套名字
                            'number': item['account_num'],      //账套号。
                            'size': item['size'],               //账套大小，单位M
                            'datetime': item['create_time'],    //备份时间
                            'status': item['status'],           //备份状态，0为正在备份，1为备份完成，2备份异常，备份失败
                            'type': item['type'],               //备份类型：1为自动备份，2为人工备份 
                            'remark': item['remark'],           //备份失败原因 
                            'sqlVersion': item['sql_version'],  //数据库版本。
                            'checked': false,                   //用于多选里的批量操作。
                            'origin': item,
                        };
                    });


                    ////test only-------------------------------
                    //var item = list[0];
                    //if (item) {
                    //    item = JSON.stringify(list[0]);
                    //    list = [
                    //       JSON.parse(item),
                    //       JSON.parse(item),
                    //       JSON.parse(item),
                    //       JSON.parse(item),
                    //    ];
                    //}

                   

                    emitter.fire('success', 'get', [list, {
                        'no': opt.no,
                        'size': opt.size,
                        'total': data['all_num'],   //总记录数。
                    }]);

                },

                'fail': function (code, msg, json) {
                    KISP.alert('获取公有云账套备份列表失败: {0}(错误码: {1})', msg, code);
                },

                'error': function () {
                    KISP.alert('获取公有云账套备份列表错误: 网络繁忙，请稍候再试');
                },
            });


            api.post({
                // 'type': 2,                          //公有云备份类型，1为自动备份，2为人工备份
                'tid': opt.company.origin['tid'],   //企业 id。
                'pid': opt.product.origin['pid'],   //产品实例ID。
                'page': opt.no,                     //页码。
                'page_size': opt.size,              //每页的大小。
            });

        },



    };


});

/*
* 
*/
KISP.panel('/AccountBaks/Manual/Header', function (require, module, panel) {

    var API = module.require('API');
    var Bar = module.require('Bar');
    var THeader = module.require('THeader');




    panel.on('init', function () {
        THeader.on({
            'check': function (checked) {
                panel.fire('check', [checked])
            },

            'delete': function () {
                panel.fire('delete');
            },
        })

        API.on({
            'getpan': function (data) {
                Bar.render(data);
            },
        })
    });


    panel.on('render', function (meta, list, count) {
        THeader.render(list, count);
        API.get(meta);
    });



    return {

    };


});






KISP.panel('/AccountBaks/Manual/List', function (require, module, panel) {
    var $ = require('$');
    var Remark = module.require('Remark');

    var list = [];


    panel.on('init', function () {
        var status$item = {
            0: { text: '正在备份', class: 'default', },
            1: { text: '备份完成', class: 'default', },
            2: { text: '备份失败', class: 'warning', },
            default: { text: '(未定义)', class: 'warning', },
        };



        panel.template({
            '': function (data) {
                var table = this.fill('table', data);

                return {
                    'table': table,
                };
            },

            'table': {
                '': function (data) {
                    var rows = this.fill('row', data.items);

                    return {
                        'rows': rows,
                    };
                },

                'row': {
                    '': function (item, index) {
                        var status = item.status;
                        var statusItem = status$item[status] || status$item['default'];
                        var refresh = this.fill('refresh', item, index);
                        var remark = Remark.process(item.remark);


                        return {
                            'index': index,
                            'name': item.name,
                            'size': item.size,
                            'datetime': item.datetime,
                            'status': status,
                            'status-text': statusItem.text,
                            'status-text-class': statusItem.class,
                            'sqlVersion': item.sqlVersion,
                            'remark': remark || '',
                            'download-class': status == 1 ? 'primary' : 'forbid',   //只有备份成功的，才允许下载。
                            'delete-class': status == 0 ? 'forbid' : 'normal',      //只有正在备份的，才禁止删除。
                            'refresh': refresh,
                        };


                    },

                    'refresh': function (item, index) {
                        return item.status == 0 ? {
                            'index': index,

                        } : '';
                    },
                },
            },
        });


    });



    panel.on('init', function () {


        panel.$on('click', {
            '[data-cmd]': function () {
                var cmd = this.getAttribute('data-cmd');
                var index = +this.getAttribute('data-index');
                var item = list[index];

                //如果给选中了，则交给批量操作，而行内的操作则禁用。
                var disabled = item.checked || $(this).hasClass('forbid') || list.some(function (item) {
                    return item.checked;
                });


                if (disabled) {
                    return;
                }

                panel.fire(cmd, [item, index]);

            },

            '[data-cmd="check"]': function () {
                var index = +this.getAttribute('data-index');
                var item = list[index];
                var checked = item.checked = !item.checked;

                //过滤出选中的项。
                var checks = list.filter(function (item) {
                    return !!item.checked;
                });

                var count = checks.length;



                $(this).toggleClass('on', checked);
                panel.$.toggleClass('checked', count > 0);

                panel.fire('check', [list, count]);

            },

        });
    });





    /**
    *   items = [
    *       { },
    *   ];
    */
    panel.on('render', function (items) {
        list = items;

        panel.fill({
            'items': items,
        });

        panel.$.toggleClass('no-data', !items.length);
        panel.$.removeClass('checked'); //移除之前可能存在的，比如翻页重新填充后，需要移除上一页的选中状态。

    });


    return {
        checkAll: function (checked) {
            panel.$.find('[data-cmd="check"]').toggleClass('on', checked);
            panel.$.toggleClass('checked', checked);

            list.forEach(function (item, index) {
                item.checked = checked;
            });
        },

        getChecks: function () {
            var items = list.filter(function (item, index) {
                return !!item.checked;
            })

            return items;
        },
    };




});

/*
* 
*/
KISP.panel('/AccountBaks/Manual/Pager', function (require, module, panel) {
    var KISP = require('KISP');
    var Pager = require('Pager');

    var pager = null;



    /**
    * 初始化时触发。
    * 即首次 render 之前触发，且仅触发一次。
    * 适用于创建实例、绑定事件等只需要执行一次的操作。
    */
    panel.on('init', function () {
        pager = new Pager({
            container: panel.$.find('>div'),     //分页控件的容器。这里要套多一层，避免 panel 与 pager 争取 $ 的显示和隐藏。
            total: 123,             //总的记录数，应该从后台取得该值
            size: 20,               //每页的大小，即每页的记录数
            sizes: [5, 10, 20, 30, 40, 50, 60, 70],
        });

        pager.on({
            //翻页时会调用该方法，参数 no 是当前页码。
            //前端应根据当前页码去拉后台数据。
            'change': function (no, size) {
                console.log(no, size);

                panel.fire('change', [{
                    'no': no,
                    'size': size,
                }]);
            },

            //控件发生错误时会调用该方法，比如输入的页码有错误时
            'error': function (msg) {
                console.error(msg);
                KISP.alert(msg);
            },
        });

    });



    /**
    * 渲染时触发。
    * 即外界显式调用 render() 时触发，且每次调用都会触发一次。
    * 外界传进来的参数会原样传到这里。
    *   options = {
    *       total: 123,     //总记录数。
    *       size: 10,       //每页的记录数。
    *       no: 1,          //当前页码。
    *   };
    */
    panel.on('render', function (options) {

        pager.render({
            'total': options.total,
            'size': options.size,
            'no': options.no,
        });

    });




});





/*
* 
*/
KISP.panel('/AccountBaks/Manual', function (require, module, panel) {
    var KISP = require('KISP');
    var API = module.require('API');
    var List = module.require('List');
    var Header = module.require('Header');
    var Pager = module.require('Pager');


    var meta = {
        company: null,
        product: null,
        no: 1,              //当前页码，从 1 开始。
        size: 10,           //每页的记录数。 即每页多少条记录。
        cache: false,       //指示是否为缓存数据。 如果是，则不请求后台。
    };


    panel.on('init', function () {

        Header.on({
            'check': function (checked) {
                List.checkAll(checked);
            },

            'delete': function () {
                var items = List.getChecks();

                if (!items.length) {
                    KISP.alert('请至少选择一项。');
                    return;
                }

                KISP.confirm('确认要批量删除选中的备份文件', function () {
                    panel.fire('delete', 'list', [items]);
                });
            },
        });





        List.on({
            'check': function (list, count) {
                Header.render(meta, list, count);
            },

            'download': function (item) {
                panel.fire('download', [item]);
            },

            'delete': function (item) {
                panel.fire('delete', 'item', [item]);

            },

            'refresh': function (item, index) {
                API.get(meta);

            },
        });



        Pager.on({
            //翻页。
            'change': function (page) {
                meta.no = page.no;
                meta.size = page.size;

                API.get(meta);
            },
        });


        API.on('success', {
            'get': function (list, page) {
                if (page.no == 1) {
                    Pager.render(page);
                }

                meta.cache = true; //指示拿到了数据，下次直接使用缓存。

                Header.render(meta, list);
                List.render(list);
            },

        });


    });

    /**
    * 渲染。
    *   data = {
    *       company: {},    //企业信息。
    *       product: {},    //产品信息。
    *   };
    */
    panel.on('render', function (data) {
        //已经缓存过了。
        if (meta.cache) {
            return;
        }



        //否则，需要发起请求。
        meta.company = data.company;
        meta.product = data.product;
        meta.no = 1;

        API.get(meta);
    });


    return {
        reset: function () {
            meta.cache = false;
        },
    };


});







define('/AccountBaks/Private/API', function (require, module, exports) {
    var $ = require('$');
    var KISP = require('KISP');
    var API = require('API');
    var Emitter = KISP.require('Emitter');

    var emitter = new Emitter();

    var loading = KISP.create('Loading', {
        mask: 0,
    });


    return {
        'on': emitter.on.bind(emitter),


        /**
        * 获取私有云账套备份列表。
        *   opt = {
        *       company: {},    //企业信息。
        *       product: {},    //产品信息。
        *   };
        */
        get: function (opt) {


            var api = new API('web/product/account_back_up_private', {
                'proxy': true,
            });

            api.on({
                'request': function () {
                    loading.show('获取中...');
                },

                'response': function () {
                    loading.hide();
                },

                'success': function (data, json, xhr) {
                    var list = data || [];

                    list = list.map(function (item) {
                        return {
                            'name': item['back_name'],      //账套名字
                            'number': item['file_id'],      //账套号。
                            'size': item['size'],           //账套大小，单位M
                            'datetime': item['back_time'],  //备份时间
                            'checked': false,               //用于多选里的，批量操作。
                            'origin': item,
                        };
                    });

                    emitter.fire('success', 'get', [list]);

                },

                'fail': function (code, msg, json) {
                    KISP.alert('获取私有云账套备份列表失败: {0}(错误码: {1})', msg, code);
                },

                'error': function () {
                    KISP.alert('获取私有云账套备份列表错误: 网络繁忙，请稍候再试');
                },
            });

            api.post({
                'tid': opt.company.origin['tid'],           //企业 id。
                'prod_id': opt.product.origin['prod_id'],   //产品实例ID。
            });

        },

        getpan: function (opt) {


            var api = new API('web/user/get_pan_kingdee_info', {
                'proxy': true,
            });


            api.on({
                'request': function () {
                    loading.show('获取中...');
                },

                'response': function () {
                    loading.hide();
                },

                'success': function (data, json, xhr) {
                    emitter.fire('success','getpan', [{
                        'used': data.used,
                        'total': data.total,
                        'rate': data.used_per,
                    }]);

                },

                'fail': function (code, msg, json) {
                    emitter.fire('getpan');
                },

                'error': function () {
                    emitter.fire('getpan');
                },
            });


            api.post({
                'tid': opt.company.origin['tid'],   //企业 id。
            });

        },

    };


});

/*
* 
*/
KISP.panel('/AccountBaks/Private/Header', function (require, module, panel) {



    panel.on('init', function () {


    });

    panel.on('render', function (data) {
        panel.$.find('[data-cmd="progress"]').css('display', 'block');
        panel.fill({
            'used': data && data.used || '0.0G',
            'total': data && data.total || '0.0G',
        });

        panel.$.find('[data-cmd="bar-num"]').width(data.rate);
    });




    return {

    };


});






KISP.panel('/AccountBaks/Private/List', function (require, module, panel) {
    

    var list = [];


    panel.on('init', function () {

        panel.template({
            '': function (data) {
                var table = this.fill('table', data);

                return {
                    'table': table,
                };
            },

            'table': {
                '': function (data) {
                    var rows = this.fill('row', data.items, data.isPublic);

                    return {
                        'rows': rows,
                    };
                },

                'row': {
                    '': function (item, index, isPublic) {

                        return {
                            'index': index,
                            'name': item.name,
                            'size': item.size,
                            'datetime': item.datetime,
                        };
                    },

                    'refresh': function (item, index) {
                        return item.status == 0 ? {
                            'index': index,
                        } : '';
                    },
                },
            },
        });

     
    });



    panel.on('init', function () {


        panel.$on('click', {
            '[data-cmd]': function () {
                var cmd = this.getAttribute('data-cmd');
                var index = +this.getAttribute('data-index');
                var item = list[index];

                //禁用的，禁止下载。
                if ($(this).hasClass('forbid')) {
                    return;
                }

                panel.fire(cmd, [item, index]);

            },

            

        });
    });





    /**
    *   items = [
    *       { },
    *   ];
    */
    panel.on('render', function (items) {
        list = items;

        panel.fill({
            'items': items,
        });

        panel.$.toggleClass('no-data', !items.length);

    });


    return {
       
    };



});

/*
* 私有云备份列表。
*/
KISP.panel('/AccountBaks/Private', function (require, module, panel) {
    var KISP = require('KISP');
    var API = module.require('API');
    var List = module.require('List');
    var Header = module.require('Header');


    var meta = {
        company: null,
        product: null,
        cache: false,   //指示是否为缓存数据。 如果是，则不请求后台。
    };


    panel.on('init', function () {
        Header.on({

        });



        List.on({

            'download': function (item) {
                panel.fire('download', [item]);
            },

            'delete': function (item) {
                panel.fire('delete', 'item', [item]);

            },

            'refresh': function (item, index) {
                API.get(meta);
            },
        });




        API.on('success', {
            'get': function (list) {
                meta.cache = true;  //指示拿到了数据，下次直接使用缓存。

                List.render(list);
            },
            'getpan': function (data) {
                Header.render(data);

                API.get(meta);
            },

        });


    });

    /**
    * 渲染。
    *   data = {
    *       company: {},    //企业信息。
    *       product: {},    //产品信息。
    *   };
    */
    panel.on('render', function (data) {
        //已经缓存过了。
        if (meta.cache) {
            return;
        }

        //否则，需要发起请求。
        meta.company = data.company;
        meta.product = data.product;

        API.getpan(meta);


    });


    return {
        reset: function () {
            meta.cache = false;
        },
    };
});







define('/AccountBaks/API', function (require, module, exports) {
    var $ = require('$');
    var KISP = require('KISP');
    var API = require('API');
    var Emitter = KISP.require('Emitter');

    var emitter = new Emitter();

    var loading = KISP.create('Loading', {
        mask: 0,
    });

    var toast = KISP.create('Toast', {
        duration: 1500,
        mask: 0,
    });


    /**
    * 标准化 post 参数。
    *   opt = {
    *       company: {},    //必选，企业信息。
    *       item: {},       //必选，账套备份信息。
    *       form: {},       //可选，表单信息，如果有，则提供验证码。
    *   };
    */
    function normalize(opt) {
        var company = opt.company.origin;
        var item = opt.item.origin;
        var form = opt.form;

        var isPublic = !!item['back_id'];            //是否为公有云。
        var key = isPublic ? 'back_id' : 'file_id';     //

        var params = {
            'tid': company['tid'],          //企业 id。
            'code': form ? form.code : '',  //可能需要短信验证码。
            'type': isPublic ? 1 : 2,       //

            'back_id': item[key],           //
        };

        return params;
    }



    /**
    * 删除一条账套备份记录。
    *   opt = {
    *       company: {},    //必选，企业信息。
    *       item: {},       //必选，账套备份信息。
    *       form: {},       //可选，表单信息，如果有，则提供验证码。
    *   };  
    */
    function deleteItem(opt) {

        var api = new API('web/product/del_back_up', {
            'proxy': true,
        });

        api.on({
            'request': function () {
                loading.show('删除中...');
            },

            'response': function () {
                loading.hide();
            },

            'success': function (data, json, xhr) {
                toast.show('删除成功', function () {
                    emitter.fire('success', 'delete', []);
                });
            },

            'fail': function (code, msg, json) {
                KISP.alert('删除账套备份失败: {0}', msg, code);
            },

            'error': function () {
                KISP.alert('删除账套备份错误: 网络繁忙，请稍候再试');
            },
        });

        var params = normalize(opt);

        api.post(params);
    }


    /**
    * 批量删除多条账套备份记录。
    * 目前仅针对公有云。
    *   opt = {
    *       company: {},    //必选，企业信息。
    *       list: [],       //必选，选中的列表项，即多条账套备份信息。
    *       form: {},       //必选，验证码的表单信息，需要提供验证码。
    *   };
    */
    function deleteList(opt) {
        var api = new API('web/product/del_back_up_batch', {
            'proxy': true,
        });

        api.on({
            'request': function () {
                loading.show('批量删除中...');
            },

            'response': function () {
                loading.hide();
            },

            'success': function (data, json, xhr) {
                toast.show('批量删除成功', function () {
                    emitter.fire('success', 'delete', []);
                });
            },

            'fail': function (code, msg, json) {
                KISP.alert('批量删除账套备份失败: {0}', msg, code);
            },

            'error': function () {
                KISP.alert('批量删除账套备份错误: 网络繁忙，请稍候再试');
            },
        });


        var ids = opt.list.map(function (item) {
            return item.origin['back_id'];
        });

        var params = {
            'tid': opt.company.origin['tid'],   //企业 id。
            'code': opt.form.code,              //需要短信验证码。
            'type': 1,                          //1 为公有云，2 为私有云。 【目前这里只针对公有云】。
            'back_id_list': ids.join(','),      //批量删除的 back_id，使用 `,` 分开。
        };

        api.post(params);
    }







    return {
        'on': emitter.on.bind(emitter),

        /**
        * 删除一和或多条账套备份记录。
        */
        delete: function (opt) {
            var item = opt.item;

            if (Array.isArray(item)) {
                deleteList({
                    'company': opt.company,
                    'list': item,
                    'form': opt.form,
                });
            }
            else {
                deleteItem({
                    'company': opt.company,
                    'item': item,
                    'form': opt.form,
                });
            }
            
        },

        
    

        /**
        * 获取一条账套备份记录的下载地址。
        */
        download: function (opt) {

            var api = new API('web/product/get_back_up_down_url', {
                'proxy': true,
            });

            api.on({
                'request': function () {
                    loading.show('获取中...');
                },

                'response': function () {
                    loading.hide();
                },

                'success': function (data, json, xhr) {
                    var url = data['down_url'];

                    emitter.fire('success', 'download', [url]);

                },

                'fail': function (code, msg, json) {
                    KISP.alert('获取账套备份的下载地址失败: {0}', msg);
                },

                'error': function () {
                    KISP.alert('获取账套备份的下载地址错误: 网络繁忙，请稍候再试');
                },
            });

            var params = normalize(opt);

            api.post(params);
        },

    };


});

/*
* 
*/
KISP.panel('/AccountBaks/Header', function (require, module, panel) {

    panel.on('init', function () {

        panel.$on('click', {
            '[data-cmd]': function () {
                var cmd = this.getAttribute('data-cmd');
                panel.fire(cmd);
            },
        });



    });


    /**
    * 渲染。
    *   data = {
    *       company: {},    //企业信息。
    *       product: {},    //产品信息。
    *   };
    */
    panel.on('render', function (data) {

        panel.fill({
            'company': data.company.name,
            'product': data.product.name,
        });
        
    });



});









KISP.panel('/AccountBaks/Tabs', function (require, module, panel) {

    var KISP = require('KISP');

    var tabs = null;

    var meta = {
        index: 0,
    };

    var list = [
        { text: '公有云手动备份', cmd: 'manual', },
        { text: '公有云自动备份', cmd: 'auto', },
        { text: '私有云备份', cmd: 'private', },
    ];

    panel.on('init', function () {

        tabs = KISP.create('Tabs', {
            container: panel.$,             //页签的容器。
            selector: '>li',                //页签项的元素选择器。
            activedClass: 'on',             //激活项的 css 类名。
            eventName: 'click',             //监听的事件名。
            repeated: true,                 //允许重复点击。
        });

        //设定填充规则。
        tabs.template(function (item, index) {
            return {
                'index': index,
                'text': item.text,
            };
        });

        //绑定事件。
        tabs.on('change', function (item, index) {
            meta.index = index;

            panel.fire('change', item.cmd, [item]);
        });

    });


    panel.on('render', function (index) {
        if (typeof index == 'number') {
            meta.index = index;
        }
        else {
            index = meta.index;
        }

        tabs.render(list);
        tabs.active(index);
    });



    return {

    };

});

/*
* 某个产品下的账套备份列表。
*/
KISP.view('/AccountBaks', function (require, module, view) {
    var Header = module.require('Header');
    var Auto = module.require('Auto');
    var Manual = module.require('Manual');
    var Private = module.require('Private');
    var Confirm = module.require('Confirm');
    var VCode = module.require('VCode');
    var Tabs = module.require('Tabs');
    var API = module.require('API');

    var meta = {
        company: null,
        product: null,
        item: null,     //记录要操作的项，单个时为 item，批量时为 list。 
        M: null,        //记录当前正在操作的模块，只能为 Manual、Auto、Private 之一。 用于在删除记录后调用该模块进行刷新。
    };


    view.on('init', function () {
        Header.on({
            //跳到根节点，即我的企业，不需要传数据。
            'company-list': function () {
                view.fire('company-list');
            },

            //跳到产品列表，传企业信息过去。
            'product-list': function () {
                view.fire('product-list', [meta.company]);
            },

            //刷新列表。
            'refresh': function () {
                view.refresh();
            },

        });

        //切换页签。
        Tabs.on('change', {
            'auto': function (item) {
                Private.hide();
                Manual.hide();
                Auto.render(meta);
            },

            'manual': function (item) {
                Private.hide();
                Auto.hide();
                Manual.render(meta);
            },

            'private': function () {
                Auto.hide();
                Manual.hide();
                Private.render(meta);
            },
        });


        [Auto, Manual, Private].forEach(function (M) {

            M.on('delete', {
                //单个删除。
                'item': function (item) {
                    meta.M = M;
                    meta.item = item;
                    Confirm.delete(item);
                },

                //批量删除。 
                //目前仅针对公有云。
                'list': function (list) {
                    meta.M = M;
                    meta.item = list;

                    //需要验证码。
                    VCode.delete(meta.company);
                },
            });

            M.on({
                //单个下载。
                'download': function (item) {
                    meta.item = item;
                    Confirm.download(item);
                },
            });
        });

      
        

        //确认对话框，针对单个删除或下载的。
        Confirm.on({
            //单个删除。
            'delete': function () {
                if (meta.item.status == 2) { //备份异常、备份失败的，直接删除，无需验证码。
                    API.delete({
                        'company': meta.company,
                        'item': meta.item,
                    });
                }
                else { //需要验证码。
                    VCode.delete(meta.company, meta.item);
                }
            },

            //单个下载。
            'download': function () {
                //需要验证码。
                VCode.download(meta.company, meta.item);
            },
        });

        //获得短信验证码后，确认提交。
        VCode.on('submit', {

            //提交删除。
            'delete': function (form) {
                //删除一和或多条账套备份记录。
                API.delete({
                    'company': meta.company,
                    'form': form,
                    'item': meta.item,
                });
            },

            //提交下载。
            'download': function (form) {
                API.download({
                    'company': meta.company,
                    'item': meta.item,
                    'form': form,
                });
            },
        });


        //提交成功。
        API.on('success', {
            //删除成功，包括单个和批量的。
            'delete': function () {
                meta.M.reset();     //重置，以便能刷新。
                meta.M.refresh();   //
                VCode.hide();
            },

            //下载成功，动态获得 url。
            'download': function (url) {
                VCode.hide();
                location.href = url; //设置 url 即可直接下载。
            },

        });

    });




    /**
    * 渲染。
    *   data = {
    *       company: {},    //企业信息。
    *       product: {},    //产品信息。
    *   };
    */
    view.on('render', function (data) {
        meta.company = data.company;
        meta.product = data.product;
        meta.item = null;
        meta.M = null;

        Header.render(meta);

        Auto.reset();
        Manual.reset();
        Private.reset();

        Tabs.render(0);

    });




});





