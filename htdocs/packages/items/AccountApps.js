
define('/AccountApps/Main/API', function (require, module, exports) {
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
        *   account: {},    //必选，选中的账套。 后台原始的信息。
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

                    //总的要填充的列表，产品固定为第一项。
                    var list = [product, ...apps];

                    emitter.fire('get', 'list', [account, list]);

                },

                'fail': function (code, msg, json) {
                    KISP.alert('获取账套的应用列表失败: {0}', msg);
                },

                'error': function () {
                    KISP.alert('获取账套的应用列表错误: 网络繁忙，请稍候再试');
                },
            });


            api.post({
                'acctid': account['account_id'],
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


KISP.panel('/AccountApps/Main/List', function (require, module, panel) {
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
            'JGJ': 'jgj',              //KIS 金管家。 前端尚未提供。
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

/*
* 
*/
KISP.panel('/AccountApps/Header', function (require, module, panel) {


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
    *       account: {},    //账套信息。
    *   };
    */
    panel.on('render', function (data) {

        panel.fill({
            'company': data.company.name,
            'product': data.product.name,
            'account': data.account.name,
        });
        
    });



});







/*
* 
*/
KISP.panel('/AccountApps/Main', function (require, module, panel) {
    var KISP = require('KISP');
    var API = module.require('API');
    var List = module.require('List');



    panel.on('init', function () {



        //应用列表。
        List.on('use', {
            'product': function (item) {
                console.log(item);

                //打开账套。
                panel.fire('product', [{
                    'tid': item.origin['tid'],
                    'acctid': item.origin['acctid'],
                }]);
            },

            'app': function (item) {
                console.log(item);
                API.getUrl(item);
            },
        });


        API.on('get', {
            //获取应用列表和账套信息成功。
            'list': function (account, list) {
                List.render(list);
            },

            //获取应用的跳转地址成功。
            'url': function (url) {
                panel.fire('url', [url]);
            },
        });



        panel.$on('click', '[data-cmd="{value}"]', {
            //关闭按钮。
            'close': function (event) {
                panel.$.removeClass('on');
            },
        });



    });



    /**
    * 渲染。
    */
    panel.on('render', function (account) {

        API.get(account);

    });


});







/*
* 某个账套下的应用列表。
* 其实是某个账套所属的产品下的应用列表。
*/
KISP.view('/AccountApps', function (require, module, view) {
    var Header = module.require('Header');
    var Main = module.require('Main');


    var meta = {
        company: null,
        product: null,
        account: null,
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

            //跳到账套列表。
            'account-list': function () {
                view.fire('account-list', [{
                    'company': meta.company,
                    'product': meta.product,
                }]);
            },

            //刷新。
            'refresh': function () {
                Main.render(meta);
            },
            
        });
        

        Main.on({
            //点击了产品信息，打开对应的账套。
            'product': function (data) {
                view.fire('product', [data]);
            },

            //获取应用的跳转地址成功。
            'url': function (url) {
                view.fire('url', [url]);
            },
        });


    });


    /**
    * 渲染。
    *   data = {
    *       company: {},    //必选，企业信息。
    *       product: {},    //必选，产品信息。
    *       account: {},    //必选，账套信息。
    *   };
    */
    view.on('render', function (data) {
        meta = data;

        Header.render(data);
        Main.render(data.account.origin);

    });



});





