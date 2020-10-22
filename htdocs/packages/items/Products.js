
define('/Products/Main/List/Delete', function (require, module, exports) {
    var KISP = require('KISP');
    var $Date = KISP.require('Date');


  


    return {

        /**
        * 判断是否允许删除。
        */
        check: function (item) {
            var origin = item.origin;
            var status = item.status;
            var count1 = item.count1;
            var type = item.type;

            if (type == 1) {
                return false;
            }

            //不允许删除。
            if (origin['can_del'] == 0) {
                return false;
            }

            if (status == 0) {
                return true;
            }

            if (status == 1 && count1 == 0) {
                return true;
            }

            if (status == 2 && count1 == 0 && type == 2) {
                return true;
            }

            return false;

        },



    };


});

define('/Products/Main/List/Expired', function (require, module, exports) {
    var KISP = require('KISP');
    var $Date = KISP.require('Date');


  


    return {

        /**
        * 产品到期时间小于30天时标红显示。
        */
        getClass: function (date) {
            if (!date || date == '0000-00-00') {
                return '';
            }

            date = $Date.parse(date);

            var now = Date.now();
            var dd = date - now;

            //已过期。
            if (dd < 0) {
                return 'warning';
            }

            dd = dd / (24 * 3600 * 1000);
            dd = Math.floor(dd);

            //即将过期。
            if (dd < 30) {
                return 'notice';
            }

            return '';
        },



    };


});

define('/Products/Main/API', function (require, module, exports) {
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

    var defaults = KISP.data(module.id);


    return {
        'on': emitter.on.bind(emitter),

        /**
        * 获取指定企业的产品列表。
        *   opt = {
        *       company: {},    //企业信息。
        *   };
        */
        get: function (opt) {
            var api = new API('web/product/get_product_order_list', {
                proxy: true,
            });

            api.on({
                'request': function () {
                    loading.show('获取中...');
                },

                'response': function () {
                    loading.hide();
                },

                'success': function (data, json, xhr) {

                    var list = data.map(function (item, index) {

                        var expire = item['expire_time'] || ''; //后台返回的可能是 null。
                        expire = expire.split(' ')[0]; //取日期部分。

                        var status = item['status'];
                        var usedSize = item['account_size_used'] || 0;
                        var actived = item['type'] == 1; //产品类型，1为已激活（已购正式版），2为未激活（赠送正式版）',

                        return {
                            'name': item['product_name'],
                            'count1': item['used_account_num'], //已用账套数。
                            'count2': item['account_num'],      //可用账套数。
                            'users': item['user_count'],        //用户数量。
                            'size': item['account_size'],       //空间大小。
                            'usedSize': usedSize,               //已空间大小。
                            'expire': expire,                   //到期时间。
                            'area': item['region_name'],        //地区名称。
                            'warnMsg': item['warn_msg'],        //
                            'status': status,                   //正在使用产品状态，0为禁用，1为启用(正常使用)。
                            'actived': actived,                 //是否已激活。 
                            'model': item['cloud_model'],
                            'type': item['type'],               //产品类型，1 为已激活（已购正式版），2为未激活（赠送正式版）。
                            'hide': item['hide'],
                            'origin': item,
                        };
                    });

                    emitter.fire('success', 'get', [list]);

                },

                'fail': function (code, msg, json) {
                    KISP.alert('获取产品列表失败: {0}', msg);
                },

                'error': function () {
                    KISP.alert('获取产品列表错误: 网络繁忙，请稍候再试');
                },
            });

            api.post({
                'tid': opt.company.origin['tid'],   //用户企业 ID
            });

        },

        /**
        * 更新服务。
        *   opt = {
        *       company: {},    //企业信息。
        *       product: {},    //产品信息。
        *   };
        */
        update: function (opt) {
            var api = new API('service/kiswebapp/web_kisapiserv_prodinst_update', {
                proxy: true,
            });

            api.on({
                'request': function () {
                    loading.show('更新中...');
                },

                'response': function () {
                    loading.hide();
                },

                'success': function (data, json, xhr) {

                    toast.show('更新成功', function () {
                        emitter.fire('success', 'refresh', [data]);
                    });

                },

                'fail': function (code, msg, json) {

                    KISP.alert('更新服务失败: {0}', msg);
                },

                'error': function () {
                    KISP.alert('更新服务错误: 网络繁忙，请稍候再试');
                },
            });

            api.post({
                'tid': opt.company.origin['tid'],               //用户企业 ID
                'productid': opt.product.origin['product_id'],  //产品 ID，形如：S1S052S001
                'pid': opt.product.origin['pid'],               //产品实例 ID
            });

        },

        /**
        * 切换私有云。
        */
        change: function (opt) {
            var api = new API('service/kiswebapp/web_change_cloudmod', {
                proxy: true,
            });

            api.on({
                'request': function () {
                    loading.show('切换中...');
                },

                'response': function () {
                    loading.hide();
                },

                'success': function (data, json, xhr) {

                    toast.show('切换私有云成功', function () {
                        emitter.fire('success', 'refresh', [data]);
                    });

                },

                'fail': function (code, msg, json) {

                    KISP.alert('切换私有云失败: {0}', msg);
                },

                'error': function () {
                    KISP.alert('切换私有云错误: 网络繁忙，请稍候再试');
                },
            });

            api.post(opt);

        },

        /**
        * 启用公有云。
        */
        toPub: function (opt) {
            var api = new API('service/kiswebapp/web_change_cloudmod', {
                proxy: true,
            });

            api.on({
                'request': function () {
                    loading.show('切换中...');
                },

                'response': function () {
                    loading.hide();
                },

                'success': function (data, json, xhr) {

                    toast.show('启用公有云成功', function () {
                        emitter.fire('success', 'refresh', [data]);
                    });

                },

                'fail': function (code, msg, json) {
                    if (code == '2014') {
                        KISP.alert(msg, function () {
                            emitter.fire('success', 'refresh');
                        });

                    }
                    KISP.alert('启用公有云失败: {0}', msg);
                },

                'error': function () {
                    KISP.alert('启用公有云错误: 网络繁忙，请稍候再试');
                },
            });

            api.post(opt);

        },

        /**
        * 保存产品名称修改。
        */
        save: function (opt, value) {
            var api = new API('web/product/change_product_name', {
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
                        emitter.fire('success', 'refresh', [data]);
                    });

                },

                'fail': function (code, msg, json) {

                    KISP.alert('保存产品名称失败: {0}', msg);
                },

                'error': function () {
                    KISP.alert('保存产品名称错误: 网络繁忙，请稍候再试');
                },
            });

            api.post({
                'tid': opt.origin['tid'],               //用户企业 ID
                'prod_name':value,  //产品名称
                'pid': opt.origin['pid'],               //产品实例 ID
            });
        },

        /**
        * 获取跳转到 kis-o2o 的链接。
        *   type: 1,    //跳转类型，1：新购。  2：加站加模。  3：续费。
        *   item: {},   //产品信息。
        */
        o2o: function (type, item, isConfirmed) {

            var api = new API('web/kiso2o/login_by_kisyun', {
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

                    var url = data.url;

                    emitter.fire('success', 'kis-o2o', [url, defaults]);

                },

                'fail': function (code, msg, json) {

                    //前端在单点登录收到错误代码为409的时候弹出确认框
                    if (code == 409) {
                        KISP.confirm({
                            'text': msg,
                            'buttons': ['继续购买', '取消'],
                            'ok': function () {
                                module.exports.o2o(type, item, true); //再次调用。
                            },
                        });
                    }
                    else {
                        KISP.alert(msg); //需求说：只显示提示消息即可。
                    }


                },

                'error': function () {
                    KISP.alert('获取跳转到 KIS-O2O 的链接错误: 网络繁忙，请稍候再试');
                },
            });

            //公有云产品。
            var type$dest = {
                '1': 3,   //新购。 
                '2': 1,   //加站加模（减站减模）。
                '3': 2,   //续费（续租）。
            };


            api.post({
                'type': type$dest[type],        //1为公有云产品加站加模或者减站减模，2为公有云产品续费即续租。
                'pid': item.origin['pid'],      //产品实例 ID。

                'test': defaults.test,          //为了区分跳到不同的环境。
                'is_xuzu': isConfirmed ? 1 : 0, //是否强行续租，1为强行续租。
            });
        },

    };


});


KISP.panel('/Products/Main/Header', function (require, module, panel) {
    

    panel.on('init', function () {

      
    });



    /**
    */
    panel.on('render', function (hasHide) {
        panel.fill({
            'hide': hasHide ? 'hide' : '',
        });

    });


   

});


KISP.panel('/Products/Main/List', function (require, module, panel) {
    var KISP = require('KISP');
    var User = require('User');
    var Expired = module.require('Expired');
    var Delete = module.require('Delete');



    var list = [];

    var meta = {
        hide: false,
        env: KISP.data('env'),      //这个临时用的。 用来屏蔽掉体验环境里的 kis-o2o 入口。
    };



    panel.on('init', function () {
        var status$item = {
            0: { text: '未使用', },
            1: { text: '使用中', },
            2: { text: '已过期', class: 'warning', },
            3: { text: '超出空间大小', },
        };

        var model$text = {
            0: { text: '', },   //未确认模式
            1: { text: '公有云', },
            2: { text: '私有云', },
        };



        function displayO2O(sw) {
            var name = meta.env.name;
            var isEnvOK = name == 'test' || name == 'official';
            return isEnvOK && sw ? 'inherit' : 'none';
        }


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
                        var model = item.model;
                        var type = item.type;   //产品类型，1 为已激活（已购正式版），2为未激活（赠送正式版）。

                        var modelText = model$text[model] || { text: '(未定义)' };
                        var statusItem = status$item[status] || { text: '(未定义)' };

                        var buttonDelete = this.fill('delete', item, index);



                        if (status == 1) {
                            statusItem = {
                                'text': model == 0 && type == 2 ? '试用中' : modelText.text + statusItem.text,
                            };
                        }




                        return {
                            'index': index,
                            'name': item.name,
                            'count1': item.count1,
                            'count2': item.count2,
                            'users': item.users,
                            'size': item.size,
                            'usedSize': item.usedSize,
                            'expire': item.expire,

                            // 'area': item.area,                               //需求要求隐藏
                            //'create-class': allowCreate ? '' : 'hide',

                            'status': statusItem.text,
                            'actived-class': item.actived ? 'actived-true' : 'actived-false',

                            //私有云使用中时屏蔽所有功能
                            'gray': model == 2 && status == 1 ? 'gray' : '',

                            //公有云、私有云按钮显示
                            'owner': model == 1 && type != 2 ? 'has' : '',

                            //应用列表。 `未使用` 时灰禁用。
                            'app-list-disalbed': status == 0 || statusItem == '使用中' || statusItem == '私有云使用中' ? 'disabled' : '',


                            'if-free': (function () {
                                if (status == 0) {
                                    return 'free-button';
                                }

                                if (model == 0 && status == 1 && type == 1) {
                                    return 'pub';
                                }

                                return '';

                            })(),

                            'expire-class': Expired.getClass(item.expire),
                            'status-class': statusItem.class || '',
                            'button-delete': buttonDelete,

                            'hide': meta.hide ? 'hide' : '',

                            //以下仅针对特定环境开放。
                            'kis-o2o-1-display': displayO2O(type == 2), //未激活的，显示 `新购`。
                            'kis-o2o-2-display': displayO2O(type == 1), //已激活的，显示 `加站加模`。
                            'kis-o2o-3-display': displayO2O(type == 1), //已激活的，显示 `续费`。

                        };

                    },

                    //删除按钮。
                    'delete': function (item, index) {
                        //判断是否允许删除。
                        var valid = Delete.check(item);

                        if (!valid) {
                            return '';
                        }

                        return {
                            'index': index,
                        };
                    },
                },
            },
        });
    });


    panel.on('init', function () {

        panel.$.on('click', '[data-cmd]', function () {
            var index = +this.getAttribute('data-index');
            var item = list[index];
            var cmd = this.getAttribute('data-cmd');
            var status = item.status;
            var model = item.model;

            panel.$.find('[data-type="0"]').removeClass('on');   //去除新手指引

            if (model == 2 && status == 1 || (cmd == 'app-list' && status == 0)) {
                return;
            }


            panel.fire('cmd', cmd, [item]);
            panel.fire('cmd', [cmd, item]);

        });



        panel.$on('click', '[data-cmd="{value}"]', {
            //编辑。
            'edit': function (event) {
                var index = +this.getAttribute('data-index');
                var selector = `[data-edit="${index}"]`;
                var $td = panel.$.find(selector);
                var item = list[index];

                $td.toggleClass('editbar');

                if ($td.hasClass('editbar')) {
                    panel.$.find(`${selector} input`).val(item.name);
                    return;
                }

                var value = panel.$.find(`${selector} input`).val();

                if (item['name'] == value) {
                    return;
                }

                panel.fire('save', [item, value]);
            },

            //kis-o2o
            'kis-o2o': function () {
                var index = +this.dataset['index'];
                var type = this.dataset['type'];
                var item = list[index];


                panel.fire('kis-o2o', [type, item]);
            },
        });



    });



    /**
    */
    panel.on('render', function (items, hide) {
        list = items;
        meta.hide = hide;

        panel.fill({
            'items': items,
        });

        panel.$.toggleClass('no-data', !items.length);


        var userInfo = User.get();
        var item = list[0];
        var valid = userInfo && item && item.model == 2 && item.status == 1;

        //展示新手指引。
        panel.$.find('[data-type="0"]').toggleClass('on', !!valid);




    });




});


KISP.panel('/Products/Main/News', function (require, module, panel) {

    /**
    *
    */
    panel.on('init', function () {
     
    });


    /**
    *
    */
    panel.on('render', function (list) {
        var hasInfo = false;
        var num = 0;
        var msgs = list.map(function (item, index) {
            var msg = item.warnMsg;

            if (msg) {
                num ++;
                hasInfo = true;
            }

            return msg ? `${num}、${msg}` : ''; //加上序号。
        });


        var text = hasInfo ? msgs.join('<span></span>') : '暂无相关信息提示';

        panel.$.find('marquee').html(text);
        panel.$.toggleClass('hide', !text);


    });




});

/*
* CDKEY。
*/
KISP.panel('/Products/Active/Content/Cdkey', function (require, module, panel) {
    var KISP = require('KISP');



    panel.on('init', function () {
        var toast = KISP.create('Toast', {
            duration: 1500,
            mask: 0,
            icon: 'close',
        });


        panel.$on('blur', {
            '[name="cdkey"]': function () {
                var txt = this;
                var value = txt.value;
                var len = value.length;

                if (len && len != 4) {
                    toast.show('CDKEY 非法', function () {
                        txt.focus();
                    });
                }
            },
        });

        panel.$on('paste', {
            '[name="cdkey"]': function (e) {

                var value;
                var len;
                var cdk = [];

                panel.fill({});
                
                if (window.clipboardData && window.clipboardData.getData) { // IE
                    value = window.clipboardData.getData('Text');
                } else {
                    value = e.originalEvent.clipboardData.getData('Text');//e.clipboardData.getData('text/plain');
                }

                value = value.replace(/-/g, '');
                len = value.length;

                for (var i = 0; i < len / 4; i++) {
                    cdk.push(value.substring(4 * i, 4 * (i + 1)));
                }

                var domList = panel.$.find('[name="cdkey"]');
                var num = Math.min(domList.length, cdk.length);

                for (var j = 0; j < domList.length; j++) {
                    domList.get(j).value = cdk[j];
                }

            },
        });


        panel.$on('input', {
            '[name="cdkey"]': function () {
                if (this.value.length != 4) {
                    return;
                }

                //输满当前格，自动移焦到下一格。
                var index = +this.getAttribute('data-index');

                if (index < 3) {
                    panel.$.find('[name="cdkey"]').get(index + 1).focus();
                }

            },
        });


    });


    panel.on('render', function () {

        //清空上次可能留下的内容。
        panel.fill({});
    });




    return {
        get: function () {
            var cdkey = panel.$.find('[name="cdkey"]').toArray();

            cdkey = cdkey.map(function (item) {
                return item.value;
            });

            cdkey = cdkey.join('-');


            if (cdkey.length != 19) {
                KISP.alert('输入的 CDKEY 非法，请修正');
                return false;
            }

            return cdkey;

        },
    };


});







/*
* 激活产品对话框。
*/
KISP.panel('/Products/Active/Content/Company', function (require, module, panel) {

    panel.on('init', function () {

        var status$text = {
            '0': '未认证',
            '1': '审核中',
            '2': '已认证',
            '3':'认证失败',
        };


        panel.template({
            '': function (data) {
                var status = data['org_status'];

                return {
                    'company': data.name,
                    'status': status$text[status] || '(未知状态)',
                };
            },
        });


       
    });

    panel.on('render', function (data) {
       
        panel.fill(data);

    });



});







/*
* 序列号。
*/
KISP.panel('/Products/Active/Content/Sn', function (require, module, panel) {
    var KISP = require('KISP');


    panel.on('init', function () {
        var toast = KISP.create('Toast', {
            duration: 1500,
            mask: 0,
            icon: 'close',
        });

        panel.$on('blur', {
            '[name="sn"]': function () {
                var txt = this;
                var value = txt.value;
                var len = value.length;

                if (len && len > 20) {
                    toast.show('序列号非法', function () {
                        txt.focus();
                    });
                }
            },
        });

       
    });

    panel.on('render', function () {
       
        //清空上次可能留下的内容。
        panel.fill({});
    });


    return {
        get: function () {
            var sn = panel.$.find('[name="sn"]').val();

            if (!sn) {
                KISP.alert('输入序列号');
                return false;
            }


            return sn;

        },
    };


});







define('/Products/Active/API', function (require, module, exports) {
    var $ = require('$');
    var KISP = require('KISP');
    var API = require('API');
    var RSA = require('RSA');

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
        * 提交激活。
        *   opt = {
        *       company: {},    //企业信息。
        *       product: {},    //产品信息。
        *       form: {},       //表单信息。
        *   };
        */
        post: function (opt) {
            var api = new API('service/kiswebapp/web_kisapiserv_prodinst_act', {
                proxy: true,
            });

            api.on({
                'request': function () {
                    loading.show();
                },

                'response': function () {
                    loading.hide();
                },

                'success': function (data, json, xhr) {

                    toast.show('激活成功', function () {
                        emitter.fire('success', [data]);
                    });

                },

                'fail': function (code, msg, json) {
                    KISP.alert('激活产品失败: {0}', msg);
                },

                'error': function () {
                    KISP.alert('激活产品错误: 网络繁忙，请稍候再试');
                },
            });

            var productsn = RSA.encrypt(opt.form['sn']);
            var cdkey = RSA.encrypt(opt.form['cdkey']);

            api.post({
                'tid': opt.company.origin['tid'],               //用户企业 ID
                'productsn': productsn,                    //产品序列号，形如: 2910361853
                'cdkey': cdkey,                     //产品 CDkey
                'productid': opt.product.origin['product_id'],  //产品 ID，形如：S1S052S001
                'pid': opt.product.origin['pid'],               //产品实例 ID
            });

        },


    };


});


KISP.panel('/Products/Active/Content', function (require, module, panel) {
    var API = module.require('API');
    var Company = module.require('Company');
    var Sn = module.require('Sn');
    var Cdkey = module.require('Cdkey');



    panel.on('init', function () {
      

    });



    panel.on('render', function (data) {
        
        Company.render(data);
        Sn.render();
        Cdkey.render();

    });





    return {
        get: function () {
            var sn = Sn.get();
            var cdkey = Cdkey.get();

            if (!sn || !cdkey) {
                return false;
            }

            return {
                'sn': sn,
                'cdkey': cdkey,
            };
        },
    };
   

});









KISP.panel('/Products/Active/Footer', function (require, module, panel) {


    panel.on('init', function () {
       
        panel.$.on('click', 'button', function () {

            panel.fire('submit');
        });

    });



    panel.on('render', function () {

    });


});







/*
* 激活产品对话框。
* 即开通服务。
*/
KISP.panel('/Products/Active', function (require, module, panel) {

    var Content = module.require('Content');
    var Footer = module.require('Footer');
    var API = module.require('API');

    var Dialog = require('Dialog');
    var dialog = null;

    var meta = {
        company: null,
        product: null,
    };

    panel.on('init', function () {

        dialog = Dialog.panel({
            'title': '开通服务',
            'width':560,
            'resizable': false,
            'z-index': 1023,
       
            'container': panel,
            'content': Content,
            'footer': Footer,
          
        });

      
        dialog.on({
            'render': function () {
                Content.render(meta.company.origin);
                Footer.render();
            },
        });

        API.on({
            'success': function () {
                dialog.close();
                panel.fire('success');
            },
        });


        Footer.on({
            'submit': function () {
                var form = Content.get();

                if (form) {

                    API.post({
                        'company': meta.company,
                        'product': meta.product,
                        'form': form,
                    });
                }
            },
        });

    });


    /**
    *   data = {
    *       company: {},    //企业信息。
    *       product: {},    //产品信息。
    *   };
    */
    panel.on('render', function (data) {
        meta = data;
        dialog.render();
       
    });



});







define('/Products/Add/API/Data', function (require, module, exports) {
    var $ = require('$');

    return {
        /**
        * 把后台返回的数据改成前端的结构。
        *
            {
                //一级列表。
                types: [
                    {
                        name: '金蝶KIS云专业版V15.0',
                        //二级列表。
                        items: [
                            { name: '金蝶KIS云专业版-总账包', },
                        ],
                        regions: [
                            { name: '华南区', id: '0', },
                        ],
                    },
                ],
                //地区列表。
                regions: [
                    { name: '华南区', id: '0', },
                ],
            };
        */
        format: function (data) {
            var id$region = {};
            var list = data || [];

            //从所有的产品中收集成完整的地区列表。
            //建立起以 id 为主键的关联关系。
            list.forEach(function (item) {
                var regions = item.region || [];

                regions.forEach(function (region) {
                    var id = region['region_id'];
                    id$region[id] = region;
                });
            });


            //一级列表。
            var types = list.map(function (item) {
                //目前后台还没二级列表的数据结构，到时再处理。
                var items = item['sec_product_list'] || [];
                var regions = item['region'] || [];

                regions = regions.map(function (region) {
                    return {
                        'name': region['region_name'],
                        'id': region['region_id'],
                        'origin': region,
                    };
                });

                return {
                    'name': item['product_name'],
                    'items': items,
                    'regions': regions,
                    'origin': item,
                };
            });

            //地区列表。
            var regions = Object.keys(id$region).map(function (id) {
                var region = id$region[id];

                return {
                    'name': region['region_name'],
                    'id': id,
                    'origin': region,
                };
            });

            //暂时写死两项，且禁用掉。
            types = types.concat([
                //{
                //    'name': '金蝶KIS旗舰版V6.0 Plus',
                //    'items': [],
                //    'regions': [],
                //    'origin': {},
                //    'disabled': true,
                //    'title': '该产品尚未上架，敬请期待。',
                //},

                
                // {
                //     'name': '金蝶KIS专业版V15.1 Plus',
                //     'items': [],
                //     'regions': [],
                //     'origin': {},
                //     'disabled': true,
                //     'title': '该产品尚未上架，敬请期待。',
                // },

            ]);


            return {
                'types': types,
                'regions': regions,
            };


        },

     


    };


});


KISP.panel('/Products/Add/Content/Items', function (require, module, panel) {

    var KISP = require('KISP');
    var Tabs = KISP.require('Tabs');

    var list = [];
    var tabs = null;



    panel.on('init', function () {
        tabs = new Tabs({
            container: panel.$.get(0),
            selector: '>button',
            eventName: 'click',
            indexKey: 'data-index',
            activedClass: 'on',
        });

        tabs.on('change', function (item, index) {
            panel.fire('change', [item]);
        });

    });




    panel.on('render', function (items) {

        list = items;

        tabs.render(list, function (item, index) {
            return {
                'index': index,
                'name': item.name,
            };
        });

        //list 有可能为空数组。
        if (list.length > 0) {
            tabs.active(0);
        }
        else {
            panel.fire('change', [null]);
        }


    });



});









KISP.panel('/Products/Add/Content/Regions', function (require, module, panel) {

    var KISP = require('KISP');
    var Tabs = KISP.require('Tabs');

    var list = [];



    panel.on('init', function () {
        panel.$.on('click', 'button[data-enabled="true"]', function () {
            var index = +this.getAttribute('data-index');
            var item = list[index];

            panel.$.find('button').removeClass('on');
            $(this).addClass('on');

            panel.fire('change', [item]);
        });

    });




    panel.on('render', function (items, enables) {
        var id$enabled = {};
        var beginIndex = -1; //填充后要自动选中的项，从首个启用项开始。

        list = items;
        enables = enables || items; //如果不指定，则默认为全部启用。

        enables.forEach(function (item) {
            id$enabled[item.id] = true;
        });


        panel.fill(list, function (item, index) {
            var enabled = id$enabled[item.id];

            if (enabled && beginIndex < 0) {
                beginIndex = index;
            }

            return {
                'index': index,
                'name': item.name,
                'enabled': enabled,
                'forbid-class': enabled ? '' : 'forbid',
            };
        });


        if (beginIndex >= 0) {
            panel.$.find('[data-index="' + beginIndex + '"]').click();
        }
        else {
            panel.fire('change', [null]);
        }

    });



    return {
        enable: function (items) {
            panel.render(list, items);
        },
    };
   

});









KISP.panel('/Products/Add/Content/Types', function (require, module, panel) {

    var KISP = require('KISP');
    var Tabs = KISP.require('Tabs');

    var list = [];
    var tabs = null;



    panel.on('init', function () {
        tabs = new Tabs({
            container: panel.$.get(0),
            selector: '>button:not(.forbid)',
            eventName: 'click',
            indexKey: 'data-index',
            activedClass: 'on',
        });

        tabs.on('change', function (item, index) {
            panel.fire('change', [item]);
        });

    });




    panel.on('render', function (items) {

        list = items;

        tabs.render(list, function (item, index) {
            return {
                'index': index,
                'name': item.name,
                'disabled': item.disabled ? 'forbid' : '',
                'title': item.title || '',
            };
        });

        tabs.active(0);

    });




    return {
        get: function () {
            return {};
        },
    };
   

});








define('/Products/Add/API', function (require, module, exports) {
    var $ = require('$');
    var KISP = require('KISP');
    var API = require('API');
    var Emitter = KISP.require('Emitter');
    var Data = module.require('Data');

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
        * 获取产品列表和地区数据。
        */
        get: function (opt) {

            var api = new API('web/product/get_product_list', {
                proxy: true,
            });

            api.on({
                'request': function () {
                    loading.show();
                },

                'response': function () {
                    loading.hide();
                },

                'success': function (data, json, xhr) {
                    data = Data.format(data);

                    emitter.fire('success', 'get', [data]);

                },

                'fail': function (code, msg, json) {
                    KISP.alert('获取产品列表失败: {0}', msg);
                },

                'error': function () {
                    KISP.alert('获取产品列表错误: 网络繁忙，请稍候再试');
                },
            });


            api.post({
                'tid': opt.origin.tid
            });

        },

        /**
        * 创建产品。
        */
        post: function (opt) {
            var api = new API('web/product/add_order_product', {
                proxy: true,
            });

            api.on({
                'request': function () {
                    loading.show();
                },

                'response': function () {
                    loading.hide();
                },

                'success': function (data, json, xhr) {

                    toast.show('添加成功', function () {
                        emitter.fire('success', 'post', [data]);
                    });

                },

                'fail': function (code, msg, json) {
                    KISP.alert('添加产品失败: {0}', msg);
                },

                'error': function () {
                    KISP.alert('添加产品错误: 网络繁忙，请稍候再试');
                },
            });


            var company = opt.company.origin;
            var type = opt.form.type.origin;
            var region = opt.form.region.origin;


            //var name = encodeURIComponent(type['product_name']);

            api.post({
                'tid': company['tid'],                  //用户企业 ID
                'icrm_id': type['icrm_id'],             //产品 icrm 中的 id。
                'prod_code': type['prod_code'],         //商品编码。
                'region_id': region['region_id'],        //产品选中的区域 ID
                //'product_name': name,                   //商品名称。
                'type': 2,                              //产品创建类型，1为正式版，2为试用版。
            });

        },


    };


});


KISP.panel('/Products/Add/Content', function (require, module, panel) {

    var Types = module.require('Types');
    var Items = module.require('Items');
    var Regions = module.require('Regions');

    var meta = {
        type: null,
        item: null,
        region: null,
    };

    panel.on('init', function () {
        Types.on({
            'change': function (type) {
                var items = type.items;
                panel.$.toggleClass('no-items', items.length == 0);
                meta.type = type;

                Items.render(type.items);
                Regions.enable(type.regions);
            },
        });

        Items.on({
            'change': function (item) {
                meta.item = item;
            },
        });

        Regions.on({
            'change': function (item) {
                meta.region = item;
            },
        });

    });



    panel.on('render', function (data) {

        meta = {};

        //这个要在 Types.change 事件之前。
        Regions.render(data.regions);

        Types.render(data.types);

    });




    return {
        get: function () {
            return meta;
        },
    };


});









KISP.panel('/Products/Add/Footer', function (require, module, panel) {


    panel.on('init', function () {
       
        panel.$.on('click', 'button', function () {

            panel.fire('submit');
        });

    });



    panel.on('render', function () {

    });


});







/*
* 添加产品对话框。
*/
KISP.panel('/Products/Add', function (require, module, panel) {
    var Content = module.require('Content');
    var Footer = module.require('Footer');
    var API = module.require('API');

    var Dialog = require('Dialog');
    var dialog = null;

    var meta = {
        company: null,
    };

    panel.on('init', function () {

        dialog = Dialog.panel({
            'title': '添加产品',
            'width': 720,
             //'height': 416,
            'z-index': 1023,
            'resizable': false,

            'container': panel,
            'content': Content,
            'footer': Footer,
        });

      
        dialog.on({
            'render': function () {
                API.get(meta.company);
            },
        });

        API.on('success', {
            'get': function (data) {
                Content.render(data);
                Footer.render();
            },

            'post': function () {
                dialog.close();
                panel.fire('success');
            },
        });


        Footer.on({
            'submit': function () {
                var form = Content.get();

                API.post({
                    'company': meta.company,
                    'form': form,
                });
            },
        });

    });


    panel.on('render', function (company) {
        meta.company = company;
        dialog.render();
       
    });



});







define('/Products/Buy/API', function (require, module, exports) {
    var $ = require('$');
    var KISP = require('KISP');
    var API = require('API');
    var RSA = require('RSA');

    var Emitter = KISP.require('Emitter');

    var emitter = new Emitter();


    var loading = KISP.create('Loading', {
        mask: 0,
    });


    var toast = KISP.create('Toast', {
        duration: 1500,
        mask: 0,
        icon: 'close',
        width: 350,
    });

    var defaults = KISP.data(module.id);


    return {
        'on': emitter.on.bind(emitter),


        /**
        * 校验服务商编码。
        *   opt = {
        *       value: '',      //服务商编码。
        *       product: {},    //后台返回的原始的产品信息。
        *   };
        */
        verify: function (opt, fn) {
            var api = new API('web/kiso2o/check_partner', {
                proxy: true,
            });

            api.on({
                'request': function () {
                    loading.show('校验中...');
                },

                'response': function () {
                    loading.hide();
                },

                'success': function (data, json, xhr) {
                    if (data['exist'] == 0) {
                        var msg = `编码错误，请重新输入或由金蝶为您分配`;
                        toast.show(msg, function () {
                            emitter.fire('success', 'verify', []);    //这里当作成功，让外面清空内容。
                        });

                        return;
                    }



                    var info = {
                        'value': opt.value,
                        'name': data['partner_name'],   //已经存在的伙伴编码会返回伙伴名称。
                    };


                    if (fn) {
                        fn(info);
                    }
                    else {
                        emitter.fire('success', 'verify', [info]);
                    }
                },

                'fail': function (code, msg, json) {
                    KISP.alert('校验服务商编码失败: {0}', msg);
                },

                'error': function () {
                    KISP.alert('校验服务商编码错误: 网络繁忙，请稍候再试');
                },
            });



            api.post({
                'partner_code': opt.value,
                'pid': opt.product['pid'],               //产品实例 ID
            });

        },


        /**
        * 检查商机。
        * 仅针对旗舰版。
        *   opt = {
        *       product: {},    //后台返回的原始的产品信息。
        *   };
        */
        check: function (opt, fn) {
            var api = new API('web/kiso2o/check_opp', {
                proxy: true,
            });

            api.on({
                'request': function () {
                    loading.show('商机校验中...');
                },

                'response': function () {
                    loading.hide();
                },

                'success': function (data, json, xhr) {

                    var info = null;

                    //是不是商机类产品，1为商机产品。
                    if (data['is_opp'] == 1) {
                        info = {
                            'code': data['partner_code'],   //如果是商机类产品会返回伙伴编码，单点登录需要传递。
                            'name': data['partner_name'],   //伙伴的名字，前端弹窗需要。
                        };
                    }

                    emitter.fire('success', 'check', [info]);
                },

                'fail': function (code, msg, json) {
                    KISP.alert('商机校验失败: {0}', msg);
                },

                'error': function () {
                    KISP.alert('商机校验错误: 网络繁忙，请稍候再试');
                },
            });



            api.post({
                'tid': opt.product['tid'],
                'product_code': 'PDM-20180920-11903',   //产品编码，旗舰版需要传递PDM-20180920-11903
            });

        },


        /**
        * 获取跳转到 kis-o2o 的链接。
        *   opt = {
        *       value: '',      //可选，服务商编码。
        *       product: {},    //必选，后台返回的原始的产品信息。
        *   };
        */
        getUrl: function (opt) {

            var api = new API('web/kiso2o/login_by_kisyun', {
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

                    var url = data.url;

                    emitter.fire('success', 'url', [url, defaults]);

                },

                'fail': function (code, msg, json) {

                    KISP.alert(msg);
                },

                'error': function () {
                    KISP.alert('获取跳转到 KIS-O2O 的链接错误: 网络繁忙，请稍候再试');
                },
            });


            api.post({
                'type': 3,                          //1为公有云产品加站加模或者减站减模，2为公有云产品续费即续租，3为新购。
                'pid': opt.product['pid'],          //产品实例 ID
                'partner_code': opt.value || '',    //服务商编码。
                'test': defaults.test,              //为了区分跳到不同的环境。
            });
        },

    };


});


KISP.panel('/Products/Buy/Content', function (require, module, panel) {


    panel.on('init', function () {

      


        panel.$on('click', {
            '[data-cmd="verify"]': function () {
                var value = panel.$.find('input').val();

                if (!value) {
                    KISP.alert('请输入服务商编码。');
                    return;
                }

                panel.fire('verify', [value]);
            },
        });

        panel.$bind('input', {
            'input': function () {
                

                panel.$.find('[data-id="name"]').hide();
            },

            //开始时设置为只读可以避开浏览器默认的自动填充功能。
            //点击后才设置成可输入状态。
            'click': function () {
                if (this.readOnly) {
                    this.readOnly = false;
                }
            },
            'blur': function () {
                this.value = this.value.split(' ').join(''); //去掉空格。
                this.readOnly = true;
            },
        });

    });



    panel.on('render', function (data) {
        data = data || {};

        
        //清空上次可能留下的内容。
        panel.fill({
            'value': data.value || '',
            'name': data.name || '',
            'name-display': data.name ? '' : 'display: none;',
        });


        

    });





    return {
        get: function () {
            var value = panel.$.find('input').val();

            return value || '';
        },
    };
   

});









KISP.panel('/Products/Buy/Footer', function (require, module, panel) {


    panel.on('init', function () {
       
      

        panel.$on('click', {
            '[data-cmd]': function () {
                var cmd = this.dataset['cmd'];

                panel.fire(cmd);
            },
        });
    });



    panel.on('render', function () {

    });


});







/*
* 【我要购买】对话框。
* 即输入服务商编码。
*/
KISP.panel('/Products/Buy', function (require, module, panel) {
    var Content = module.require('Content');
    var Footer = module.require('Footer');
    var API = module.require('API');

    var Dialog = require('Dialog');
    var dialog = null;


    var meta = {
        product: null,  //外面传进来的产品信息。
    };


    panel.set('show', false);


    panel.on('init', function () {

        dialog = Dialog.panel({
            'title': '我要购买',
            'width': 412,
            'resizable': false,
            'z-index': 1023,
       
            'container': panel,
            'content': Content,
            'footer': Footer,
          
        });

      
        dialog.on({
            'render': function () {
                Content.render();
                Footer.render();
            },
        });



        Content.on({
            'verify': function (value) {

                API.verify({
                    'value': value,             //`30755021`
                    'product': meta.product,
                });
            },
        });


        Footer.on({
            'cancel': function () {
                dialog.close();
            },

            'submit': function () {
                var value = Content.get();

                var form = {
                    'value': value,             //`30755021`
                    'product': meta.product,    //产品信息。
                };

                //没有输入值，直接获取 url。
                if (!value) {
                    API.getUrl(form);   //
                    return;
                }


                //输入了值，则先校验。
                API.verify(form, function (data) { //传了回调函数，则不会再触发事件。
                    Content.render(data);

                    setTimeout(function () {
                        API.getUrl(form);   //
                    }, 500);
                });   


            },
        });


        API.on('success', {

            //校验编码成功。
            'verify': function (data) {
                
                Content.render(data);
            },

            //校验商机成功。
            'check': function (data) {
                var code = data ? data.code : '';   //如果是商机类产品会返回伙伴编码，单点登录需要传递。

                var msg = data ? `此订单将由金蝶官方授权服务商【${data.name}】为您提供服务。` : 
                        `<span style="color: red;">此订单将由金蝶为您分配官方授权服务商，</span><p>请在订单支付完成后在订单详情中进行查看。</p>`;

                KISP.confirm(msg, function () {

                    API.getUrl({
                        'value': code,              //伙伴编码，如 `30755021`
                        'product': meta.product,    //产品信息。
                    });
                });
                
            },



            //获取跳转地址成功。
            'url': function (url, defaults) {
                dialog.close();

                if (defaults.test == 1) {
                    window.open(url);
                }
                else {
                    console.log(url);
                }
            },

        });



    });


    /**
    * 渲染。
    *   opt = {
    *       product: {},    //产品信息。
    *   };
    */
    panel.on('render', function (opt) {
        var product = meta.product = opt.product.origin;
        var id = product['product_id'];


        //旗舰版，直接获取 url，不显示对话框。
        if (id == 'S1S052S003') {
            API.check({
                'product': product,
            });

            panel.hide();
        }
        else {
            dialog.render();
            panel.show();
        }

        
       
    });



});








KISP.panel('/Products/Certify/Content', function (require, module, panel) {

    panel.on('init', function () {
       
      
    });



    panel.on('render', function (msg) {
      
        panel.fill({
            'msg': msg,
        });

    });



});









KISP.panel('/Products/Certify/Footer', function (require, module, panel) {


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
* 
*/
KISP.panel('/Products/Certify', function (require, module, panel) {
    var Content = module.require('Content');
    var Footer = module.require('Footer');

    var Dialog = require('Dialog');
    var dialog = null;

    var meta = {
        company: null,
        product: null,
    };

    panel.on('init', function () {

        dialog = Dialog.panel({
            'title': '提示',
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
                Content.render(data);
                Footer.render();
            },
        });

        Footer.on({
            'cancel': function () {
                dialog.close();
            },

            'ok': function () {
                dialog.close();

                panel.fire('ok');
            },
        });

    });


    panel.on('render', function (msg) {
        dialog.render(msg);
        
    });



});







define('/Products/Delete/API', function (require, module, exports) {
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
        * 删除产品。
        */
        post: function (opt) {
            var api = new API('web/product/del_order_product', {
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

                    toast.show('删除成功', function () {
                        emitter.fire('success',  [data]);
                    });

                },

                'fail': function (code, msg, json) {
                    KISP.alert('删除产品失败: {0}', msg);
                    emitter.fire('fail', []);
                    
                },

                'error': function () {
                    KISP.alert('删除产品错误: 网络繁忙，请稍候再试');
                },
            });


            var company = opt.company.origin;
            var product = opt.product.origin;

            api.post({
                'tid': company['tid'],                  //用户企业 ID
                'prod_id': product['prod_id'],         //产品ID。
            });

        },


    };


});


KISP.panel('/Products/Delete/Content', function (require, module, panel) {

    panel.on('init', function () {
       
      
    });



    panel.on('render', function (product) {
        
        panel.fill({
            'name': product.name,
        });

    });

});









KISP.panel('/Products/Delete/Footer', function (require, module, panel) {


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
* 删除产品对话框。
*/
KISP.panel('/Products/Delete', function (require, module, panel) {

    var Content = module.require('Content');
    var Footer = module.require('Footer');
    var API = module.require('API');

    var Dialog = require('Dialog');
    var dialog = null;

    var meta = {
        company: null,
        product: null,
    };

    panel.on('init', function () {

        dialog = Dialog.panel({
            'title': '删除产品',
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
                Content.render(data.product);
                Footer.render();
            },
        });

  

        API.on({
            'success': function () {
                dialog.close();
                panel.fire('success');
            },
            'fail': function () {
                dialog.close();
            },
        });


        Footer.on({
            'ok': function () {
                API.post(meta);
            },
            'cancel': function () {
                dialog.close();
            },
        });

    });


    panel.on('render', function (data) {
        meta = data;
        dialog.render(data);
       
    });



});







define('/Products/Detail/API', function (require, module, exports) {
    var $ = require('$');
    var KISP = require('KISP');
    var API = require('API');
    var Emitter = KISP.require('Emitter');

    var emitter = new Emitter();

    var loading = KISP.create('Loading', {
        mask: 0,
    });

    var toast = null;


    return {
        'on': emitter.on.bind(emitter),

        get: function (opt) {
            var api = new API('web/product/get_product_detail', {
                proxy: true,
            });

            api.on({
                'request': function () {
                    loading.show();
                },

                'response': function () {
                    loading.hide();
                },

                'success': function (data, json, xhr) {

                    emitter.fire('success', [data]);

                },

                'fail': function (code, msg, json) {
                    KISP.alert('获取产品详情失败: {0}', msg);
                },

                'error': function () {
                    KISP.alert('获取产品详情错误: 网络繁忙，请稍候再试');
                },
            });

            api.post(opt);

        },


    };


});


KISP.panel('/Products/Detail/Content', function (require, module, panel) {

    
    var API = module.require('API');


    panel.on('init', function () {
        panel.template({
            '': function (data) {
                
                return {
                    'proNum': data['product_sn'],
                    'proName': data['product_name'],
                    'startTime': data['active_time'],
                    'endTime': data['expire_time'],
                    'num': data['account_num'],
                    'userNum': data['user_num'],
                    'hasMode': data['buy_models'],
                    'noMode': data['other_models'],
                    'tip': data['remark'],
                }
            }
        });

    });



    panel.on('render', function (data) {

        panel.fill(data);

    });




});









KISP.panel('/Products/Detail/Footer', function (require, module, panel) {


    panel.on('init', function () {
       
        panel.$.on('click', 'button', function () {

            panel.fire('ok');
        });

    });



    panel.on('render', function () {

    });


});







/*
* 产品详情对话框。
*/
KISP.panel('/Products/Detail', function (require, module, panel) {

    var Content = module.require('Content');
    var Footer = module.require('Footer');
    var API = module.require('API');

    var Dialog = require('Dialog');
    var dialog = null;

    var meta = {
        item: null,
    };


    panel.on('init', function () {

        dialog = Dialog.panel({
            'title': '产品详情',
            'width': 650,
            'z-index': 1023,
            'height': 510,
            'resizable': false,
            'container': panel,
            'content': Content,
            'footer': Footer,
        });


        dialog.on({
            'render': function () {
                API.get({
                    'tid': meta.item.origin['tid'],
                    'prod_id': meta.item.origin['prod_id'],
                });
            },
        });

        API.on({
            'success': function (data) {
                Content.render(data);
                Footer.render();
            },
        });


        Footer.on({
            'ok': function () {
                dialog.close();
            },
        });

    });


    panel.on('render', function (item) {

        meta.item = item;

        dialog.render();


    });



});







define('/Products/Trial/API', function (require, module, exports) {
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
        * 免费试用。
        */

        post: function (product) {
            var api = new API('web/product/try_product', {
                proxy: true,
            });

            api.on({
                'request': function () {
                    loading.show('试用提交中...');
                },

                'response': function () {
                    loading.hide();
                },

                'success': function (data, json, xhr) {
                    emitter.fire('success', [json.msg]);
                },

                'fail': function (code, msg, json) {
                    if (code == '405') {
                        emitter.fire('certify',[msg]);
                        return;
                    }

                    KISP.alert('免费试用失败: {0}', msg);
                    emitter.fire('fail');
                },


                'error': function () {
                    KISP.alert('免费试用错误: 网络繁忙，请稍候再试');
                },
            });


            product = product.origin;

            api.post({
                'tid': product['tid'],
                'prod_id': product['prod_id'],
            });

        },





    };


});


KISP.panel('/Products/Trial/Content', function (require, module, panel) {

    var status$text = {
        '0': '未认证',
        '3': '未通过审核（认证失败）',
    };


    panel.on('init', function () {
       
      
    });



    panel.on('render', function (status) {

        var text = status$text[status];

        panel.fill({
            'text': text,
        });

    });



});









KISP.panel('/Products/Trial/Footer', function (require, module, panel) {


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
* 试用产品对话框。
*/
KISP.panel('/Products/Trial', function (require, module, panel) {
    var KISP = require('KISP');

    var Content = module.require('Content');
    var Footer = module.require('Footer');
    var API = module.require('API');

    var Dialog = require('Dialog');
    var dialog = null;

    var meta = {
        product: null,
    };



    panel.on('init', function () {

        dialog = Dialog.panel({
            'title': '提示',
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

                Content.render(data.status);

                Footer.render();
            },
        });



        API.on({
            'success': function (msg) {
                KISP.alert(msg, function () {
                    dialog.close();

                    panel.fire('success');
                })
            },

            'fail': function () {
                dialog.close();
            },

            'certify': function (msg) {
                panel.fire('certify', [msg]);
            },
        });


        Footer.on({
            'ok': function () {
                dialog.close();

                API.post(meta.product);
            },

            'go': function () {
                dialog.close();
                panel.fire('auth');
            },
        });

    });


    /**
    * 
    *   opt = {
    *       company: {},       //
    *       product: {},      //
    *   };
    */
    panel.on('render', function (opt) {
        meta.product = opt.product;


        var status = opt.company.origin['org_status'];

        if (status == 0 || status == 3) {
            dialog.render({
                'status': status,
            });

            return;
        }


        panel.$.addClass('no-dialog');
        API.post(meta.product);

    });



});







/*
* 
*/
KISP.panel('/Products/Header', function (require, module, panel) {
    
    var User = require('User');


    panel.on('init', function () {



        panel.$on('click', {
            '[data-cmd]': function () {
                var cmd = this.getAttribute('data-cmd');
                panel.$.find('[data-type="add-bar"]').removeClass('on');
                panel.fire(cmd);
            },
        });




    });


    panel.on('render', function (company) {

        panel.fill({
            'company': company.name,
        });


    });


    return {
        setList: function (list) {
            var userInfo = User.get();

            panel.$.find('[data-type="add-bar"]').toggleClass('on', !!userInfo);
        
        }
    }

});







/*
* 
*/
KISP.panel('/Products/Main', function (require, module, panel) {
    var API = module.require('API');
    var List = module.require('List');
    var Header = module.require('Header');
    var News = module.require('News');


    var meta = {
        company: null,
    };


    panel.on('init', function () {



        List.on({
            'save': function (item, value) {
                API.save(item, value);
            },

            'kis-o2o': function (type, item) {
                API.o2o(type, item);
            },

          

            'cmd': {
                '': function (cmd, item) {
                    panel.fire('cmd', cmd, [item]);
                },

                'update': function (item) {
                    API.update({
                        'company': meta.company,
                        'product': item,
                    });
                },
                'change': function (item) {
                    API.change({
                        'tid': item.origin.tid,
                        'prodid': item.origin['prod_id'],
                    });
                },
                'to-pub': function (item) {
                    API.toPub({
                        'tid': item.origin.tid,
                        'prodid': item.origin['prod_id'],
                        'type': 1,
                    });
                },

                'free-test': function (item) {

                    panel.fire('trial', [item]);

                   
                },
                
                
            },
        });



        API.on('success', {
            'get': function (list) {

                //只要发现有一项是需要隐藏的，即认为是需要隐藏。
                var hasHide = list.some(function (item, index) {
                    return !!item.hide;
                });
                
                Header.render(hasHide);
                List.render(list, hasHide);
                News.render(list);

                panel.fire('get-list', [list]);
            },

            //更新产品成功后/切换为私有云/启用公有云/修改产品名称后，需刷新列表。
            'refresh': function () {
                API.get(meta);
            },

            //获取跳转到 kis-o2o 链接成功。
            'kis-o2o': function (url, defaults) {
                if (defaults.test == 1) {
                    window.open(url);
                }
                else {
                    console.log(url);
                }
            },
        });

    });



    panel.on('render', function (company) {
        meta.company = company;
        API.get(meta);
    });



    return {

    };

});







/*
* 某个企业下的产品列表。
*/
KISP.view('/Products', function (require, module, view) {
    var Header = module.require('Header');
    var Main = module.require('Main');
    var Active = module.require('Active');
    var Buy = module.require('Buy');
    var Add = module.require('Add');
    var Delete = module.require('Delete');
    var Detail = module.require('Detail');
    var Certify = module.require('Certify');
    var Trial = module.require('Trial');



    var meta = {
        company: null,
    };



    view.on('init', function () {

        Header.on({
            //跳到根节点，即我的企业，不需要传数据。
            'company-list': function () {
                view.fire('company-list');
            },

            //刷新产品列表。
            'product-list': function () {
                Main.render(meta.company);
            },

            //添加产品。
            'add-product': function () {
                Add.render(meta.company);
            },
        });

        Main.on({
            'get-list': function (list) {
                Header.setList(list);
            },

            //试用。
            'trial': function (item) {
                Trial.render({
                    'company': meta.company,
                    'product': item,
                });
            },
        });


        Main.on('cmd', {
            //账套备份列表。
            'baks': function (item) {
                view.fire('account-baks', [{
                    'company': meta.company,
                    'product': item,
                }]);
            },
            //在线用户列表。
            'users': function (item) {
                view.fire('users', [{
                    'company': meta.company,
                    'product': item,
                }]);
            },
            //应用列表。
            'app-list': function (item) {
                view.fire('app-list', [{
                    'company': meta.company,
                    'product': item,
                }]);
            },
            //激活产品。
            'active': function (item) {
                Active.render({
                    'company': meta.company,
                    'product': item,
                });
            },

            //我要购买，即新购。
            'buy': function (item) {
                Buy.render({
                    'product': item,
                });
            },

            //创建账套。
            'create': function (item) {
                view.fire('create-account', [{
                    'company': meta.company,
                    'product': item,
                }]);
            },
            //跳转到账套列表。
            'list': function (item) {
                view.fire('account-list', [{
                    'company': meta.company,
                    'product': item,
                }]);
            },
            //产品详情。
            'detail': function (item) {
                Detail.render(item);
            },
            //删除产品。
            'delete': function (item) {
                Delete.render({
                    'company': meta.company,
                    'product': item,
                });
            },
        });



        Add.on({
            //添加产品成功，刷新产品列表。
            'success': function () {
                Main.render(meta.company);
            },
        });

        Active.on({
            //激产品成功，刷新产品列表。
            'success': function () {
                Main.render(meta.company);
            },
        });



        Delete.on({
            //删除成功，刷新产品列表。
            'success': function (data) {
                Main.render(meta.company);
            },
        });


        Certify.on({
            //跳到企业认证。
            'ok': function () {
                view.fire('auth', [meta.company]);
            },
        });


        Trial.on({
            'certify': function (msg) {
                Certify.render(msg);
            },

            //跳到企业认证。
            'auth': function () {
                view.fire('auth', [meta.company]);
            },

            //试用成功。
            'success': function () {
                Main.refresh();
            },
        });

    });


    /**
    * 渲染。
    *   data = {
    *       company: {},    //企业信息。
    *   };
    */
    view.on('render', function (data) {
        var company = meta.company = data.company;

        Header.render(company);
        Main.render(company);
    });




});





