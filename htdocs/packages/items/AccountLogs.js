
define('/AccountLogs/Main/Accounts/API', function (require, module, exports) {
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
        * 获取账套删除记录列表。
        *   opt = {
        *       company: {},    //企业信息。
        *   };
        */
        get: function (opt) {

            var api = new API('web/product/get_account_del_log', {
                'proxy': true,
            });

            api.on({
                'request': function () {
                    loading.show();
                },

                'response': function () {
                    loading.hide();
                },

                'success': function (data, json, xhr) {

                    var list = data || [];

                    list = list.map(function (item) {

                        return {
                            'datetime': item['del_time'],   //删除日期
                            'operator': item['operator'],   //操作人。
                            'number': item['account_num'],  //账套号。
                            'name': item['account_name'],   //账套名字。
                            'phone': item['admin_mobile'],  //删除账套的短信验证手机号码。
                            'user': item['admin_name'],     //删除账套的短信验证人。
                            'ip': item['server_ip'],        //服务器IP。
                            'origin': item,
                        };
                    });

                    emitter.fire('success', 'get', [list]);

                },

                'fail': function (code, msg, json) {
                    KISP.alert('获取账套删除记录失败: {0}(错误码: {1})', msg, code);
                },

                'error': function () {
                    KISP.alert('获取账套删除记录错误: 网络繁忙，请稍候再试');
                },
            });


            api.post({
                'tid': opt.company.origin['tid'],   //企业 id。
                'type': 1,                          //删除的类型，1为删除账套的记录，2为删除账套备份文件记录
            });

        },

       
      

    };


});


KISP.panel('/AccountLogs/Main/Accounts/List', function (require, module, panel) {
    
    

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
                    var rows = this.fill('row', data.items);

                    return {
                        'rows': rows,
                    };
                },

                'row': function (item, index) {
                    var phone = item.phone;
                    var user = item.user;
                    var verifier = phone;

                    if (user) {
                        verifier += '/' + user;
                    }

                    return Object.assign({}, item, {
                        'index': index,
                        'verifier': verifier,
                    });

                  

                },
            },
        });
    });


 


    /**
    */
    panel.on('render', function (items) {

        list = items;

        panel.fill({
            'items': items,
        });

        panel.$.toggleClass('no-data', !items.length);

    });

   


});

define('/AccountLogs/Main/Baks/API', function (require, module, exports) {
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
        * 获取账套备份文件删除记录列表。
        *   opt = {
        *       company: {},    //企业信息。
        *   };
        */
        get: function (opt) {
           

            var api = new API('web/product/get_account_del_log', {
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

                    var list = data || [];

                    list = list.map(function (item) {

                        return {
                            'datetime': item['del_time'],   //删除日期
                            'operator': item['operator'],   //操作人。
                            //'number': item['account_num'],  //账套号。
                            'name': item['account_name'],   //账套名字。
                            //'phone': item['admin_mobile'],  //删除账套的短信验证手机号码。
                            //'user': item['admin_name'],     //删除账套的短信验证人。
                            'ip': item['server_ip'],        //服务器IP。
                            'origin': item,
                        };
                    });

                    emitter.fire('success', 'get', [list]);

                },

                'fail': function (code, msg, json) {
                    KISP.alert('获取账套备份文件删除记录失败: {0}(错误码: {1})', msg, code);
                },

                'error': function () {
                    KISP.alert('获取账套备份文件删除记录错误: 网络繁忙，请稍候再试');
                },
            });


            api.post({
                'tid': opt.company.origin['tid'],   //企业 id。
                'type': 2,                          //删除的类型，1为删除账套的记录，2为删除账套备份文件记录
            });

        },

       
      

    };


});


KISP.panel('/AccountLogs/Main/Baks/List', function (require, module, panel) {
    
    

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
                    var rows = this.fill('row', data.items);

                    return {
                        'rows': rows,
                    };
                },

                'row': function (item, index) {

                    return Object.assign({}, item, {
                        'index': index,

                    });

                },
            },
        });
    });


 


    /**
    */
    panel.on('render', function (items) {

        list = items;

        panel.fill({
            'items': items,
        });

        panel.$.toggleClass('no-data', !items.length);

    });

   


});


KISP.panel('/AccountLogs/Main/Accounts', function (require, module, panel) {
    var API = module.require('API');
    var List = module.require('List');



    panel.on('init', function () {

        API.on('success', {
            'get': function (list) {
                List.render(list);
            },

        });
    });




    /**
    * 渲染。
    *   data = {
    *       company: {},    //企业信息。
    *   };
    */
    panel.on('render', function (data) {

        API.get(data);

    });

  


});


KISP.panel('/AccountLogs/Main/Baks', function (require, module, panel) {
    
    var API = module.require('API');
    var List = module.require('List');



    panel.on('init', function () {

        API.on('success', {
            'get': function (list) {

                List.render(list);
            },

        });
    });


   




    /**
       * 渲染。
       *   data = {
       *       company: {},    //企业信息。
       *   };
       */
    panel.on('render', function (data) {

        API.get(data);


    });


});

/*
* 
*/
KISP.panel('/AccountLogs/Main/Tabs', function (require, module, panel) {
    var KISP = require('KISP');


    var list = [
       { name: '账套', cmd: 'accounts', },
       { name: '账套备份文件', cmd: 'baks', },
    ];

    var tabs = null;


    /**
    * 初始化时触发。
    * 即首次 render 之前触发，且仅触发一次。
    * 适用于创建实例、绑定事件等只需要执行一次的操作。
    */
    panel.on('init', function () {
        tabs = KISP.create('Tabs', {
            container: panel.$.get(0),
            selector: '>li',
            activedClass: 'on',
            eventName: 'click',
        });

        tabs.on('change', function (item, index) {
            item = list[index];
            panel.fire(item.cmd);

        });



        

    });



    /**
    * 渲染时触发。
    * 即外界显式调用 render() 时触发，且每次调用都会触发一次。
    * 外界传进来的参数会原样传到这里。
    */
    panel.on('render', function (index) {
        index = index || 0;

        tabs.render(list, function (item, index) {
            return {
                'index': index,
                'name': item.name,
            };
        });

        tabs.active(index);

    });




});





/*
* 
*/
KISP.panel('/AccountLogs/Header', function (require, module, panel) {


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
    *   };
    */
    panel.on('render', function (data) {

        panel.fill({
            'company': data.company.name,
        });
        
    });



});







/*
* 
*/
KISP.panel('/AccountLogs/Main', function (require, module, panel) {
    

    var Tabs = module.require('Tabs');

    var Accounts = module.require('Accounts');
    var Baks = module.require('Baks');


    var meta = {
        company: null,
    };


    panel.on('init', function () {


        Tabs.on({
            'accounts': function () {
                Accounts.render(meta);
                Baks.hide();
            },
            'baks': function () {
                Accounts.hide();
                Baks.render(meta);
            },
        });

    

    });

    /**
    * 渲染。
    *   data = {
    *       company: {},    //企业信息。
    *   };
    */
    panel.on('render', function (data) {

        meta.company = data.company;

        Tabs.render(0);
    });



});







/*
* ɾ����¼�б�
*/
KISP.view('/AccountLogs', function (require, module, view) {
    var Header = module.require('Header');
    var Main = module.require('Main');

    var meta = {
        company: null,
    };


    view.on('init', function () {

        Header.on({
            //�������ڵ㣬���ҵ���ҵ������Ҫ�����ݡ�
            'company-list': function () {
                view.fire('company-list');
            },

            //ˢ���б�
            'refresh': function () {
                Main.render(meta);
            },

        });


    });




    /**
    * ��Ⱦ��
    *   data = {
    *       company: {},    //��ҵ��Ϣ��
    *   };
    */
    view.on('render', function (data) {
        meta = data;

        Header.render(data);
        Main.render(data);
    });



});





