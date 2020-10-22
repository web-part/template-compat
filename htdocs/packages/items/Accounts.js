
define('/Accounts/Main/API', function (require, module, exports) {
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
        * 获取账套列表。
        */
        getList: function (opt) {

            var api = new API('web/product/get_account_list', {
                proxy: true,

            });

            api.on({
                'request': function () {
                    loading.show('加载中...');
                },

                'response': function () {
                    loading.hide();
                },

                'success': function (data, json, xhr) {
                    var list = data || [];

                    list = list.map(function (item) {

                        return {
                            'name': item['account_name'],           //账套名称。
                            'number': item['account_num'],          //账套号。
                            'count1': item['used_num'],             //已经创建的用户数。
                            'count2': item['user_count'],           //最大可以创建的用户数，跟产品的用户数一致。
                            'usedSize': item['used_account_size'],  //已经使用的空间大小
                            'totalSize': item['allow_account_size'],//分配的空间大小
                            'status': item['status'],               //账套状态
                            'remark': item['remark'],               //账套失败原因
                            'is_bind': item['is_bind_apply'],       //是否已绑定应用 0没绑定 1绑定分享销客
                            'origin': item,
                        };
                    });
                    emitter.fire('get', 'list', [list]);

                },

                'fail': function (code, msg, json) {
                    KISP.alert('获取账套列表失败: {0}', msg);
                },

                'error': function () {
                    KISP.alert('获取账套列表错误: 网络繁忙，请稍候再试');
                },
            });

            api.post({
                'tid': opt.company.origin['tid'],           //企业 id。
                'prod_id': opt.product.origin['prod_id'],   //产品 id。
            });


        },

        /**
        * 检测能否恢复账套。
        */
        checkRecover: function (opt) {

            var api = new API('web/product/check_is_can_create_account', {
                proxy: true,
            });

            api.on({
                'request': function () {
                    loading.show('检测中...');
                },

                'response': function () {
                    loading.hide();
                },

                'success': function (data, json, xhr) {
                    var allow = data['is_can'] == 1;
                    var msg = json.msg;

                    //////////
                    //var allow = true;

                    if (allow) {
                        emitter.fire('check-recover', []);
                    }
                    else {
                        KISP.alert(msg);
                    }

                },

                'fail': function (code, msg, json) {
                    KISP.alert('检测恢复账套失败: {0}', msg);
                },

                'error': function () {
                    KISP.alert('检测恢复账套错误: 网络繁忙，请稍候再试');

                },
            });


            api.post({
                'tid': opt.company.origin['tid'],              //用户企业ID
                'prod_id': opt.product.origin['prod_id'],      //产品ID
                'prod_code': opt.product.origin['prod_code'],  //产品编码
            });

        },


        /**
        * 设置账套状态。
        * 即启用或禁用。
        */
        setStatus: function (opt) {
            var api = new API('web/product/change_account_status', {
                proxy: true,
            });


            api.on({
                'request': function () {
                    loading.show('设置中...');
                },

                'response': function () {
                    loading.hide();
                },

                'success': function (data, json, xhr) {

                    toast.show('设置成功', function () {
                        emitter.fire('set', 'status', [opt]);
                    });
                },

                'fail': function (code, msg, json) {
                    KISP.alert('设置账套状态失败: {0}', msg);
                },

                'error': function () {
                    KISP.alert('设置账套状态错误: 网络繁忙，请稍候再试');
                },
            });


            api.post({
                'tid': opt.company.origin['tid'], //用户企业ID
                'account_id': opt.account.origin['account_id'],//账套 id。
                'status': opt.enabled ? 2 : 5,  //账套的状态值，2为启用，5为禁用，其他值无效

            });
        },

        /**
        * 校验账套用户在线状态。
        */
        checkUser: function (opt) {
            var api = new API('service/kiswebapp/web_check_acctuser_onstatus', {
                proxy: true,
            });


            api.on({
                'request': function () {
                    loading.show('检查中...');
                },

                'response': function () {
                    loading.hide();
                },

                'success': function (data, json, xhr) {
                    emitter.fire('check-user', [opt]);
                },

                'fail': function (code, msg, json) {

                    if (code == '2013') {
                        KISP.alert(msg);
                        return;
                    }
                    KISP.alert('删除账套失败: {0}', msg);
                },

                'error': function () {
                    KISP.alert('删除账套错误: 网络繁忙，请稍候再试');
                },
            });


            api.post({
                'tid': opt.tid,
                'acctid': opt.item.origin['account_id'],
            });
        },



        /**
        * 设置自动备份。
        */
        setAutoBak: function (opt) {
            var api = new API('web/product/open_back_up', {
                proxy: true,
            });


            api.on({
                'request': function () {
                    loading.show('设置中...');
                },

                'response': function () {
                    loading.hide();
                },

                'success': function (data, json, xhr) {

                    toast.show('设置成功', function () {
                        emitter.fire('set', 'auto-bak', [opt]);
                    });
                },

                'fail': function (code, msg, json) {
                    KISP.alert('设置自动备份失败: {0}', msg);
                },

                'error': function () {
                    KISP.alert('设置自动备份错误: 网络繁忙，请稍候再试');
                },
            });


            var account = opt.account.origin;


            api.post({
                'tid': opt.company.origin['tid'],       //用户企业ID
                'account_id': account['account_id'],    //账套 id。
                'is_open': opt.enabled ? 1 : 0,         //是否开启自动备份，0为不开启，1为开启
            });
        },

        /**
        * 发起手动备份。
        */
        manualBak: function (opt) {

            var api = new API('web/product/account_back_up', {
                proxy: true,
            });


            api.on({
                'request': function () {
                    loading.show('备份中...');
                },

                'response': function () {
                    loading.hide();
                },

                'success': function (data, json, xhr) {
                    emitter.fire('set', 'manual-bak', []);
                },

                'fail': function (code, msg, json) {
                    KISP.alert('备份失败: {0}', msg);
                },

                'error': function () {
                    KISP.alert('备份错误: 网络繁忙，请稍候再试');
                },
            });


            api.post({
                'tid': opt.company.origin['tid'],               //用户企业ID
                'account_id': opt.account.origin['account_id'], //账套 id。
            });
        },

        /**
        * 恢复中刷新状态添加管理员账号。
        */
        refresh: function (opt, accountId) {

            var api = new API('web/product/create_account_user_by_restore', {
                proxy: true,
            });


            api.on({
                'request': function () {
                    loading.show('刷新中...');
                },

                'response': function () {
                    loading.hide();
                },

                'success': function (data, msg, json) {
                    emitter.fire('has-refresh');
                },

                'fail': function (code, msg, json) {
                    KISP.alert(msg);
                },

                'error': function () {
                    KISP.alert('刷新错误: 网络繁忙，请稍候再试');
                },
            });

            api.post({
                'tid': opt.company.origin['tid'],              //用户企业ID
                'account_id': accountId,                       //账套 id。
                'prod_id': opt.product.origin['prod_id'],      //产品 id。
            });
        },


        /**
        * 保存账套名称修改。
        */
        save: function (opt, value) {
            var api = new API('web/product/change_account_name', {
                proxy: true,
            });

            api.on({
                'request': function () {
                    loading.show('保存中...');
                },

                'response': function () {
                    loading.hide();
                },

                'success': function (data, json, xhr) {

                    toast.show('保存成功', function () {
                        emitter.fire('save', [opt]);
                    });

                },

                'fail': function (code, msg, json) {

                    KISP.alert('保存账套名称失败: {0}', msg);
                },

                'error': function () {
                    KISP.alert('保存账套名称错误: 网络繁忙，请稍候再试');
                },
            });

            api.post({
                'tid': opt.origin['tid'],               //用户企业 ID
                'account_name': value,                  //账套名称
                'account_id': opt.origin['account_id'], //产品实例 ID
            });

        },



    };


});


KISP.panel('/Accounts/Main/List', function (require, module, panel) {
    var KISP = require('KISP');
    var User = require('User');


    var list = [];

    var proStatus;  //账套状态
    var status$item = {
        1: { text: '创建中', class: 'default', },
        2: { text: '已启用', class: 'default', },
        3: { text: '恢复失败', class: 'warning' },
        4: { text: '创建失败', class: 'warning' },
        5: { text: '已禁用', class: 'warning', },
        7: { text: '恢复中', class: 'default', },
        8: { text: '恢复中', class: 'default', },
        default: { text: '(未知)', class: 'warning', },
    };

    panel.on('init', function () {
        //账套状态，
        //1 为 web 系统 DB 创建成功，产品端账套创建中，
        //2 创建成功，正常，
        //3 不可以使用，异常状态  产品端恢复账套失败
        //4 不可以使用，异常状态，产品端创建账套失败
        //5 管理员禁用，禁用状态，不可使用
        function dealRemark(str) {
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
        }

        panel.template({
            '': function (data) {
                var table = this.fill('table', data);
                var add = this.fill('add', data);

                return {
                    'table': table,
                    'add': add,
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
                        var listClass = '';
                        var gray = '';
                        var remarkStatus = 'no-remark';
                        var remark = dealRemark(item.remark);
                        if (proStatus == 2) {    // 产品过期,不能禁用或者启用账套
                            listClass = 'has-some';
                        }
                        else if (status == 1 || status == 7 || status == 8) {
                            gray = 'all-gray';  // 账套创建中和恢复中时不能进行任何操作
                        }
                        else if (status == 3 || status == 4) {
                            gray = 'gray';     // 此状态下只能进行删除账套操作
                        }
                        else if (status == 2) {
                            gray = 'no-delete';  //已启用状态时没有删除账套按钮
                        }

                        if (status == 3 || status == 4) { 
                            remarkStatus = 'has-remark';
                        }
                        return {
                            'index': index,
                            'listClass': listClass,
                            'gray': gray,
                            'name': item.name,
                            'number': item.number,
                            'count1': item.count1,
                            'count2': item.count2,
                            'usedSize': item.usedSize,
                            'totalSize': item.totalSize,
                            'status': status,
                            'status-text': statusItem.text,
                            'remark': remark || '',
                            'remark-status': remarkStatus,
                            'status-text-class': statusItem.class,
                            'refresh': refresh,
                        };

                    },

                    'refresh': function (item, index) {
                        return (item.status == 1 || item.status == 7 || item.status == 8) ? {
                            'index': index,
                        } : '';
                    },
                },
            },

            //无数据时，显示一个大大的创建按钮。
            'add': function (data) {
                return data.items.length ? '' : {};
            },
        });
    });


    panel.on('init', function () {

        panel.$.on('click', '[data-cmd]', function () {
            var cmd = this.getAttribute('data-cmd');
            var index = +this.getAttribute('data-index');
            var item = list[index];
            var status = item.status;
            var ifCan = status != 2;

            panel.$.find('[data-type="0"]').removeClass('on');
            panel.$.find('[data-num="0"]').removeClass('on');


            switch (cmd) {
                case 'users':
                case 'open':
                    var statusDesc = proStatus == 2 ? '产品已过期' : `账套${status$item[status].text}`;
                    var todo = cmd == 'users' ? '添加用户' : '进入账套';

                    if (cmd == 'users' && proStatus == 2) {
                        KISP.alert(`${statusDesc}，不能添加用户`);
                        return;
                    }

                    if (ifCan) {
                        KISP.alert(`${statusDesc}，不能${todo}`, function () {
                            if (status == 1 || status == 7 || status == 8) {
                                panel.fire('refresh', [item, index]);
                            }
                        });

                        return;
                    }

                    panel.fire(cmd, [item, index]);
                    break;

                case 'enable':
                    panel.fire('set-status', [item, index, true]);
                    break;

                case 'disable':
                    panel.fire('set-status', [item, index, false]);
                    break;

                case 'apps':
                    //只允许状态为 2 的账套进入应用列表。
                    if (status != 2) {
                        KISP.alert('当前账套不可用。');
                        return;
                    }

                default:
                    panel.fire(cmd, [item, index]);
                    break;
            };

        });



        panel.$.on('click', '[data-cmd="edit"]', function () {
            var index = +this.getAttribute('data-index');
            var btn = `[data-edit="${index}"]`;
            var $btn = panel.$.find(btn);
            var item = list[index];

            $btn.toggleClass('editbar');

            if ($btn.hasClass('editbar')) {
                panel.$.find(`${btn} input`).val(item.name);
                return;
            }

            var value = panel.$.find(`${btn} input`).val();
            if (item['name'] == value) {
                return;
            }

            panel.fire('save', [item, value]);
        });



        panel.$.on('click', '[data-type="create-account"]', function () {
            panel.fire('create-account');
        })

    });





    /**
    */
    panel.on('render', function (items, status) {
        proStatus = status;
        list = items;

        panel.fill({
            'items': items,
        });

        panel.$.toggleClass('no-data', !items.length);
        var userInfo = User.get();

        if (items.length && userInfo) {
            panel.$.find('[data-type="0"]').addClass('on');
            panel.$.find('[data-num="0"]').addClass('on');
        }


        if (!items.length && userInfo) {
            panel.$.find('[data-type="create-account"]').addClass('on');
        }
    });




    return {
        setStatus: function (index, enabled) {
            var item = list[index];
            var status = enabled ? 2 : 5;   //已禁用为5

            //状态没变。
            if (status == item.status) {
                return;
            }


            item.status = status;

            var tpl = panel.template();
            var html = tpl.fill('table', 'row', item, index);
            var tr = 'tr[data-index="' + index + '"]';

            tr = panel.$.find(tr).get(0);
            tr.outerHTML = html;

        },

        /**
        * 更新自动备份状态。
        */
        setAutoBakStatus: function (index, enabled) {
            var item = list[index];
            var value = enabled ? 1 : 0;

            //状态没变。
            if (value == item.origin['is_back_up']) {
                return;
            }


            item.origin['is_back_up'] = value;

            var label = '[data-cmd="auto-bak"][data-index="' + index + '"]';

            panel.$.find(label).toggleClass('on', enabled);



        },
    };


});


KISP.panel('/Accounts/Apps/Content/List', function (require, module, panel) {
    var KISP = require('KISP');

    var list = [];



    panel.on('init', function () {

        //后台使用的图标对应于前端使用 css 类名。
        var icon$class = {
            'SM': 'sm',             //商贸版。
            'PRO': 'zy',            //专业版。
            'UE': 'qj',             //旗舰版。
            'kisyjxc': 'jxc',       //kis 云进销存。
            'kisfxiaoke': 'share',  //纷享销客。
            'JGJ': 'jgj',           //KIS 金管家。 前端尚未提供。
        };


        panel.template(function (item, index) {
            return {
                'index': index,
                'name': item.name,
                'company': item.company,
                'show': item.company ? 'show' : '',
                'time': item.time,
                'icon-class': icon$class[item.icon],
            };
        });


        panel.$on('click', '[data-cmd="{value}"]', {
            'use': function () {
                var index = +this.getAttribute('data-index');
                var item = list[index];

                panel.fire('use', item.type, [item]);
            },
        });
    });





    /**
    * 
    */
    panel.on('render', function (items) {
        list = items;
        panel.fill(list);
    });




});

define('/Accounts/Apps/API', function (require, module, exports) {
    var $ = require('$');
    var KISP = require('KISP');
    var $Object = KISP.require('Object');
    var API = require('API');

    var emitter = KISP.create('Emitter');

    var loading = KISP.create('Loading', {
        mask: 0,
    });






    return {
        'on': emitter.on.bind(emitter),

        /**
        * 获取某个账套下的应用列表。
        * 参数：
        *   account: {},    //必选，选中的账套。 
        */
        get: function (account) {

            var api = new API('service/kiswebapp/web_get_account_applist', {
                proxy: true,

            });

            api.on({
                'request': function () {
                    loading.show('加载中...');
                },

                'response': function () {
                    loading.hide();
                },

                'success': function (data, json, xhr) {
                    //账套信息。
                    var account = {
                        'name': data['acctName'],
                        'origin': data,
                    };

                    //账套所属的产品信息。
                    var product = {
                        'type': 'product',
                        'name': data['srcProductName'],
                        'time': data['prodExpireDatetime'].split(' ')[0],  
                        'company': data['name'] || '',
                        'icon': data['prodtag'],
                        'origin': data,
                    };

                    //账套所属的产品下的应用列表。
                    var apps = data['appData'].map(function (item) {
                        return {
                            'type': 'app',
                            'name': item['appName'],
                            'time': item['appExpireTime'].split(' ')[0],  
                            'icon': item['prodtag'],
                            'account': account,             //关联多一个。 用于获取应用地址。
                            'product': product,             //关联多一个。 用于获取应用地址。
                            'origin': item,
                        };
                    });


               
                    emitter.fire('get', 'list', [product, apps]);

                },

                'fail': function (code, msg, json) {
                    KISP.alert('获取账套的应用列表失败: {0}', msg);
                },

                'error': function () {
                    KISP.alert('获取账套的应用列表错误: 网络繁忙，请稍候再试');
                },
            });


            api.post({
                'acctid': account.origin['account_id'],
            });

        },


        /**
        * 获取打开应用所需要的动态地址。
        */
        getUrl: function (item) {

            var api = new API('service/kiswebapp/web_sso_auth_login', {
                proxy: true,

            });

            api.on({
                'request': function () {
                    loading.show('获取连接...');
                },

                'response': function () {
                    loading.hide();
                },

                'success': function (data, json, xhr) {

                    var url = data['redirect_url'];

                    emitter.fire('get', 'url', [url]);

                },

                'fail': function (code, msg, json) {
                    //`2010` 产品已过期，警告提醒，不终止使用。
                    if (code == '2010' || code == '2011') {
                        KISP.alert(msg, function () {
                            var url = json.data['redirect_url'];
                            emitter.fire('get', 'url', [url]);
                        });
                    }
                    else {
                        KISP.alert('获取应用的连接地址失败: {0}', msg);
                    }
                },

                'error': function () {
                    KISP.alert('获取应用的连接地址错误: 网络繁忙，请稍候再试');
                },
            });


            api.post({
                'acctid': item.account.origin['acctid'],
                'icrmid': item.origin['icrmid'],
            });
        },



    };


});


KISP.panel('/Accounts/Apps/Content', function (require, module, panel) {
    var KISP = require('KISP');
    var List = module.require('List');



    panel.on('init', function () {



        //应用列表。
        List.on('use', {
            'product': function (item) {
                panel.fire('product');
            },

            'app': function (item) {
                panel.fire('app', [item]);
            },
        });







    });



    /**
    * 渲染。
    */
    panel.on('render', function (data) {
        var list = [data.product, ...data.apps];

        List.render(list);

    });
});








/*
* 
*/
KISP.panel('/Accounts/Apps', function (require, module, panel) {
    var Content = module.require('Content');
    var API = module.require('API');

    var Dialog = require('Dialog');
    var dialog = null;

    var meta = {
        account: null,
    };




    panel.on('init', function () {
        panel.set('show', false);

        dialog = Dialog.panel({
            'title': '应用列表',
            'width': 1098,
            'height': 660,
            'resizable': true,
            'z-index': 1023,

            'container': panel,
            'content': Content,
        });


        dialog.on({
            'render': function (data) {
                Content.render(data);
            },
        });


        Content.on({
            //点击了产品信息，打开对应的账套。
            'product': function () {
                panel.fire('account', [meta.account]);
            },

            //点击了某个应用，获取链接。
            'app': function (item) {
                API.getUrl(item);
            },
           
        });



        API.on('get', {
            //获取应用列表和账套信息成功。
            'list': function (product, apps) {
                //列表为空。
                if (apps.length == 0) {
                    panel.hide();
                    panel.fire('account', [meta.account]);
                    return;
                }


                panel.show();
                dialog.render({
                    'product': product,
                    'apps': apps,
                });
            },

            //获取应用的跳转地址成功。
            'url': function (url) {
                panel.fire('url', [url]);
            },
        });


       


    });


    /**
    * 渲染。
    *   account: {},    //必选，账套信息。
    */
    panel.on('render', function (account) {
        meta.account = account;

        API.get(account);

    });



    return {
       
    };






});








KISP.panel('/Accounts/Confirm/Content', function (require, module, panel) {


    panel.on('init', function () {


    });



    panel.on('render', function (data) {
        var bind$describe = {
            0: `你确认删除账套【${data.name}】吗`,
            1: '该账套已绑定纷享销客，删除账套将终止与纷享销客的同步服务，不允许再次绑定，请慎重操作！'
        };
        panel.fill({
            'describe': bind$describe[data.is_bind],
        });

    });



});









KISP.panel('/Accounts/Confirm/Footer', function (require, module, panel) {


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
KISP.panel('/Accounts/Confirm', function (require, module, panel) {

    var Content = module.require('Content');
    var Footer = module.require('Footer');
    var Dialog = require('Dialog');
    var dialog = null;

    var meta = {
        account: null,  //账套信息。
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
            'footer': Footer,
        });

      
        dialog.on({
            'render': function (account) {
                Content.render(account);
                Footer.render();
            },
        });

  


        Footer.on({
            'ok': function () {
                dialog.close();
                panel.fire('ok', [meta.account]);
            },
            'cancel': function () {
                dialog.close();
            },
        });

    });


    panel.on('render', function (account) {
        meta.account = account;
        dialog.render(account);
       
    });



});







define('/Accounts/Delete/API', function (require, module, exports) {
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
        */
        get: function (opt) {
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

                    emitter.fire('success', 'get', [{
                        'phone': data.mobile,
                    }]);

                },

                'fail': function (code, msg, json) {
                    KISP.alert('获取手机号失败: {0}', msg);
                    emitter.fire('fail', 'get');

                },

                'error': function () {
                    KISP.alert('获取手机号错误: 网络繁忙，请稍候再试');
                    emitter.fire('fail', 'get');
                },
            });

            api.post({
                'tid': opt.company.origin['tid'],               //用户企业ID
            });
        },


        /**
        * 发送手机短信验证码。
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

            api.post({
                'tid': opt.company.origin['tid'],               //用户企业ID
                'account_name': opt.account.origin['account_name'], //账套名称
                'type': opt.type,
            });
        },


        /**
        * 删除账套。
        */
        delete: function (opt) {
            var api = new API('web/product/del_account', {
                proxy: true,
            });

            api.on({
                'request': function () {
                    loading.show('删除中...');
                },

                'response': function () {
                    loading.hide();
                },

                'success': function (data, json, xhr) {

                    toast.show('删除成功');
                    opt.fn && opt.fn({
                        'company': opt.company,
                        'product':opt.product,
                    });
                    emitter.fire('success', 'delete', [data]);

                },

                'fail': function (code, msg, json) {
                    KISP.alert('删除账套失败: {0}', msg);
                    emitter.fire('fail', 'delete', []);

                },

                'error': function () {
                    KISP.alert('删除账套错误: 网络繁忙，请稍候再试');
                    emitter.fire('fail', 'delete', []);
                },
            });



            api.post({
                'tid': opt.company.origin['tid'],               //用户企业ID
                'account_id': opt.account.origin['account_id'], //账套ID
                'code': opt.form ? opt.form['code'] : '',                       //短信验证码。
            });
        },




    };


});


KISP.panel('/Accounts/Delete/Content', function (require, module, panel) {

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



    panel.on('render', function (data) {
        
        data = data || {};
        disabled = false;

        panel.fill({
            'phone': data.phone || '',
            'code': '',
        });
      
    });


    return {

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









KISP.panel('/Accounts/Delete/Footer', function (require, module, panel) {


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
        account: null,
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
            'footer': Footer,
        });


        dialog.on({
            'render': function (data) {
                Content.render();
                Footer.render();

                //获取手机号。
                API.get({
                    'company': meta.company,
                });
            },
        });



        API.on('success', {
            //手机号获取成功。
            'get': function (data) {
                Content.render(data);
            },
            //删除账套成功。
            'delete': function () {
                
                dialog.close();
                panel.fire('success');
            },
            //验证码发送成功。
            'send': function () {
                Content.countdown();
            },
        });

        API.on('fail', {
            //手机号获取失败。
            'get': function (data) {
                dialog.close();
            },
            //删除账套失败。
            'delete': function () {
                //清空验证码。
                Content.empty();
            },
        });



        Content.on({
            //发送验证码。
            'send': function () {
                API.send({
                    'company': meta.company,
                    'account': meta.account,
                    'type': 1,
                });
            },
        });



        Footer.on({
            //确认删除。
            'ok': function () {
                var form = Content.get();

                form && API.delete({
                    'company': meta.company,
                    'account': meta.account,
                    'form': form,
                });
            },

            'cancel': function () {
                dialog.close();
            },
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
        'delete': function (item) {    //提供方法直接删除账套，无需验证码
            API.delete(item);
        }
    }



});







define('/Accounts/App', function (require, module, exports) {
    var $ = require('$');
    var KISP = require('KISP');
    var $Object = KISP.require('Object');
    var API = require('API');


    var loading = KISP.create('Loading', {
        mask: 0,
    });




    return {

        /**
        * 检测某个账套下是否有应用列表。
        * 参数：
        *   item: {},    //必选，选中的账套。 
        */
        check: function (item, fn) {

            var api = new API('service/kiswebapp/web_get_account_applist', {
                //proxy: 'get-app-list.js',
            });

            api.on({
                'request': function () {
                    loading.show('检测中...');
                },

                'response': function () {
                    loading.hide();
                },

                'success': function (data, json, xhr) {
                    var list = data['appData'] || [];
                    var hasData = list.length > 0;

                    fn && fn(hasData);

                },

                'fail': function (code, msg, json) {
                    KISP.alert('获取账套的应用列表失败: {0}', msg);
                },

                'error': function () {
                    KISP.alert('获取账套的应用列表错误: 网络繁忙，请稍候再试');
                },
            });


            api.post({
                'acctid': item.origin['account_id'],
            });

        },




    };


});

/*
* 
*/
KISP.panel('/Accounts/Header', function (require, module, panel) {
    var KISP = require('KISP');
    var plugin = KISP.data('plugin');

    var User = require('User');


    panel.on('init', function () {

        panel.$on('click', {
            '[data-cmd]': function () {
                var forbidden = $(this).hasClass('forbid');
                if (forbidden) {
                    return;
                }

                var cmd = this.getAttribute('data-cmd');
                if (cmd == 'create-account') {
                    panel.$.find('[data-type="create-account"]').removeClass('on');
                }

                panel.fire(cmd);
            },


            '[data-type="delete-tip"]': function () {
                panel.$.find('[data-type="download"]').removeClass('on');
            },
        });

      

    });


    panel.on('render', function (data) {

        panel.fill({
            'company': data.company.name,
            'product': data.product.name,
            'plugin': plugin.url,
        });

    });

    return {

    };

});







/*
* 
*/
KISP.panel('/Accounts/Main', function (require, module, panel) {
    var KISP = require('KISP');
    var API = module.require('API');
    var List = module.require('List');

    var meta = {
        company: null,
        product: null,
    };




    panel.on('init', function () {

        List.on({
            'create-account': function () {
                panel.fire('create-account');
            },

            'save': function (item, value) {
                API.save(item, value);
            },

            'users': function (item) {
                panel.fire('users', [item]);
            },

            'delete': function (item) {
                API.checkUser({
                    'tid': meta.company.origin['tid'],
                    'item': item,
                });
            },

            //禁用或启用账套。
            'set-status': function (item, index, enabled) {
                API.setStatus({
                    'enabled': enabled,
                    'company': meta.company,
                    'account': item,
                    'index': index,
                });
            },

            'manual-bak': function (item) {
                API.manualBak({
                    'company': meta.company,
                    'account': item,
                });
            },

            'auto-bak': function (item, index) {
                var enabled = item.origin['is_back_up'] == 1;

                API.setAutoBak({
                    'company': meta.company,
                    'account': item,
                    'enabled': !enabled,        //这里取反。
                    'index': index,
                });
            },

            'refresh': function (item, index) {
                //恢复中的。
                if (item.status == 7 || item.status == 8) {
                    API.refresh(meta, item.origin['account_id']);
                }
                else { //其它的
                    API.getList(meta);
                }
            },

            'apps': function (item) {
                panel.fire('apps', [item]);
            },

        });

       

        API.on('get', {
            'list': function (list) {
                List.render(list, meta.product.status);
            },
        });

        API.on('set', {
            'status': function (opt) {
                List.setStatus(opt.index, opt.enabled);
            },

            'manual-bak': function () {
                var msg =
                    '操作完成。 <br /> ' +
                    '是否进入账套备份列表查看账套备份状态';

                KISP.confirm(msg, function () {
                    panel.fire('to-baks');
                });
            },

            'auto-bak': function (opt) {
                List.setAutoBakStatus(opt.index, opt.enabled);
            },
        });


        API.on({
            'check-user': function (opt) {
                panel.fire('check-user', [opt.item]);
            },
            'check-recover': function () {
                panel.fire('check-recover');
            },

            'save': function (opt) {
                API.getList(meta);
            },

            'has-refresh': function () {
                API.getList(meta);
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
        meta = data;
        API.getList(data);
    });





    return {
        'checkRecover': API.checkRecover,
    };

});







/*
* 某个产品下的账套列表。
*/
KISP.view('/Accounts', function (require, module, view) {
    var Header = module.require('Header');
    var Main = module.require('Main');
    var Confirm = module.require('Confirm');
    var Delete = module.require('Delete');
    var App = module.require('App');
    var Apps = module.require('Apps');

    var meta = {
        company: null,
        product: null,
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

            //刷新账套列表。
            'account-list': function () {
                Main.render(meta);
            },

            //创建账套。
            'create-account': function () {
                view.fire('create-account', [meta]);
            },

            'recover-account': function () {
                Main.checkRecover(meta);
            },
        });

        Apps.on({
            //应用列表为空的，直接打开插件。  ---变态、不合理的需求。
            'account': function (item) {
                view.fire('open', [{
                    'tid': meta.company.origin['tid'],
                    'acctid': item.origin['account_id'],
                }]);
            },

            //获取应用的跳转地址成功。
            'url': function (url) {
                view.fire('url', [url]);
            },
        });

        Main.on({
            'check-recover': function (list) {
                view.fire('recover-account', [meta]);
            },

            'users': function (item) {
                view.fire('add-user', [{
                    'company': meta.company,
                    'product': meta.product,
                    'account': item,
                }]);
            },

            'check-user': function (item) {
                Confirm.render(item);
            },

            'to-baks': function () {
                view.fire('to-baks', [{
                    'company': meta.company,
                    'product': meta.product,
                }]);
            },

            //创建账套。
            'create-account': function () {
                view.fire('create-account', [meta]);
            },

            //跳到应用列表。
            'apps': function (item) {
                Apps.render(item);
                return;

                //跳到应用列表视图。
                //该视图已暂时不用了，改成了弹窗的方式。
                view.fire('apps', [{
                    'company': meta.company,
                    'product': meta.product,
                    'account': item,
                }]);
            },

        });

        Confirm.on({
            'ok': function (account) {
                var direct = account.status == 3 || account.status == 4;
                var opt = {
                    'company': meta.company,
                    'product': meta.product,
                    'account': account,
                };

                if (direct) {
                    opt['fn'] = function (meta) {
                        Main.render(meta);
                    };

                    Delete.delete(opt);
                }
                else {
                    Delete.render(opt);
                }
            },
        });


        Delete.on({
            //删除账套成功，刷新账套列表。
            'success': function () {
                Main.render(meta);
            },
        });


    });


    /**
    * 渲染。
    * 参数：
    *   data = {
    *       company: {},    //企业信息。
    *       product: {},    //产品信息。
    *   };
    */
    view.on('render', function (data) {
        meta.company = data.company;
        meta.product = data.product;

        Header.render(meta);
        Main.render(meta);

    });


  
});
