
define('/ProductUsers/Main/API', function (require, module, exports) {
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
        * 获取某个产品下的在线用户列表。
        *   opt = {
        *       product: {},    //产品信息。
        *   };
        */
        get: function (opt) {
            

            var api = new API('web/user/get_online_user_list', {
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

                    var type$product = {
                        1: '金蝶KIS云',
                        2: 'KIS云进销存',
                    };

                    list = list.map(function (item, index) {
                        return {
                            'phone': item['FMobile'],
                            'name': item['FRealName'],
                            'account': item['FAcctName'],
                            'product': type$product[item['FType']] || '(未知)',  //用户登录的产品类型，1为KIS云，2为KIS云进销存
                            'origin': item,
                        };
                    });

                    emitter.fire('success', 'get', [list]);

                },

                'fail': function (code, msg, json) {
                    KISP.alert('获取在线用户列表失败: {0}', msg);
                },

                'error': function () {
                    KISP.alert('获取在线用户列表错误: 网络繁忙，请稍候再试');
                },
            });


            api.post({
                'prod_id': opt.product.origin['prod_id'],          //产品 id。
            });

        },


        /**
        * 删除用户。
        * 即踢出指定的在线用户。
        * 参数：
        *   item = { //列表中的指定的项。
        *       
        *   };
        */
        delete: function (item) {

            var api = new API('web/user/get_off_user', {
                proxy: true,
            });

            api.on({
                'request': function () {
                    loading.show('注销中...');
                },

                'response': function () {
                    loading.hide();
                },

                'success': function (data, json, xhr) {
                    toast.show('注销用户成功', function () {
                        emitter.fire('success', 'delete');
                    });
                },

                'fail': function (code, msg, json) {
                    KISP.alert('注销用户失败: {0}', msg);
                },

                'error': function () {
                    KISP.alert('注销用户错误: 网络繁忙，请稍候再试');
                },
            });



            api.post({
                'account_id': item.origin['FAcctID'],           //账套 id。
                'prod_user_id': item.origin['FProdUserID'],     //在线用户 id。
            });

        },
        

    };


});


KISP.panel('/ProductUsers/Main/List', function (require, module, panel) {
    

    var list = [];

    var meta = {
        keyword: '',
    };


    panel.on('init', function () {

        function highlight(value) {
            var keyword = meta.keyword;

            if (!keyword || !value) {
                return value;
            }

            value = value.split(keyword).join(`<span class="keyword">${keyword}</span>`);
            return value;
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

                'row': function (item, index) {
                  

                    return {
                        'index': index,
                        'phone': highlight(item.phone),
                        'name': highlight(item.name),
                        'account': highlight(item.account),
                        'product': highlight(item.product),
                    };

                },
            },
        });
    });


    panel.on('init', function () {

       

        panel.$on('click', {
            '[data-cmd]': function () {
                var index = +this.getAttribute('data-index');
                var cmd = this.getAttribute('data-cmd');
                var item = list[index];

                panel.fire('cmd', cmd,  [item]);

            },

        });

    });



    /**
    *   items = [
    *       {},
    *   ];
    */
    panel.on('render', function (items, keyword) {

        list = items;
        meta.keyword = keyword || '';

        panel.fill({
            'items': items,
        });

        panel.$.toggleClass('no-data', !items.length);

       

    });


    return {
        
    };




});


KISP.panel('/ProductUsers/Main/Search', function (require, module, panel) {
    

    var meta = {
        list: [],   //外面传进来的列表数据，进行内部搜索。
    };




    panel.on('init', function () {
        var keys = ['phone', 'name', 'account', 'product', ];

        function search(keyword) {
            if (!keyword) {
                panel.fire('submit', [meta.list, '']);
            }


            var items = meta.list.filter(function (item) {
                var found = keys.some(function (key) {
                    var value = item[key];
                    if (typeof value != 'string') {
                        return;
                    }

                    return value.includes(keyword);
                });

                return found;
            });

            panel.fire('submit', [items, keyword]);
        }




        panel.$bind('input', {
            'input': function (event) {
                var keyword = panel.$.find('input').val();
                search(keyword);
            },
        });

        panel.$on('click', {
            '[data-cmd="submit"]': function () {
                var keyword = panel.$.find('input').val();
              
                search(keyword);
            },

        });


    });


   



    /**
    * 
    */
    panel.on('render', function (list) {

        meta.list = list;

    });




    return {
        
    };




});

/*
* 
*/
KISP.panel('/ProductUsers/Header', function (require, module, panel) {


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







/*
* 
*/
KISP.panel('/ProductUsers/Main', function (require, module, panel) {
    var KISP = require('KISP');
    var API = module.require('API');
    var List = module.require('List');
    var Search = module.require('Search');


    var meta = {
        company: null,
        product: null,
    };


    panel.on('init', function () {

        Search.on({
            'submit': function (list, keyword) {
                List.render(list, keyword);
            },
        });



        List.on('cmd', {
            //踢除用户。
            'delete': function (item) {
                KISP.confirm(`确认注销在线用户：${item.name}`, function () {
                    API.delete(item);
                });
            },

        });
    


        API.on('success', {
            //获取用户列表成功。
            'get': function (list) {
                Search.render(list);
                List.render(list);
            },

            //踢除用户成功。
            'delete': function () {
                panel.refresh();
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

        API.get(data);

    });



});







/*
* 某个产品下的在线用户列表。
*/
KISP.view('/ProductUsers', function (require, module, view) {
    var Header = module.require('Header');
    var Main = module.require('Main');



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

            //刷新。
            'refresh': function () {
                Main.refresh();
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
      
        meta = data;

        Header.render(data);
        Main.render(data);

    });



});





