
define('/Companys/Auth/API', function (require, module, exports) {
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

        /**
        * 获取企业云平台认证企业的单点登录接口。
        */
        get: function (companyId) {
            var api = new API('web/user/auth_enterprise', {
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
                    var url = data['redirect_url'];

                    emitter.fire('success', [url]);

                },

                'fail': function (code, msg, json) {
                    KISP.alert('获取企业云平台认证企业的单点登录接口失败: {0}', msg);
                },

                'error': function () {
                    KISP.alert('获取企业云平台认证企业的单点登录接口错误: 网络繁忙，请稍候再试');
                },
            });

            api.post({
                'tid': companyId,
            });

        },


    };


});

define('/Companys/Main/API', function (require, module, exports) {
    var $ = require('$');
    var KISP = require('KISP');
    var API = require('API');
    var Emitter = KISP.require('Emitter');

    var emitter = new Emitter();
    var loading = null;

    var toast = KISP.create('Toast', {
        duration: 1500,
        mask: 0,
    });



    return {
        'on': emitter.on.bind(emitter),

        get: function (data) {
            var api = new API('web/login/get_enterprise_list', {
                proxy: true,
            });

            api.on({
                'request': function () {
                    loading = loading || KISP.create('Loading', {
                        mask: 0,
                    });

                    loading.show();
                },

                'response': function () {
                    loading.hide();
                },

                'success': function (data, json, xhr) {
                    var list = data.map(function (item) {

                        return {
                            'avatar': item['avatar'],               //企业头像。
                            'name': item['name'],                   //企业名字。
                            'count': item['use_prod_num'] || 0,     //使用产品数量。
                            'status': item['org_status'],           //企业认证状态，0为未认证，1为审核中，2通过认证，3未通过审核（认证失败）。
                            'proNum': item['prod_num'],             //产品实例数量。
                            'origin': item,
                        };

                    });

                    emitter.fire('success', [list]);



                },

                'fail': function (code, msg, json) {
                    KISP.alert('获取企业列表失败: {0}', msg, function () {
                        var list = [];
                        emitter.fire('success', [list]); //这里发送个空列表。
                    });

                },

                'error': function () {
                    KISP.alert('获取企业列表错误: 网络繁忙，请稍候再试');
                },
            });

            api.post();

        },
        delete: function (data) {
            var api = new API('web/org/to_del', {
                //proxy: true,
            });

            api.on({
                'request': function () {
                    loading = loading || KISP.create('Loading', {
                        mask: 0,
                    });

                    loading.show();
                },

                'response': function () {
                    loading.hide();
                },

                'success': function (data, json, xhr) {

                    toast.show('删除常用企业成功', function () {
                        emitter.fire('delete-success');
                    });

                },

                'fail': function (code, msg, json) {
                    KISP.alert('删除常用企业失败: {0}', msg, function () {
                        var list = [];
                        emitter.fire('success', [list]); //这里发送个空列表。
                    });

                },

                'error': function () {
                    KISP.alert('删除常用企业错误: 网络繁忙，请稍候再试');
                },
            });
            api.post({
                'tid': data.origin.tid,
            });

        },

    };


});


KISP.panel('/Companys/Main/List', function (require, module, panel) {
    
    var User = require('User');


    var list = [];



    panel.on('init', function () {
        panel.template(function (item, index) {
            return {
                'index': index,
                'avatar': item.avatar || 'style/img/bk1.png',
                'name': item.name,
                'count': item.count,
                'status': item.status,
                'show': item.proNum ? '' : 'show',
            };
        });
    });


    panel.on('init', function () {

        panel.$on('click', {
            '[data-cmd]': function (event) {
                event.stopPropagation();

                var index = +this.getAttribute('data-index');
                var type = this.getAttribute('data-cmd');
                var item = list[index];

                panel.fire(type, [item]);
            },

            'li[data-index]': function (event) {
                var index = +this.getAttribute('data-index');
                var item = list[index];

                panel.fire('item', [item]);
            },

        });

    });



    /**
    */
    panel.on('render', function (items) {



        list = items;
        panel.fill(list);
        var userInfo = User.get();
        if (userInfo) {
            panel.$.find('[data-type="0"]').addClass('on');
            return;
        }
        panel.$.find('[data-type="0"]').removeClass('on');



    });




});

define('/Companys/Register/API', function (require, module, exports) {
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

        /**
        * 获取企业云平台注册企业的单点登录接口。
        */
        get: function (data) {
            var api = new API('web/user/reg_enterprise', {
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
                    var url = data['redirect_url'];

                    emitter.fire('success', [url]);

                },

                'fail': function (code, msg, json) {
                    KISP.alert('获取企业云平台注册企业的单点登录接口失败: {0}', msg);
                },

                'error': function () {
                    KISP.alert('获取企业云平台注册企业的单点登录接口错误: 网络繁忙，请稍候再试');
                },
            });

            api.post();

        },


    };


});

/*
* 认证企业。
*/
KISP.panel('/Companys/Auth', function (require, module, panel) {
    
    var Redirect = require('Redirect');

    var API = module.require('API');

    var meta = {
        company: null,
    };


    panel.on('init', function () {

        API.on({
            'success': function (url) {
                panel.fire('success', [{
                    'company': meta.company,
                    'url': url,
                }]);
            },
        });
       

    });


    panel.on('render', function (company) {
        var id = company.origin['tid'];

        meta.company = company;
        API.get(id);
    });



});







/*
* 
*/
KISP.panel('/Companys/Header', function (require, module, panel) {
    


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
KISP.panel('/Companys/Main', function (require, module, panel) {
    var KISP = require('KISP');

    var API = module.require('API');
    var List = module.require('List');

    var User = require('User');

    panel.on('init', function () {

        List.on({
            'item': function (item) {
                panel.fire('item', [item]);
            },
            'auth': function (item) {
                panel.fire('auth', [item]);
            },
            'delete': function (item) {
              
                KISP.confirm('确认要删除当前企业吗？删除后我的企业界面将不显示该企业信息，如要再次显示需重新添加',function () { 
                    API.delete(item);
                })
            }


        });

        API.on({
            'success': function (list) {
                if (!list.length) {
                    panel.fire('no-company');            //无添加企业则跳转到添加企业
                    return;
                }
                List.render(list);

                panel.$.toggleClass('no-company', list.length == 0);

            },
            'delete-success': function () {
                API.get();
            }

        });



        panel.$on('click', {
            '[data-cmd]': function () {
                var cmd = this.getAttribute('data-cmd');
                panel.$.find('[data-type="company-list"]').removeClass('on');
                panel.fire(cmd);
            },
        });

    });


    panel.on('render', function () {
        API.get();
        var userInfo = User.get();
        if (userInfo) {
            panel.$.find('[data-type="register"]').addClass('on');
            return;
        }
        panel.$.find('[data-type="register"]').removeClass('on');

    });



});







/*
* ----暂时作废。
*/
KISP.panel('/Companys/Register', function (require, module, panel) {
    
    var Redirect = require('Redirect');

    var API = module.require('API');


    panel.on('init', function () {

        API.on({
            'success': function (url) {
                Redirect.set(module.id, url);
            },
        });
       

    });


    panel.on('render', function () {
        //先清空，避免使用到上次关闭前的值。
        Redirect.reset(module.id);

        API.get();
    });



});







/*
* 企业列表。
*/
KISP.view('/Companys', function (require, module, view) {

    var Header = module.require('Header');
    var Main = module.require('Main');
    var Register = module.require('Register');
    var Auth = module.require('Auth');

    view.on('init', function () {

        Header.on({
            //刷新企业列表。
            'company-list': function () {
                Main.render();
            },

            //添加企业。
            'add-company': function () {
                //Register.render();
                view.fire('add-company');
            },
        });


        Main.on({
            'item': function (item) {
                view.fire('item', [item]);
            },
            'no-company': function () { 
                view.fire('no-company');
            },
            //注册企业。
            'register': function () {
                //Register.render();
                view.fire('register');
            },

            //认证企业。
            'auth': function (item) {
                Auth.render(item);
                view.fire('auth', [item]);
            },
        });

        Auth.on({
            'success': function (data) {
                //window.open(data.url);
                //view.fire('auth', [data]);
            },
        });


    });


    view.on('render', function () {
        Header.render();
        Main.render();

        

    });



});





