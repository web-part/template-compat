
define('/AccountUsers/Main/API', function (require, module, exports) {
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
        * 获取账套用户列表。
        */
        get: function (opt) {

            var api = new API('web/user/get_user_list', {
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

                    list =  list.map(function (item) {
                        return {
                            'phone': item['moblie'],
                            'name': item['user_account_name'],
                            'status': item['status'],           //账套状态，0为禁用，1为启用，2为删除',
                            'role': item['role'],               //用户角色，0、未定义，1、管理员，2普通用户',
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
                'tid': opt.company.origin['tid'],                  //企业 id。
                'prod_id': opt.product.origin['prod_id'],          //账套 id。
                'account_id': opt.account.origin['account_id'],    //产品 id。
            });

        },


        /**
        * 设置用户状态。
        */
        setStatus: function (opt) {

            var api = new API('web/user/change_user_status', {
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
                    emitter.fire('success', 'set', 'status', [opt]);
                },

                'fail': function (code, msg, json) {
                    KISP.alert('设置用户状态失败: {0}', msg);
                },

                'error': function () {
                    KISP.alert('设置用户状态错误: 网络繁忙，请稍候再试');
                },
            });

            api.post({
                'tid': opt.company.origin['tid'],               //企业ID
                'prod_id': opt.product.origin['prod_id'],       //账套ID
                'account_id': opt.account.origin['account_id'], //产品ID
                'account_uid': opt.item.origin['account_uid'],  //需要被禁用的账套用户UID
                'status': opt.enabled ? 1 : 0,                  //用户状态，0为禁用，1为启用，2为删除

            });

        },
        deleteUser: function (opt) {

            var api = new API('web/user/del_user', {
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
                    
                    emitter.fire('success', 'delete',[json]);
                },

                'fail': function (code, msg, json) {
                    KISP.alert('删除用户失败: {0}', msg);
                },

                'error': function () {
                    KISP.alert('删除用户错误: 网络繁忙，请稍候再试');
                },
            });

            api.post(opt);

        },




        /**
        * 设置用户角色。
        */
        setRole: function (opt) {
            var api = new API('web/user/set_user_admin', {
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

                    toast.show('设置成功', function () {
                        emitter.fire('success', 'set', 'role', [opt]);
                    });

                },

                'fail': function (code, msg, json) {
                    KISP.alert('设置用户角色失败: {0}', msg);
                },

                'error': function () {
                    KISP.alert('设置用户角色错误: 网络繁忙，请稍候再试');
                },
            });


            api.post({
                'tid': opt.company.origin['tid'],               //企业ID
                'prod_id': opt.product.origin['prod_id'],       //账套ID
                'account_id': opt.account.origin['account_id'], //产品ID
                'account_uid': opt.item.origin['account_uid'],  //需要被禁用的账套用户UID
                'role': opt.enabled ? 1 : 2,                  //用户角色，'0、未定义，1、管理员，2普通用户',
            });
        },

        /**
        * 修改账套名字。
        */
        save: function (opt) {
            var api = new API('web/user/change_account_user_name', {
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
                        emitter.fire('success','save');
                    });

                },

                'fail': function (code, msg, json) {

                    KISP.alert('保存账套用户名字失败: {0}', msg);
                },

                'error': function () {
                    KISP.alert('保存账套用户名字错误: 网络繁忙，请稍候再试');
                },
            });
            api.post(opt);

        },


    };


});


KISP.panel('/AccountUsers/Main/List', function (require, module, panel) {
    
    var User = require('User');


    var list = [];



    panel.on('init', function () {

        var status$item = {
            0: {
                text: '已禁用',
                class: 'warning',
                enabled: true,
                buttonText: '启用',
                buttonClass: 'primary',

            },
            1: {
                text: '已启用',
                class: 'default',
                enabled: false,
                buttonText: '禁用',
                buttonClass: 'warning',

            },
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

                'row': function (item, index) {
                    var status = item.status;
                    var role = item.role;

                    var statusItem = status$item[status];

                    return {
                        'index': index,
                        'phone': item.phone,
                        'name': item.name,
                        'status': status,
                        'role-enabled': role == 1 ? 'on' : '',
                        'status-text': statusItem.text,
                        'status-text-class': statusItem.class,
                        'button-status-class': statusItem.buttonClass,
                        'button-status-text': statusItem.buttonText,
                        'button-status-enabled': statusItem.enabled,
                        'button-delete-enabled': statusItem.enabled,
                        'button-delete-class': statusItem.enabled ? 'delete' : 'no-delete',
                        'hideEdit': item.status === 0 ? 'hide' : '',
                    };

                },
            },
        });
    });


    panel.on('init', function () {

        panel.$.on('click', '[data-cmd="edit"]', function () {
            var index = +this.getAttribute('data-index');
            var selector = `[data-edit="${index}"]`;
            var $btn = panel.$.find(selector);
            var item = list[index];

            $btn.toggleClass('editbar');

            if ($btn.hasClass('editbar')) {
                panel.$.find(`${selector} input`).val(item.name);
                return;
            }

            var value = panel.$.find(`${selector} input`).val();
            if (item['name'] == value) {
                return;
            }

            panel.fire('save', [item, value]);

        });

        panel.$on('click', {

            '[data-action]': function (event) {
                var action = this.getAttribute('data-action');
                var enabled = this.getAttribute('data-enabled');
                var index = +this.getAttribute('data-index');
                var item = list[index];

                enabled = enabled == 'true';

                panel.$.find('[data-type="0"]').removeClass('on');

                panel.fire('set', action, [enabled, item, index]);
            },


            '[data-cmd="role"]': function () {
                var index = +this.getAttribute('data-index');
                var item = list[index];
                var enabled = item.role == 1;

                enabled = !enabled;

                panel.fire('set', 'role', [enabled, item, index]);

            },

        });

    });



    /**
    *   items = [
    *       {},
    *   ];
    */
    panel.on('render', function (items) {

        list = items;

        panel.fill({
            'items': items,
        });

        panel.$.toggleClass('no-data', !items.length);



        var userInfo = User.get();

        if (userInfo && items.length) {
            panel.$.find('[data-type="0"]').addClass('on');
            return;
        }


        panel.$.find('[data-type="0"]').removeClass('on');

    });


    return {
        setStatus: function (index, enabled) {
            var item = list[index];
            var status = enabled ? 1 : 0;

            //状态没变。
            if (status == item.status) {
                return;
            }


            item.status = status;

            var tpl = panel.template();
            var html = tpl.fill('table', 'row', item, index);
            var tr = 'tr[data-index="' + index + '"]';
            tr = panel.$.find(tr).get(0);


            try { //先尝试用标准的方式刷新表格指定的行。
                tr.outerHTML = html; //IE9 及以下，无法设置 tr.outerHTML，会抛异常。
            }
            catch (ex) {
                panel.render(list); //采用降级方式，刷新整个表格。
            }


        },


        setRole: function (index, enabled) {
            var item = list[index];
            var role = enabled ? 1 : 2;

            //角色没变。
            if (role == item.role) {
                return;
            }


            item.role = role;

            var label = '[data-cmd="role"][data-index="' + index + '"]';
            panel.$.find(label).toggleClass('on', enabled);



        },
    };




});


KISP.panel('/AccountUsers/Main/Search', function (require, module, panel) {
    

    var meta = {
        list: [],   //外面传进来的列表数据，进行内部搜索。
    };




    panel.on('init', function () {
        function search(keyword) {
            if (!keyword) {
                panel.fire('submit', [meta.list, '']);
            }

            var items = meta.list.filter(function (item) {
                return item.phone.includes(keyword) ||
                    item.name.includes(keyword);
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

define('/AccountUsers/Selector/Content/Add/API', function (require, module, exports) {
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


    var msg$text = {
        'Invalid loginname': '非法登录名，请检查手机号是否存在。',
    };


    return {
        'on': emitter.on.bind(emitter),

      

        /**
        * 添加云之家用户。
        */
        post: function (item) {
            var api = new API('web/user/add_yunzhijia_user', {
                proxy: true,
            });

            api.on({
                'request': function () {
                    loading.show('添加中...');
                },

                'response': function () {
                    loading.hide();
                },

                'success': function (data, json, xhr) {


                    emitter.fire('success', 'post', [{
                        'uid': data.uid,
                        'phone': item.phone,
                        'name': item.name,
                        'email': item.email,
                    }]);

                },

                'fail': function (code, msg, json) {
                    msg = msg$text[msg] || msg;

                    KISP.alert('添加云之家用户失败: {0}', msg);
                },

                'error': function () {
                    KISP.alert('添加云之家用户错误: 网络繁忙，请稍候再试');
                },
            });


            api.post({
                'tid': item.companyId,
                'mobile': item.phone,
                'user_name': item.name,
                'email': item.email || '',
                'gender':2,           //默认传2 用于纷享销客对接
            });

        },

        /**
        * 根据手机号拉取用户信息。
        */
        get: function (phone) {
            var api = new API('web/user/check_user_is_reg', {
                //proxy: 'success.js',
            });

            api.on({
                'request': function () {
                    loading.show('检测中...');
                },

                'response': function () {
                    loading.hide();
                },

                'success': function (data, json, xhr) {

                    //var $String = KISP.require('String');
                    //var name = $String.random();

                    var has = data['is_exist'] == 1;
                    var name = has ? '(已注册)' : '';

                    emitter.fire('success', 'get', [{
                        'name': name,
                    }]);

                },

                'fail': function (code, msg, json) {
                    emitter.fire('success', 'get', [{}]);
                },

                'error': function () {
                    KISP.alert('检测用户错误: 网络繁忙，请稍候再试');
                },
            });


            api.post({
                'mobile': phone,
            });

        },



    };


});


KISP.panel('/AccountUsers/Selector/Content/Add/Name', function (require, module, panel) {
    var KISP = require('KISP');
    var API = module.require('API');


    var toast = null;



    panel.on('init', function () {

        toast = KISP.create('Toast', {
            duration: 1500,
            mask: 0,
            icon: 'close',
        });

        panel.$.on('blur', function () {
            var txt = this;
            var value = txt.value;

            if (!value) {
                return;
            }


            var invalid =
               value.includes('"') ||
               value.includes("'") ||
               value.includes('=') ||
               value.includes(' ') ||
               value.includes('--');

            if (invalid) {
                toast.show('姓名不能包含特殊字符', function () {
                    txt.focus();
                });
                return;

            }



        });
    });





  
    panel.on('render', function (value) {
        value = value || '';
        var title = value ? '该手机号已注册云之家用户，无法重复填写姓名' : '';

        panel.$.val(value);
        panel.$.attr('readonly', !!value);
        panel.$.attr('title', title);


        
    });



    return {
        get: function () {
            var txt = panel.$.get(0);
            var value = txt.value;

            if (!value) {
                return function () {
                    toast.show('姓名必填', function () {
                        txt.focus();
                    });
                };
            }

            var invalid =
              value.includes('"') ||
              value.includes("'") ||
              value.includes('=') ||
              value.includes(' ') ||
              value.includes('--');


            if (invalid) {
                return function () {
                    toast.show('姓名不能包含特殊字符', function () {
                        txt.focus();
                        txt.select();
                    });
                };
            }


            return value;

        },
    };


});


KISP.panel('/AccountUsers/Selector/Content/Add/Phone', function (require, module, panel) {
    var KISP = require('KISP');
    var API = module.require('API');


    var regexp = /^1\d{10}$/;
    var toast = null;

    var meta = {
        value: '', //记录上一次的值，用于对比。
    };

    panel.on('init', function () {

        toast = KISP.create('Toast', {
            duration: 1500,
            mask: 0,
            icon: 'close',
        });

        panel.$.on('blur', function () {
            var txt = this;
            var value = txt.value;

            if (!value) {
                return;
            }


            if (!regexp.test(value)) {
                toast.show('手机号非法', function () {
                    txt.focus();
                });

                return;
            }


        });

        panel.$.on('change', function () {
            var txt = this;
            var value = txt.value;

            if (!value) {
                meta.value = value;
                panel.fire('empty', [value]);
                return;
            }


            var valid = regexp.test(value);
     
            if (valid && value != meta.value) {
                meta.value = value;
                panel.fire('change', [value]);
            }
        });
    });





  
    panel.on('render', function () {
        meta.value = '';
        panel.$.val('');
    });



    return {
        get: function () {
            var txt = panel.$.get(0);
            var value = txt.value;

            if (!value) {
                return function () {
                    toast.show('手机号必填', function () {
                        txt.focus();
                    });
                };
            }

            if (!regexp.test(value)) {
                return function () {
                    toast.show('手机号非法', function () {
                        txt.focus();
                        txt.select();
                    });
                };
            }

            return value;

        },
        /**
        * 检查当前手机号是否已存在于云之家列表或账套列表中。
        * 如果已存在，则返回 true。
        *   opt = {
        *       users: [],      //云之家用户列表中的记录。
        *       accounts: [],   //已存在的账套用户列表。
        *   };
        */
        checkExist: function (opt) {
            var txt = panel.$.get(0);
            var phone = txt.value;


            if (find(opt.users)) {
                return show('云之家');
            }

            if (find(opt.accounts)) {
                return show('账套');
            }


            function find(list) {
                return list.find(function (item) {
                    return item.phone == phone;
                });
            }

            function show(type) {
                var msg =
                    type + '用户列表中已存在该手机号:' +
                    '<div style="color: red; margin: 10px 0px;">' + phone + '</div>';

                KISP.alert(msg, function () {
                    txt.focus();
                    txt.select();
                });

                return true;
            }
        },
    };


});


KISP.panel('/AccountUsers/Selector/Content/Add', function (require, module, panel) {
    var API = module.require('API');
    var Phone = module.require('Phone');
    var Name = module.require('Name');
    var User = require('User');


    var meta = {
        company: null,  //企业信息。
        users: [],      //云之家用户列表中的记录。
        accounts: [],   //已存在的账套用户列表。
    };



    panel.on('init', function () {

        Phone.on({
            'change': function (phone) {

                var existed = Phone.checkExist(meta);
                if (existed) {
                    return;
                }
                API.get(phone);
            },
            'empty': function () {
                Name.render();
            },
        });

        panel.$.on('click', '[data-type="add"]', function () {
            panel.$.addClass('show');
            panel.$.find('[data-type="add"]').removeClass('on');
        });

        panel.$.on('click', '[data-cmd="return"]', function () {
            panel.$.removeClass('show');
        });

        panel.$.on('click', '[data-cmd="add"]', function () {
            var phone = Phone.get();
            var name = Name.get();

            var fn = [phone, name].find(function (item) {
                return typeof item == 'function';
            });

            if (fn) {
                fn();
                return;
            }

            var existed = Phone.checkExist(meta);

            if (existed) {
                return;
            }

            panel.$.removeClass('show');

            API.post({
                'companyId': meta.company.origin['tid'],
                'phone': phone,
                'name': name,
            });

        });





        API.on('success', {
            'get': function (user) {
                Name.render(user.name);
            },

            'post': function (item) {
                Phone.render();
                Name.render();

                panel.fire('ok', [item]);
            },
        });


    });





    /**
    *   data = {
    *       company: {},        //企业信息。
    *       users: [],          //云之家用户列表中的记录。
    *       accounts: [],       //已存在的账套用户列表。
    *   };
    */
    panel.on('render', function (data) {

        meta = data;

        Phone.render();
        Name.render();
        var userInfo = User.get();
        // && !meta.users.length
        if (userInfo) {
            // panel.$.find('[data-type="phone"]').addClass('on');
            panel.$.find('[data-type="add"]').addClass('on');
            return;
        }
        // panel.$.find('[data-type="phone"]').removeClass('on');
        panel.$.find('[data-type="add"]').removeClass('on');

    });




});


KISP.panel('/AccountUsers/Selector/Content/List', function (require, module, panel) {
    

    var User = require('User');

    var list = [];
    var selects = new Set();
    var Info;                        //筛选出来的列表显示用户

    panel.on('init', function () {

        // function highlight(keyword, content) {
        //     if (!keyword) {
        //         return content;
        //     }

        //     var html = "<span class='keyword'>" + keyword + "</span>";

        //     content = content.split(keyword).join(html);
        //     return content;

        // }


        panel.template({
            '': function (data) {
                var table = this.fill('table', data);

                return {
                    'table': table,
                };
            },

            'table': {
                '': function (data) {
                    var rows = this.fill('row', data.items, data.keyword);

                    return {
                        'rows': rows,
                    };
                },

                'row': function (item, index, keyword) {
                    return {
                        'index': index,
                        'phone': item.phone,          // highlight(keyword, item.phone)
                        'name': item.name,            // highlight(keyword, item.name),
                        'email': item.email || '',    // highlight(keyword, ),
                    };

                },
            },
        });
    });


    panel.on('init', function () {
        panel.$on('click', {
            '[data-cmd="check"]': function () {
                var index = +this.getAttribute('data-index');

                var checked = $(this).hasClass('on');

                var tr = panel.$.find('tr[data-index=' + index + ']');
                if (tr.hasClass('has-chosed')) {
                    return;
                }

                if (checked) {

                    selects.delete(index);
                    panel.fire('delete-checked', [Info[index]]);
                }
                else {
                    selects.add(index);
                }

                $(this).toggleClass('on', !checked);
                panel.$.find('[data-type="0"]').removeClass('on');
            },

        });

    });



    /**
    * 
    */

    panel.on('render', function (items, para) {
        Info = [];
        var chosedData = items.accounts;
        var confirmList = items.confirmList;


        if (para.phone == '') {
            list = items.accounts;
            Info = items.list;

        } else {
            list = items.searchList;
            Info = removeData(para.phone);

        }

        selects.clear();
        panel.$.toggleClass('no-data', !Info.length);

        panel.fill({
            'items': Info,
            'keyword': para.phone,
        });


        // 处理已添加进来的

        var uid$item = {};
        chosedData.forEach(function (item) {
            var uid = item.origin['account_uid'];
            uid$item[uid] = item;
        });
        Info.map(function (item, index) {
            if (uid$item[item.uid]) {
                panel.$.find('tr[data-index=' + index + ']').addClass('has-chosed');
            }
        });

        // 处理之前页面已经勾选的

        var uid$item = {};
        confirmList.forEach(function (item) {
            var uid = item['uid'];
            uid$item[uid] = item;
        });
        Info.map(function (item, index) {
            if (uid$item[item.uid]) {
                panel.$.find('span[data-index=' + index + ']').addClass('on');
            }
        });

        var userInfo = User.get();
        if (userInfo) {
            panel.$.find('[data-type="0"]').addClass('on');
            return;
        }
        panel.$.find('[data-type="0"]').removeClass('on');


    });

    function removeData(keyword) {
        var Info = [];

        if (!keyword) {
            Info = list;
            return Info;
        }
        list.map(function (item, index) {
            if (item.phone.indexOf(keyword) != -1 || item.name.indexOf(keyword) != -1 || (item.email && item.email.indexOf(keyword) != -1)) {
                Info.push(item);
            }
        })
        return Info;

    }
    return {
        get: function () {

            var items = Array.from(selects).map(function (index) {
                return Info[index];
            });
            return items;
        },

        add: function (item) {
            var index = list.length;
            var tr = 'tr[data-index="' + index + '"]';


            list.push(item);
            panel.render(list);

            panel.$.find(tr).get(0).scrollIntoView();
        },
    };




});

/*
* 
*/
KISP.panel('/AccountUsers/Selector/Content/Pager', function (require, module, panel) {
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
            min: 2,                 //总页数小于该值时，分页器会隐藏。 如果不指定，则一直显示。
            total: 123,             //总的记录数，应该从后台取得该值
            size: 20,               //每页的大小，即每页的记录数
            sizes: [10, 20, 30, 40, 50, 60, 70],
        });

        pager.on({
            //翻页时会调用该方法，参数 no 是当前页码。
            //前端应根据当前页码去拉后台数据。
            'change': function (no, size) {

                panel.fire('change', [{
                    'no': no,
                    'size': size,
                }]);
            },

            //控件发生错误时会调用该方法，比如输入的页码有错误时
            'error': function (msg) {
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






KISP.panel('/AccountUsers/Selector/Content/Search', function (require, module, panel) {

    panel.on('init', function () {

        //针对中文输入法，为 true 表示正在输入而未选中汉字。
        var compositing = false;

        function change(txt) {
            var value = panel.$.find('[data-type="txt"]').val();

            panel.fire('change', [value]);
        }

        panel.$.find('[data-type="txt"]').on({
            'keypress': function () {
                if (event.keyCode === 13) {
                    change();
                }
            }
        });
        panel.$.find('[data-type="search-icon"]').on({
            'click': function () {
                change(this);
            },

        });




    });


    /**
    * 
    */
    panel.on('render', function (para) {
        panel.$.find('[data-type="txt"]').val(para.phone);
    });


});

define('/AccountUsers/Selector/API', function (require, module, exports) {
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
        * 获取云之家用户列表。
        */
        get: function (opt) {

            var api = new API('web/user/get_yunzhijia_list', {
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
                    var list = data['user_list'] || [];
                    emitter.fire('success', 'get', [list, {
                        'no': opt.no,
                        'size': opt.size,
                        'total': data['count'],   //总记录数。
                        'ifSearch': opt.ifSearch,
                        'ifGet': opt.ifGet,
                        'ifAdd': opt.ifAdd,
                        'phone':opt.mobile,
                    }]);

                },

                'fail': function (code, msg, json) {
                    KISP.alert('获取云之家用户列表失败: {0}', msg);
                },

                'error': function () {
                    KISP.alert('获取云之家用户列表错误: 网络繁忙，请稍候再试');
                },
            });


            api.post({
                'tid': opt.companyId,
                'page': opt.no,              //页码，即第几页。
                'page_size': opt.size,      //一页展示多条数据，默认20条。  最大支持到100。    暂时不分页。
                'mobile':opt.mobile,
            });

        },

        /**
        * 添加云之家用户到账套用户列表中。
        */
        post: function (opt, list) {
            var api = new API('web/user/add_account_user', {
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
                    KISP.alert('添加云之家用户到账套用户列表中失败: {0}', msg, function () {
                        emitter.fire('fail', 'post');
                    });
                },

                'error': function () {
                    KISP.alert('添加云之家用户到账套用户列表中错误: 网络繁忙，请稍候再试',function () { 
                        emitter.fire('fail', 'post');
                    });
                },
            });


            list = list.map(function (item) {
                return {
                    'mobile': item.phone,
                    'user_name': item.name,
                    'uid': item.uid,
                    'gender':item.gender,
                };
            });

            list = JSON.stringify(list);
            list = encodeURIComponent(list);
            

            api.post({
                'tid': opt.company.origin['tid'],
                'prod_id': opt.product.origin['prod_id'],
                'account_id': opt.account.origin['account_id'],
                'user_list': list,
            });

        },



    };


});


KISP.panel('/AccountUsers/Selector/Content', function (require, module, panel) {

    
    var Search = module.require('Search');
    var List = module.require('List');
    var Add = module.require('Add');
    var Pager = module.require('Pager');

    var meta = {
        list: [],       //最终要显示的用户列表。
        accounts: [],   //已存在的账套用户列表。
        searchList: [],
        confirmList: [],           //已勾选数据列表

    };



    panel.on('init', function () {
        Pager.on({
            //翻页。
            'change': function (page) {
                var pager = {
                    'no': page.no,
                    'size': page.size,
                }
                panel.fire('page-chose', [pager]);
            },
        });
        List.on({
            'delete-checked': function (info) {
                meta.confirmList = meta.confirmList.filter(function (item, index) {
                    return item.uid != info.uid;
                });
                panel.fire('delete-checked', [info]);
            },
        });
        Search.on({
            'change': function (value) {
                var para = {
                    'phone': value
                }
                List.render(meta, para);

                // List.highlight(value);
            },

        });

        Add.on({
            'ok': function (item) {

                panel.fire('add', [item]);
            },
        });

    });


    /**
    *   从 list 中减去 data.list 的共同项，就是最终要显示的用户列表。
    *   data = {
    *       list: [],       //已存在的账套用户列表。
    *       company: {},    //企业信息。
    *   };
    *   list = [];          //本来要显示的全部用户列表。
    */
    panel.on('render', function (data, list, confirmList, para) {

        //要显示的列表为: list = list - data.list;
        //通过 uid 确定每一项。
        //data.list 是已存在的账套用户列表。
        //把它的每一项用 uid 作为主键建立关联关系，
        meta.searchList = data.searchList;
        meta.list = list;
        meta.accounts = data.list;
        meta.confirmList = confirmList;
        Search.render(para);
        List.render(meta, para);
        Add.render({
            'company': data.company,
            'users': meta.list,
            'accounts': meta.accounts,
        });

        if (para.ifSearch && para.phone != '') {
            Pager.render({
                'total': 1,
                'size': 20,
                'no': 1,
            });
            return;
        }
        Pager.render({
            'total': data.total,
            'size': data.size,
            'no': data.no,
        });

    });





    return {
        get: function () {
            meta.confirmList = meta.confirmList.concat(List.get());
            return meta.confirmList;
        }
    };


});









KISP.panel('/AccountUsers/Selector/Footer', function (require, module, panel) {


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
* 选择用户对话框。
*/
KISP.panel('/AccountUsers/Selector', function (require, module, panel) {
    var KISP = require('KISP');

    var API = module.require('API');
    var Content = module.require('Content');
    var Footer = module.require('Footer');

    var Dialog = require('Dialog');
    var dialog = null;
    var meta = {
        company: null,
        product: null,
        account: null,
        list: [],       //账套用户列表。 它是要展示的云之家用户列表的一个子集。
    };
    var searchlistNum = 1;
    var init = true;
    var ifFirst = true;
    var confirmList = [];

    // var mobile='';  //新增的暂存手机号码

    panel.on('init', function () {

        function unique(data) {
            let result = {};
            let finalResult = [];
            for (let i = 0; i < data.length; i++) {
                result[data[i].uid] = data[i];
            }
            for (a in result) {
                finalResult.push(result[a]);
            }
            return finalResult;
        }
        dialog = Dialog.panel({
            'title': '选择云之家用户',
            'width': 670,
            'height': 626,
            'z-index': 1023,
            'container': panel,
            'content': Content,
            'footer': Footer,
        });


        dialog.on({
            'render': function (data) {
                if (ifFirst) {
                    ifFirst = false;   //先初始化列表，以防页面错乱
                    return;
                }
                API.get({
                    'companyId': meta.company.origin['tid'],
                    'no': meta.no,
                    'size': meta.size,
                    'mobile': '',
                    'ifSearch': false,
                    'ifGet': false,
                });

                //Content.render(meta, []);
                //Footer.render();
            },
            'enter': function (event) {

            },
        });



        API.on('success', {
            'get': function (list, page) {
                meta.total = page.total;
                if (page.ifGet || page.ifAdd) {  //判断是否是首次进来获取所有数据
                    searchlistNum++;
                    meta.searchList = meta.searchList.concat(list);

                    meta.searchList = unique(meta.searchList);
                    if (searchlistNum <= Math.ceil(page.total / 100)) {
                        toGetSearchList();
                    } else {
                        dialog.render(meta);
                    }

                }
                else {
                    init = false;
                }

                if (!init) {
                    var para = {
                        'ifSearch': page.ifSearch,
                        'phone': page.phone,
                    };
                    list = list.reverse();
                    Content.render(meta, list, confirmList,para);
                    Footer.render();
                }
            },
            'post': function () {
                dialog.close();
                panel.fire('ok');
            },
        });

        //失败的，也让外面的列表刷新。
        API.on('fail', {
            'post': function () {
                dialog.close();
                panel.fire('ok');
            },
        });

        Content.on({
            //添加成功，刷新列表。
            'add': function (item) {
                // meta.no = Math.ceil(meta.total / meta.size);          //由于正式环境数据没有追加到最后，所以取去请求最后一页数据没有意义
                searchlistNum = 1;
                init = true;
                //meta.searchList.unshift(item);
                API.get({
                    'companyId': meta.company.origin['tid'],
                    'no': searchlistNum,
                    'size': 100,
                    'mobile': '',
                    'ifSearch': false,
                    'ifAdd': true,
                });
            },

            'page-chose': function (page) {
                confirmList = confirmList.concat(Content.get());
                confirmList = unique(confirmList);
                
                meta.no = page.no;
                meta.size = page.size;
                API.get({
                    'companyId': meta.company.origin['tid'],
                    'no': meta.no,
                    'size': meta.size,
                    'mobile': meta.mobile,
                    'ifSearch': false,
                });
            },
            'delete-checked': function (info) { 
                confirmList = confirmList.filter(function (item, index) {
                    return item.uid != info.uid;
                });
            }
        });


        Footer.on({
            'ok': function () {
                var list = Content.get();
                list = unique(list);
                confirmList = [];
                if (!list.length) {
                    return KISP.alert('请至少选择一项。');
                }
                API.post(meta, list);
            },

            'cancel': function () {
                dialog.close();
            },
        });

    });


    panel.on('render', function (data) {
        meta = data;
        meta.mobile = '';
        meta.no = 1;
        meta.size = 20;
        meta.searchList = [];
        searchlistNum = 1;
        init = true;
        ifFirst = true;
        dialog.render(meta);
        toGetSearchList();



    });
    function toGetSearchList() {
        API.get({
            'companyId': meta.company.origin['tid'],
            'no': searchlistNum,
            'size': 100,
            'mobile': '',
            'ifSearch': false,
            'ifGet': true,
        });
    }


});







/*
* 
*/
KISP.panel('/AccountUsers/Header', function (require, module, panel) {


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
KISP.panel('/AccountUsers/Main', function (require, module, panel) {
    var KISP = require('KISP');
    var API = module.require('API');
    var List = module.require('List');
    var Search = module.require('Search');

    var User = require('User');

    var meta = {
        company: null,
        product: null,
        account: null,
        list: [],
    };




    panel.on('init', function () {



        panel.$on('click', {
            '[data-cmd="selector"]': function () {
                var cmd = this.getAttribute('data-cmd');
                panel.$.find('[data-type="account-select"]').removeClass('on');
                panel.fire(cmd);
            },
        });



        Search.on({
            'submit': function (list, keyword) {
                List.render(list);
            },
        });
       


        List.on('set', {
            'status': function (enabled, item, index) {
                API.setStatus({
                    'company': meta.company,
                    'product': meta.product,
                    'account': meta.account,
                    'enabled': enabled,
                    'item': item,
                    'index': index,
                });
            },
            'delete': function (enabled, item, index) {
                if (!enabled) {
                    return;
                }

                API.deleteUser({
                    'account_user_id': item.origin.account_uid,
                    'account_id': meta.account.origin['account_id'],
                })
            },

            'role': function (enabled, item, index) {
                API.setRole({
                    'company': meta.company,
                    'product': meta.product,
                    'account': meta.account,
                    'enabled': enabled,
                    'item': item,
                    'index': index,
                });
            },


        });

        List.on({
            'save': function (item, value) {
                API.save({
                    'tid': meta.company.origin.tid,
                    'account_id': meta.account.origin['account_id'],
                    'prod_id': meta.product.origin['prod_id'],
                    'account_uid': item.origin['account_uid'],
                    'user_account_name': value,
                });
            },
        })



        API.on('success', {
            'get': function (list) {
                Search.render(list);
                List.render(list);


                panel.$.addClass('rendered');
                panel.fire('render', [list]);

                if (!list.length) {
                    var userInfo = User.get();
                    panel.$.find('[data-type="account-select"]').toggleClass('on', !!userInfo);
                }

            },

            'set': {
                'status': function (opt) {
                    API.get(meta);
                },

                'role': function (opt) {
                    API.get(meta);
                },
            },

            'delete': function (data) {
                if (data.msg == 'success') {
                    KISP.alert('删除用户成功', function () {
                        API.get(meta);
                    });
                }
            },

            'save': function () {
                API.get(meta);
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
        meta.company = data.company;
        meta.product = data.product;
        meta.account = data.account;
        meta.list = [];


        panel.$.removeClass('rendered');
        API.get(data);

    });



});







/*
* 某个账套下的用户列表。
*/
KISP.view('/AccountUsers', function (require, module, view) {

    var Header = module.require('Header');
    var Main = module.require('Main');
    var Selector = module.require('Selector');



    var meta = {
        company: null,
        product: null,
        account: null,
        list:  [],
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
            'selector': function () {
                Selector.render(meta);
            },
            'render': function (list) {
                meta.list = list;
            },
        });

        Selector.on({
            'ok': function () {
                Main.render(meta);
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
    view.on('render', function (data) {
        meta = data;

        Header.render(data);
        Main.render(data);

    });



});





