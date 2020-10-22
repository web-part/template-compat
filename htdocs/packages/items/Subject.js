
define('/Subject/Apps/API', function (require, module, exports) {
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
        *   account: {},    //可选，选中的账套。 如果不指定，则由后台去获取最近使用的那个账套的。
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
                    //总的要填充的列表，产品为第一项。
                    var list = [product, ...apps];

                    //emitter.fire('get', 'list', []);
                    emitter.fire('get', 'list', [account, list]);

                },

                'fail': function (code, msg, json) {
                    //没有产品账套可用。
                    if (code == 400) {
                        emitter.fire('get', 'list', []);
                    }
                    else {
                        KISP.alert('获取账套的应用列表失败: {0}', msg);
                    }
                },

                'error': function () {
                    KISP.alert('获取账套的应用列表错误: 网络繁忙，请稍候再试');
                },
            });


            api.post({
                'acctid': account ? account['acctid'] : '',
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


KISP.panel('/Subject/Apps/List', function (require, module, panel) {
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
        list = items || [];
        panel.fill(list);
    });




});

define('/Subject/Main/API', function (require, module, exports) {
    var KISP = require('KISP');
    var API = require('API');

    var emitter = KISP.create('Emitter');

    var loading = KISP.create('Loading', {
        mask: 0,
    });





    return {
        'on': emitter.on.bind(emitter),

        /**
        * 获取产品账套列表。
        */
        get: function () {

            var api = new API('service/kiswebapp/web_prod_acctinfo', {
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
                    var companys = data['orgdata'] || [];   //企业列表。
                    var accounts = [];                      //账套列表。


                    //把企业的名称按字典排序，会影响当前数组本身。
                    companys.sort(function (a, b) {
                        return a.name > b.name ? 1 : -1
                    });


                    companys = companys.map(function (company) {
                        //当前企业下的账套列表。
                        var accts = company['acctdata'] || [];

                        //按使用次数倒序。
                        accts.sort(function (a, b) {
                            return a['acctloginnum'] > b['acctloginnum'] ? -1 : 1;
                        });

                        accts = accts.map(function (account) {
                            return {
                                'isMax': false,
                                'account': account,
                                'company': company,
                            };
                        });

                        //合并到总的账套列表。
                        accounts = [...accounts, ...accts];

                        return {
                            'company': company,
                            'accounts': accts,
                        };
                    });



                    //总的账套列表按使用次数倒序。
                    accounts.sort(function (a, b) {
                        return a.account['acctloginnum'] > b.account['acctloginnum'] ? -1 : 1;
                    });


                    //总列表里，第一项就是最大值的。
                    if (accounts[0]) {
                        accounts[0].isMax = true; //标识为最大值的。 同时会影响 companys 里面的那一项。 因为是同一个引用对象。
                    }


                    emitter.fire('get', 'list', [companys, accounts]);

                },

                'fail': function (code, msg, json) {
                    KISP.alert('获取账套列表失败: {0}', msg);
                },

                'error': function () {
                    KISP.alert('获取账套列表错误: 网络繁忙，请稍候再试');
                },
            });

            api.post();

        },


    };


});


KISP.panel('/Subject/Main/ByAccounts', function (require, module, panel) {
    var KISP = require('KISP');
    var list = [];

   

    panel.on('init', function () {
        panel.set('template', panel.$.find('[data-id="list"]'));


        panel.template(function (item, index) {
            var account = item.account;
            var company = item.company;


            return {
                'index': index,
                'account': account['acctname'],
                'product': account['productname'],
                'company': company['name'],

                'expire-class': account['expire'] == 'Y' ? 'expire' : '',   //是否已过期。
                'recent-used-class': account['recent'] == 'Y' ? 'on' : '',  //是否为最近使用的，只能有一项。
                'max-used-class': item.isMax ? 'has-lab' : '',              //是否为使用最多的，只能有一项。
            };
        });

        panel.$on('click', {
            'li[data-index]': function (event) {
                var index = +this.getAttribute('data-index');
                var item = list[index];


                panel.$.find(`li[data-index]`).removeClass('on'); //先移除上一次高亮的。
                $(this).addClass('on');

                panel.fire('item', [item]);
            },
        });
    });






    /**
    */
    panel.on('render', function (accounts) {


        list = accounts;
        panel.fill(list);


    });




});

/**
* 以企业进行分组进行展示。
*/
KISP.panel('/Subject/Main/ByCompanys', function (require, module, panel) {
    var KISP = require('KISP');


    var list = [];





    panel.on('init', function () {
        panel.template({
            '': function (data) {
                var groups = this.fill('group', data.groups);
                return {
                    'groups': groups,
                };
            },

            'group': {
                '': function (group, no) {
                    var company = group.company;
                    var items = this.fill('item', group.accounts, no);

                    return {
                        'company': company['name'],
                        'items': items,
                    };

                },

                'item': function (item, index, no) {
                    var account = item.account;

                    return {
                        'no': no,
                        'index': index,

                        'account': account['acctname'],
                        'product': account['productname'],


                        'expire-class': account['expire'] == 'Y' ? 'expire' : '',   //是否已过期。
                        'recent-used-class': account['recent'] == 'Y' ? 'on' : '',  //是否为最近使用的，只能有一项。
                        'max-used-class': item.isMax ? 'has-lab' : '',              //是否为使用最多的，只能有一项。

                    };
                },
            },
        });


        panel.$on('click', {
            'li[data-index]': function (event) {
                var no = +this.getAttribute('data-no');
                var index = +this.getAttribute('data-index');
                var group = list[no];
                var item = group.accounts[index];


                panel.$.find(`li[data-index]`).removeClass('on'); //先移除上一次高亮的。
                $(this).addClass('on');

                panel.fire('item', [item]);
            },
        });
    });


   



    /**
    */
    panel.on('render', function (companys) {

        list = companys;

        panel.fill({
            'groups': list,
        });


    });




});

/*
* 
*/
KISP.panel('/Subject/Main/Tabs', function (require, module, panel) {
    var KISP = require('KISP');


    var list = [
        { text: '按账套展示', cmd: 'accounts', },
        { text: '按公司展示', cmd: 'companys', },
    ];

    var tabs = null;


    /**
    * 初始化时触发。
    * 即首次 render 之前触发，且仅触发一次。
    * 适用于创建实例、绑定事件等只需要执行一次的操作。
    */
    panel.on('init', function () {
        tabs = KISP.create('Tabs', {
            container: panel.$,
            selector: '>li',
            activedClass: 'on',
            eventName: 'click',
        });

        tabs.on('change', function (item, index) {
            item = list[index];
            panel.fire(item.cmd);
        });

        tabs.template(function (item, index) {
            return {
                'index': index,
                'text': item.text,
            };
        });
        

    });



    /**
    * 渲染时触发。
    * 即外界显式调用 render() 时触发，且每次调用都会触发一次。
    * 外界传进来的参数会原样传到这里。
    */
    panel.on('render', function (index) {
        index = index || 0;
        tabs.render(list);

        tabs.active(index);

    });




});





/*
* 
*/
KISP.panel('/Subject/Apps', function (require, module, panel) {
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
                panel.fire('render', [account]);
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
* 
*/
KISP.panel('/Subject/Header', function (require, module, panel) {
    var KISP = require('KISP');


    panel.on('init', function () {
        panel.set('show', false);

        panel.$on('click', {
            '[data-cmd]': function () {
                var cmd = this.getAttribute('data-cmd');

                panel.fire(cmd);
            },

           
        });

    
    });



    /**
    * 渲染。
    *   account = { //后台返回的当前使用的账套数据。
    *       
    *   };
    */
    panel.on('render', function (account) {
        if (!account) {
            panel.hide();
            return;
        }


        panel.fill({
            'name': account.name,
        });

        panel.show();

    });




    return {
        /**
        * 根据外面的内容的显示状态来激活 `on` 类。
        * 以使图标向下或向上。
        */
        active: function (visible) {
            panel.$.find('[data-cmd="main"]').toggleClass('on', !!visible);
        },
    };

});







/*
* 
*/
KISP.panel('/Subject/Main', function (require, module, panel) {
    var KISP = require('KISP');
    var API = module.require('API');
    var Tabs = module.require('Tabs');
    var ByCompanys = module.require('ByCompanys');
    var ByAccounts = module.require('ByAccounts');


    var meta = {
        companys: [],
        accounts: [],
    };



    function hide(fn) {
        panel.$.removeClass('on');

        setTimeout(function () {
            panel.hide();
            panel.fire('visible', [false]);
            fn && fn();
        }, 300);
    }


    function show(fn) {
        panel.show();
        panel.$.addClass('on');

        setTimeout(function () {
            panel.fire('visible', [true]);
            fn && fn();
        }, 300);
    }



    panel.on('init', function () {
        panel.set('show', false);

        Tabs.on({
            //按企业。
            'companys': function () {
                ByCompanys.render(meta.companys);
                ByAccounts.hide();
            },

            //按账套。
            'accounts': function () {
                ByCompanys.hide();
                ByAccounts.render(meta.accounts);
            },
        });


        //企业列表。
        ByCompanys.on({
            'item': function (item) {

                panel.fire('item', [item]);

            },
        });

        //账套列表。
        ByAccounts.on({
            'item': function (item) {

                panel.fire('item', [item]);

            },
        });

        API.on('get', {
            //获取列表成功。
            'list': function (companys, accounts) {
                meta.companys = companys;
                meta.accounts = accounts;

                show(function () {
                    Tabs.render(0);
                    panel.$.find('[data-id="content"]').toggleClass('no-dataspe', !accounts.length);
                });

            },

        });


        panel.$on('click', '[data-cmd="{value}"]', {
            //关闭按钮。
            'close': function (event) {
                hide();
            },
        });



    });



    /**
    * 渲染。
    */
    panel.on('render', function () {
        var visible = panel.visible();

        //当前是可见的。
        if (visible) {
            hide();
        }
        else {
            API.get();
        }

    });


    return {
        //让应用列表先加载渲染完，再手动调用本 hide()。
        'hide': hide,
    };

});







/*
* 我的账套。
*/
KISP.view('/Subject', function (require, module, view) {
    var Header = module.require('Header');
    var Apps = module.require('Apps');
    var Main = module.require('Main');
    var Account = module.require('Account');
    

    /**
    * 
    */
    view.on('init', function () {
        Header.on({
            //切换到账套列表。
            'main': function () {
                Main.render();
            },
           
        });


        Apps.on({

            'render': function (account) {
                view.$.toggleClass('no-dataspe', !account);

                Header.render(account);
                Main.hide();
            },

            //点击了产品信息，打开对应的账套。
            'product': function (data) {
                view.fire('product', [data]);
            },

            //获取应用的跳转地址成功。
            'url': function (url) {
                view.fire('url', [url]);
            },
        });


        Main.on({
            'visible': function (visible) {
                Header.active(visible); //修改图标向下或向上。
            },

            //点击了某个账套，加载相应的应用列表。
            'item': function (item) {
                Apps.render(item.account);
            },
        });
    });


    /**
    * 
    */
    view.on('render', function () {
        //加载默认的账套的应用列表。
        Apps.render();

    });




});



