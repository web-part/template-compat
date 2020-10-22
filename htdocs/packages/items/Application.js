// data = {
//     productType: 2,
//     itemlist: {}//关于应用数据
// }
//移动应用
define('AppData', function () {
    var product$status$list = {
        1: {  //已激活产品
            0: [  //未使用
                {
                    'name': '删除应用',
                    'cmd': 'delete',
                },

            ],
            1: [  //试用中
                {
                    'name': '更新服务',
                    'cmd': 'update',
                },
                {
                    'name': '购买详情',
                    'cmd': 'purchase',
                },
            ],
            2: [  //使用中
                {
                    'name': '更新服务',
                    'cmd': 'update',
                },
                {
                    'name': '购买详情',
                    'cmd': 'purchase',
                },

            ],
            3: [  //已过期
                {
                    'name': '更新服务',
                    'cmd': 'update',
                },

                {
                    'name': '购买详情',
                    'cmd': 'purchase',
                },

            ]
        },
        2: {  //未激活产品
            0: [  //未使用
                {
                    'name': '删除应用',
                    'cmd': 'delete',
                },

            ],
            1: [
                {
                    'name': '购买详情',
                    'cmd': 'purchase',
                },
            ],  //试用中
            3: []  //已过期
        }

    }
    return product$status$list;
});

// data = {
//     productType: 2,
//     itemlist: {}//关于应用数据
// }

//分享逍客应用
define('FxxkData', function () {
    var product$status$list = {
        1: {  //已激活产品
            0: [  //未使用
                {
                    'name': '删除应用',
                    'cmd': 'delete',
                },
            ],
            1: { //试用中
                0: [  //未绑定账套
                    {
                        'name': '删除应用',
                        'cmd': 'delete',

                    },
                    {
                        'name': '更新服务',
                        'cmd': 'update',
                    },
                ],
                1: [  //绑定账套
                    {
                        'name': '添加用户',
                        'cmd': 'add-users',
                    },
                    {
                        'name': '更新服务',
                        'cmd': 'update',
                    },
                    {
                        'name': '购买详情',
                        'cmd': 'purchase',
                    },
                ]
            },
            2: { //使用中
                0: [  //未绑定账套
                    {
                        'name': '更新服务',
                        'cmd': 'update',
                    },
                ],
                1: [  //绑定账套
                    {
                        'name': '添加用户',
                        'cmd': 'add-users',
                    },
                    {
                        'name': '更新服务',
                        'cmd': 'update',
                    },
                    {
                        'name': '购买详情',
                        'cmd': 'purchase',
                    },
                ]

            },
            3: [  //已过期
                {
                    'name': '更新服务',
                    'cmd': 'update',
                },
                {
                    'name': '购买详情',
                    'cmd': 'purchase',
                },
            ],
            4: [],  //开通中
        },
        2: {  //未激活产品
            0: [  //未使用
                {
                    'name': '删除应用',
                    'cmd': 'delete',
                },

            ],
            1: { //试用中
                0: [  //未绑定账套
                    {
                        'name': '删除应用',
                        'cmd': 'delete',

                    },
                ],
                1: [  //绑定账套
                    {
                        'name': '添加用户',
                        'cmd': 'add-users',
                    },
                    {
                        'name': '购买详情',
                        'cmd': 'purchase',
                    },

                ]
            },
            3: [],  //已过期
               
            
            4: [], //开通中
        }

    }
    return product$status$list;
});

// data = {
//     productType: 2,
//     itemlist: {}//关于应用数据
// }

//轻分析应用
define('Qanalyse', function () {
    var product$status$list = {
        1: {  //已激活产品
            0: [  //未使用
                {
                    'name': '删除应用',
                    'cmd': 'delete',
                },

            ],
            1: [  //试用中
                {
                    'name': '更新服务',
                    'cmd': 'update',
                },
                {
                    'name': '购买详情',
                    'cmd': 'purchase',
                },
            ],
            2: [  //使用中
                {
                    'name': '更新服务',
                    'cmd': 'update',
                },
                {
                    'name': '购买详情',
                    'cmd': 'purchase',
                },

            ],
            3: [  //已过期
                {
                    'name': '更新服务',
                    'cmd': 'update',
                },

                {
                    'name': '购买详情',
                    'cmd': 'purchase',
                },

            ]
        },
        2: {  //未激活产品
            0: [  //未使用
                {
                    'name': '删除应用',
                    'cmd': 'delete',
                },

            ],
            1: [
                {
                    'name': '购买详情',
                    'cmd': 'purchase',
                },
            ],  //试用中
            3: []  //已过期
        }

    }
    return product$status$list;
});

// data = {
//     productType: 2,
//     itemlist: {}//关于应用数据
// }
//移动微系列应用
define('WxlData', function () {
    var product$status$list = {
        1: {  //已激活产品
            0: [  //未使用
                {
                    'name': '删除应用',
                    'cmd': 'delete',
                },

            ],
            1: [  //试用中
                {
                    'name': '更新服务',
                    'cmd': 'update',
                },
                {
                    'name': '购买详情',
                    'cmd': 'purchase',
                },
                {
                    'name': '参数设置',
                    'cmd': 'paramset',
                },
            ],
            2: [  //使用中
                {
                    'name': '更新服务',
                    'cmd': 'update',
                },
                {
                    'name': '购买详情',
                    'cmd': 'purchase',
                },
                {
                    'name': '参数设置',
                    'cmd': 'paramset',
                },
            ],
            3: [  //已过期
                {
                    'name': '更新服务',
                    'cmd': 'update',
                },

                {
                    'name': '购买详情',
                    'cmd': 'purchase',
                },

            ]
        },
        2: {  //未激活产品
            0: [  //未使用
                {
                    'name': '删除应用',
                    'cmd': 'delete',
                },
            ],
            1: [ //试用中
                {
                    'name': '购买详情',
                    'cmd': 'purchase',
                },
                {
                    'name': '参数设置',
                    'cmd': 'paramset',
                },
            ],  
            3: []  //已过期
        }

    }
    return product$status$list;
});

// data = {
//     productType: 2,
//     itemlist: {}//关于应用数据
// }
define('list.Index', function (require, module, panel) {
    var AppData = require('AppData');
    var FxxkData = require('FxxkData');
    var Qanalyse = require('Qanalyse');
    var WxlData = require('WxlData');

    var type$data = {
        'kisfxiaoke': FxxkData,
        'kismobapp': AppData,
        'kisqing': Qanalyse,
        'kiswei': WxlData,
    }
    function getIconList(data) {
        var tag = data.itemlist.tag;
        var tagData = type$data[tag] || {};
        if (JSON.stringify(tagData) === '{}') {
            KISP.alert(tag + '无法识别的应用类型');
            return;
        }
        var productType = data.productType;
        var status = data.itemlist.status;
        var bind = data.itemlist.bind;
        var result = [];
        if (tagData[productType][status].length !== undefined) {  //此时当前状态不存在是否绑定的对象
            result = tagData[productType][status];
        } else {
            result = tag == 'kisfxiaoke' ? tagData[productType][status][bind] : tagData[productType][status];
        }

        return result;
    }
    return getIconList;
});


define('/Application/Main/API', function (require, module, exports) {
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
        * 获取指定企业的产品列表。
        *   opt = {
        *       company: {},    //企业信息。
        *   };
        */
        get: function (opt) {
            var api = new API('web/apply/appOrder', {
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
                    console.log(data);

                    var list = data.map(function (item, index) {

                        var expire = item['expired_date'] || ''; //后台返回的可能是 null。
                        expire = expire.split(' ')[0]; //取日期部分。

                        return {
                            'name': item['slv_prod_name'],
                            'users': item['user_num'],        //用户数量。
                            'expire': expire,                   //到期时间。
                            'warnMsg': item['warn_msg'],        //
                            'status': item['status'],
                            "bind": item['is_bind_acc'],
                            'type': item['type'],
                            'tag': item['slv_tag'],
                            'origin': item,
                        };
                    });

                    emitter.fire('success', 'get', [list]);

                },

                'fail': function (code, msg, json) {
                    KISP.alert('获取应用列表失败: {0}', msg);
                },

                'error': function () {
                    KISP.alert('获取应用列表错误: 网络繁忙，请稍候再试');
                },
            });
            api.post({
                'tid': opt.company.origin['tid'],   //用户企业 ID
                'prod_id': opt.product.origin['prod_id'], //产品 ID
            });

        },


        /**
        * 更新服务。
        */
        update: function (opt) {
            var api = new API('web/apply/updateServe', {
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
                    // 待完成
                    toast.show('更新成功', function () {
                        emitter.fire('success', 'refresh', [data]);
                        // emitter.fire('success', 'update-fail', [opt.item]);
                    });

                },

                'fail': function (code, msg, json) {
                    KISP.alert(`更新服务失败:${msg}`, function () {
                        if (code !== 303) {
                            return;
                        }
                        emitter.fire('update-fail', [opt.item]);  //code为303时需跳转添加用户

                    });

                },

                'error': function () {
                    KISP.alert('更新服务错误: 网络繁忙，请稍候再试');
                },
            });

            api.post({
                'slv_prod_id': opt.item.origin.slv_prod_id,	//产品添加ID
                'tid': opt.meta.company.origin.tid,        //企业id。
                'prod_id': opt.meta.product.origin.prod_id,    //产品id。
            });

        },
        /**
       * 获取微系列参数设置地址。
       */
        getwxlUrl: function (opt) {
            var api = new API('web/apply/weiSetting', {
                proxy: true,
            });

            api.on({
                'request': function () {
                    loading.show('跳转中...');
                },

                'response': function () {
                    loading.hide();
                },

                'success': function (data, json, xhr) {
                    emitter.fire('success', 'get-wxlsuccess', [data]);


                },

                'fail': function (code, msg, json) {

                    KISP.alert(`跳转到参数设置失败:${msg}`);
                },

                'error': function () {
                    KISP.alert('跳转到参数设置错误: 网络繁忙，请稍候再试');
                },
            });

            api.post(opt);

        },

        /**
         * 获取应用管理地址。
         */
        getUrl: function (opt) {
            var api = new API('web/apply/thirdLogin', {
                proxy: true,
            });

            api.on({
                'request': function () {
                    loading.show('跳转中...');
                },

                'response': function () {
                    loading.hide();
                },

                'success': function (data, json, xhr) {
                    emitter.fire('success', 'get-success', [data]);


                },

                'fail': function (code, msg, json) {

                    KISP.alert(`跳转到纷享销客失败:${msg}`);
                },

                'error': function () {
                    KISP.alert('跳转到纷享销客错误: 网络繁忙，请稍候再试');
                },
            });

            api.post(opt);

        },

        /**
        * 删除应用。
        */
        delete: function (opt) {
            var api = new API('web/apply/appDel', {
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
                        emitter.fire('success', 'refresh', [data]);
                    });

                },

                'fail': function (code, msg, json) {

                    KISP.alert('删除应用失败: {0}', msg);
                },

                'error': function () {
                    KISP.alert('删除应用错误: 网络繁忙，请稍候再试');
                },
            });

            api.post(opt);

        },

        /**
        * 免费试用。
        *   opt = {
        *       slv_icrm_id:string,	//应用产品id
        *       slv_prod_id:string,	//产品添加ID
        *       tid: string,        //企业id。
        *       prod_id: string,    //产品id。
        *   };
        */

        test: function (opt) {
            var api = new API('web/apply/appTry', {
                proxy: true,
            });

            api.on({
                'request': function () {
                    loading.show('开通提交中...');
                },

                'response': function () {
                    loading.hide();
                },

                'success': function (data, json, xhr) {

                    toast.show('开通成功', function () {
                        emitter.fire('success', 'refresh', [json.msg]);
                    });

                },

                'fail': function (code, msg, json) {
                    KISP.alert('开通应用失败: {0}', msg);
                    emitter.fire('fail');
                },

                'error': function () {
                    KISP.alert('开通应用错误: 网络繁忙，请稍候再试');
                },
            });

            api.post(opt);

        },

    };


});


KISP.panel('/Application/Main/Header', function (require, module, panel) {
    

    panel.on('init', function () {

      
    });



    /**
    */
    panel.on('render', function (items) {


    });
    return {
      
    }



});


KISP.panel('/Application/Main/List', function (require, module, panel) {
    var KISP = require('KISP');
    var $Date = KISP.require('Date');
    var User = require('User');
    var getData = require('list.Index');
    var list = [];
    var product = {};

    panel.on('init', function () {
        var status$text = {
            0: { text: '未使用', },
            1: { text: '试用中', },
            2: { text: '使用中', },
            3: { text: '已过期', class: 'warning', },
            4: { text: '开通中', },
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
                        var noSelect = '';
                        var button = 'user-manage';
                        var style = '';
                        var droplist = getData({
                            itemlist: item,
                            productType: product.type,
                        }) || [];
                        var drop = this.fill('drop', droplist, index);
                        var refresh = this.fill('refresh', item, index);
                        if (!droplist.length) {  //此时没有下拉操作
                            noSelect = 'no-select'
                        }

                        if (item.status === 0) {
                            button = 'free-test';
                        } else {
                            if (item.tag === 'kisfxiaoke') {
                                button = 'bind-account';
                            }
                        }

                        if (item.status === 3 || item.status === 4) {
                            style = 'gray';  //已过期和开通中时button不可点击
                        }

                        return {
                            'index': index,
                            'name': item.name,
                            'type': item.tag,
                            'endtime': item.expire,
                            'users': item.users,
                            'status': status$text[item.status].text,
                            'button': button,
                            'style': style,
                            'drop': drop,
                            'refresh': refresh,
                            'no-select': noSelect,
                            'status-text-class': status$text[item.status].class,
                        };
                    },
                    'refresh': function (item, index) {
                        return (item.status === 4) ? {
                            'index': index,
                        } : '';
                    },
                    'drop': function (item, index, num) {
                        return {
                            'index': num,
                            'cmd': item.cmd,
                            'dropname': item.name,
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
            var text = '该账套已绑定纷享销客，删除账套将终止与纷享销客的同步服务，不允许再次绑定，请慎重操作！';
            panel.$.find('[data-type="0"]').removeClass('on');   //去除新手指引

            if ((item.status == 3 && cmd == 'bind-account') || (item.status === 4 && cmd !== 'refresh') || (item.status == 3 && cmd == 'user-manage')) {
                return;
            }
            if (cmd === 'delete' && item.bind && item.tag === 'kisfxiaoke') {  //分享逍客删除时的处理
                KISP.alert(text, function () {
                    panel.fire('cmd', cmd, [item]);
                    panel.fire('cmd', [cmd, item]);
                });
                return;
            }

            panel.fire('cmd', cmd, [item]);
            panel.fire('cmd', [cmd, item]);

        });

    });



    /**
    */
    panel.on('render', function (items, productMs) {
        list = items;
        product = productMs;
        panel.fill({
            'items': items,
        });
        panel.$.find('[data-cmd="manage"]').hide();
        panel.$.find('[data-type="kisfxiaoke"][data-cmd="manage"]').show();
        panel.$.toggleClass('no-data', !items.length);

        var userInfo = User.get();
        if (userInfo && list.length && list[0].model == 2 && list[0].status == 1) {
            panel.$.find('[data-type="0"]').addClass('on');
            return;
        }
        panel.$.find('[data-type="0"]').removeClass('on');



    });

});


KISP.panel('/Application/Main/News', function (require, module, panel) {

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


KISP.panel('/Application/Add/Content/List', function (require, module, panel) {

    var User = require('User');

    var list = [];
    var selects = null;
    var Info;


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
                    return {
                        'index': index,
                        'name': item.name,
                        'detail': item.msg || '',
                        'chosed': item.chosed ? 'has-chosed' : '',
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

                if (list[index].chosed) { 
                    return;
                }

                if (checked) {
                    selects.delete(list[index].origin.slv_icrm_id);
                }
                else {
                    selects.add(list[index].origin.slv_icrm_id);
                }
                $(this).toggleClass('on', !checked);
                panel.$.find('[data-type="0"]').removeClass('on');
            },

        });
    })




    panel.on('render', function (items) {
        selects = new Set();

        list = items;


        panel.fill({
            'items': list,
        });

    });
    return {
        get: function () {
            return Array.from(selects);
        }
    }



});








/*
* 
*/
KISP.panel('/Application/Add/Content/Pager', function (require, module, panel) {
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
            size: 10,               //每页的大小，即每页的记录数
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
        pager.render(options);
    });




});





define('/Application/Add/API', function (require, module, exports) {
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
        * 获取应用。
        */
        get: function (opt) {


            var api = new API('web/apply/appList', {
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
                    var list = data.list.map(function (item,index) { 
                        return {
                            'name': item['slv_prod_name'],
                            'msg':item['slv_prod_msg'],
                            'origin': item,
                        };
                    })
                    emitter.fire('success', 'get', [list, {
                        'total': data.count,
                        'page': data.page,
                        'pagesize':data.pagesize,
                    }]);
                },

                'fail': function (code, msg, json) {
                    KISP.alert('获取应用列表失败: {0}', msg);
                },

                'error': function () {
                    KISP.alert('获取应用列表错误: 网络繁忙，请稍候再试');
                },
            });

            api.post(opt);
        },

        /**
        * 添加应用。
        */
        post: function (opt) {

            var api = new API('web/apply/appAdd', {
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
                    toast.show('应用添加成功', function () { 
                        emitter.fire('success', 'post');
                    });
                },

                'fail': function (code, msg, json) {
                    KISP.alert('添加应用失败: {0}', msg);
                },

                'error': function () {
                    KISP.alert('添加应用错误: 网络繁忙，请稍候再试');
                },
            });

            api.post({
                'tid':opt.product.origin.tid	,	//企业id
                'prod_id':opt.product.origin.prod_id,	//产品实例id
                'slv_icrm_id':opt.application	//应用产品id
            });
        },


    };


});


KISP.panel('/Application/Add/Content', function (require, module, panel) {
    var List = module.require('List');
    var Pager = module.require('Pager');

    var meta = {
        list: [],       //最终要显示的用户列表。
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
    });



    panel.on('render', function (data, pageinfo) {
        panel.$.find('[data-cmd="no-data-tip"]').toggleClass('show', !data.length);
        
        List.render(data);
        Pager.render({
            'total': pageinfo.total,
            'size': pageinfo.pagesize,
            'no': pageinfo.page,
        });

    });




    return {
        get:List.get,
    };


});









KISP.panel('/Application/Add/Footer', function (require, module, panel) {


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
* 添加产品对话框。
*/
KISP.panel('/Application/Add', function (require, module, panel) {
    var KISP = require('KISP');

    var Content = module.require('Content');
    var Footer = module.require('Footer');
    var API = module.require('API');

    var Dialog = require('Dialog');
    var dialog = null;

    var meta = {
        company: null,
        product: null,
        application: null,
    };

    panel.on('init', function () {

        dialog = Dialog.panel({
            'title': '添加应用',
            'width': 670,
            'height': 600,
            'z-index': 1023,
            'resizable': false,
            'container': panel,
            'content': Content,
            'footer': Footer,
        });


        dialog.on({
            'render': function () {
                API.get({
                    'page': 1,
                    'pagesize': 10,
                    'tid': meta.product.origin.tid,	//企业id
                    'prod_id': meta.product.origin.prod_id,	//产品实例id
                });
            },
        });

        API.on('success', {
            'get': function (data, pageinfo) {
                data.forEach(function (item, index) {
                    meta.application.forEach(function (appitem, num) {
                        if (item.origin.slv_icrm_id === appitem.origin.slv_icrm_id) {
                            item.chosed = true;
                        }
                    })
                });


                Content.render(data, pageinfo);


                Footer.render();
            },

            'post': function () {
                dialog.close();
                panel.fire('success');
            },
        });

        Content.on({
            'page-chose': function (page) {
                API.get({
                    'page': page.no,
                    'pagesize': page.size,
                    'tid': meta.product.origin.tid,	//企业id
                    'prod_id': meta.product.origin.prod_id,	//产品实例id
                });
            }
        })
        Footer.on({
            'ok': function () {
                var list = Content.get();
                var icrmid = list.join();
                if (!list.length) {
                    return KISP.alert('请至少选择一项。');
                }
                API.post({
                    'product': meta.product,
                    'application': icrmid,
                });
            },

            'cancel': function () {
                dialog.close();
            },
        });

    });


    panel.on('render', function (data) {
        meta.company = data.company;
        meta.product = data.product;
        meta.application = data.application;
        dialog.render();

    });



});








KISP.panel('/Application/Bind/Content/List', function (require, module, panel) {

    var User = require('User');

    var isbind = null;
    var list = [];
    var Info;
    var chosedItem;


    panel.on('init', function () {
        var status$text = {
            0: { text: '未绑定', },
            1: { text: '已绑定', },
            2: { text: '已绑定（已删除）', },
            3: { text: '已绑定（已禁用）', },
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
                    var rows = this.fill('row', data.items, data.keyword);

                    return {
                        'rows': rows,
                    };
                },

                'row': function (item, index, keyword) {
                    return {
                        'index': index,
                        'name': item.name,
                        'number': item.number,
                        'status': status$text[item.status].text,
                        'gray': isbind ? 'gray' : '',
                        'on': item.status ? 'on' : '',
                    };

                },
            },
        });

    });
    panel.on('init', function () {
        panel.$on('click', {
            '[data-cmd="check"]': function () {
                if (isbind) {
                    return;
                }
                var index = +this.getAttribute('data-index');

                panel.$.find('[data-cmd="check"]').removeClass('on');
                $(this).addClass('on');
                chosedItem = [list[index]];

                panel.$.find('[data-type="0"]').removeClass('on');
            },

        });
    })




    panel.on('render', function (items, bind) {
        isbind = bind;
        list = items;
        chosedItem = [];
        panel.fill({
            'items': list,
        });

    });

    return {
        getChosed() {
            return chosedItem;
        }
    }

});








/*
* 
*/
KISP.panel('/Application/Bind/Content/Pager', function (require, module, panel) {
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
            size: 10,               //每页的大小，即每页的记录数
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
        pager.render(options);

    });




});






KISP.panel('/Application/Bind/Confirm/Content', function (require, module, panel) {


    panel.on('init', function () {

    });



    panel.on('render', function () {

    });


});








KISP.panel('/Application/Bind/Confirm/Footer', function (require, module, panel) {


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
KISP.panel('/Application/Bind/Confirm', function (require, module, panel) {
    var Content = module.require('Content');
    var Footer = module.require('Footer');
    var Dialog = require('Dialog');
    var dialog = null;

    // var meta = {
    //     account: null,  //账套信息。
    // };

    panel.on('init', function () {

        dialog = Dialog.panel({
            'title': '信息提示',
            'width': 400,
             //'height': 416,
            'z-index': 1024,
            'resizable': false,

            'container': panel,
            'content': Content,
            'footer': Footer,
        });

      
        dialog.on({
            'render': function () {
                Footer.render();
                Content.render();
            },
        });

  


        Footer.on({
            'ok': function () {
                dialog.close();
                panel.fire('ok');
            },
            'cancel': function () {
                dialog.close();
            },
        });

    });


    panel.on('render', function () {
        dialog.render();
       
    });



});







define('/Application/Bind/API', function (require, module, exports) {
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


        get: function (opt) {

            var api = new API('web/apply/accList', {
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

                    var list = data.list.map(function (item, index) {
                        return {
                            "origin": item,
                            "name": item['account_name'],
                            "number": item['account_no'],
                            "status": item['bind_status'],
                        }
                    })
                    emitter.fire('success', 'get', [list, {
                        'total': data.count,
                        'page': data.page,
                        'pagesize': data.pagesize,
                    }]);

                },

                'fail': function (code, msg, json) {
                    KISP.alert('获取账套列表失败: {0}', msg);
                },

                'error': function () {
                    KISP.alert('获取账套列表错误: 网络繁忙，请稍候再试');
                },
            });


            api.post({
                'tid': opt.product.origin.tid,	//企业id
                'prod_id': opt.product.origin.prod_id,	//产品实例id
                'slv_prod_id': opt.application.origin.slv_prod_id,	//产品添加ID
                'page': opt.page,
                'pagesize': opt.pagesize,
            });

        },

        bind: function (opt) {

            var api = new API('web/apply/bindAcc', {
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
                    toast.show('绑定账套成功', function () {
                        emitter.fire('success', 'bind');
                    });
                },

                'fail': function (code, msg, json) {
                    KISP.alert('绑定账套失败: {0}', msg);
                },

                'error': function () {
                    KISP.alert('绑定账套错误: 网络繁忙，请稍候再试');
                },
            });


            api.post({
                'tid': opt.product.origin.tid,	//企业id
                'prod_id': opt.product.origin.prod_id,	//产品实例id
                'slv_prod_id': opt.application.origin.slv_prod_id,	//产品添加ID
                'account_id': opt.accountid,	//账套id
            });

        },


    };


});


KISP.panel('/Application/Bind/Content', function (require, module, panel) {

    var List = module.require('List');
    var Pager = module.require('Pager');

    var meta = {
        list: [],       //最终要显示的用户列表。
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

    });



    panel.on('render', function (data, isbind) {
        panel.$.find('[data-cmd="no-data-tip"]').toggleClass('show', !data.list.length);
        
        List.render(data.list, isbind);
        Pager.render({
            'total': data.pageinfo.total,
            'size': data.pageinfo.pagesize,
            'no': data.pageinfo.page,
        });

    });




    return {
        get: List.getChosed,
    };


});









KISP.panel('/Application/Bind/Footer', function (require, module, panel) {


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
* 添加产品对话框。
*/
KISP.panel('/Application/Bind', function (require, module, panel) {
    var KISP = require('KISP');

    var Content = module.require('Content');
    var Footer = module.require('Footer');
    var Confirm = module.require('Confirm');
    var API = module.require('API');

    var Dialog = require('Dialog');
    var dialog = null;

    var toast = KISP.create('Toast', {
        duration: 1500,
        mask: 0,
    });
    var meta = {
        company: null,
        product: null,
        application: null,
        chosedApp: null,
    };

    panel.on('init', function () {

        dialog = Dialog.panel({
            'title': '绑定账套',
            'width': 670,
            'height': 600,
            'z-index': 1023,
            'resizable': false,
            'container': panel,
            'content': Content,
            'footer': Footer,
        });


        dialog.on({
            'render': function () {
                API.get({
                    'product': meta.product,
                    'application': meta.application,
                    'page': 1,
                    'pagesize': 10,
                });
            },
        });

        API.on('success', {
            'get': function (list, pageinfo) {
                var data = {
                    'list': list,
                    'pageinfo': pageinfo,
                }
                Content.render(data, meta.application.bind);
                Footer.render();
            },

            'bind': function () {
                dialog.close();
                panel.fire('success');
            },
        });
        Confirm.on({
            'ok': function () {
                API.bind({
                    'product': meta.product,
                    'application': meta.application,
                    'accountid': meta.chosedApp.origin.account_id,    //绑定账套id
                });
            }
        })
        Content.on({
            'page-chose': function (page) {
                API.get({
                    'page': page.no,
                    'pagesize': page.size,
                    'product': meta.product,
                    'application': meta.application,
                });
            }
        })
        Footer.on({
            'ok': function () {

                var list = Content.get();
                if (meta.application.bind) {
                    toast.show('已绑定账套且不可更改。');
                    dialog.close();
                    return;
                }
                if (!list.length) {
                    return KISP.alert('请至少选择一项。');
                }
                meta.chosedApp = list[0];
                Confirm.render();
            },

            'cancel': function () {
                dialog.close();
            },
        });

    });


    panel.on('render', function (data) {
        meta.company = data.meta.company;
        meta.product = data.meta.product;
        meta.application = data.application;
        dialog.render();

    });



});








KISP.panel('/Application/ChoseAcct/Content/List', function (require, module, panel) {

    var User = require('User');

    var list = [];
    var Info;
    var chosedItem;


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
                    var rows = this.fill('row', data.items, data.keyword);

                    return {
                        'rows': rows,
                    };
                },

                'row': function (item, index, keyword) {
                    var haschosed = false;
                    if (chosedItem[0].origin) {
                        haschosed = item.origin.account_id === chosedItem[0].origin.account_id;
                    }
                    return {
                        'index': index,
                        'name': item.name,
                        'number': item.number,
                        'on': haschosed ? 'on' : '',
                    };

                },
            },
        });

    });
    panel.on('init', function () {
        panel.$on('click', {
            '[data-cmd="check"]': function () {

                var index = +this.getAttribute('data-index');

                panel.$.find('[data-cmd="check"]').removeClass('on');
                $(this).addClass('on');
                chosedItem = [list[index]];

                panel.$.find('[data-type="0"]').removeClass('on');
            },

        });
    })




    panel.on('render', function (items, nowChosed) {
        list = items;
        chosedItem = [nowChosed];
        panel.fill({
            'items': list,
        });

    });

    return {
        getChosed() {
            return chosedItem;
        }
    }

});








/*
* 
*/
KISP.panel('/Application/ChoseAcct/Content/Pager', function (require, module, panel) {
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
            size: 10,               //每页的大小，即每页的记录数
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
        pager.render(options);

    });




});





define('/Application/ChoseAcct/API', function (require, module, exports) {
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


        get: function (opt) {

            var api = new API('web/apply/myaccList', {
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

                    var list = data.list.map(function (item, index) {
                        return {
                            "origin": item,
                            "name": item['account_name'],
                            "number": item['account_no'],
                        }
                    })
                    emitter.fire('success', 'get', [list, {
                        'total': data.count,
                        'page': data.page,
                        'pagesize': data.pagesize,
                    }]);

                },

                'fail': function (code, msg, json) {
                    KISP.alert('获取账套列表失败: {0}', msg);
                },

                'error': function () {
                    KISP.alert('获取账套列表错误: 网络繁忙，请稍候再试');
                },
            });


            api.post({
                'tid': opt.product.origin.tid,	//企业id
                'prod_id': opt.product.origin.prod_id,	//产品实例id
                'page': opt.page,
                'pagesize': opt.pagesize,
            });

        },

      

    };


});


KISP.panel('/Application/ChoseAcct/Content', function (require, module, panel) {

    var List = module.require('List');
    var Pager = module.require('Pager');

    var meta = {
        list: [],       //最终要显示的用户列表。
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

    });



    panel.on('render', function (data, nowChosed) {
        panel.$.find('[data-cmd="no-data-tip"]').toggleClass('show', !data.list.length);

        List.render(data.list, nowChosed);
        Pager.render({
            'total': data.pageinfo.total,
            'size': data.pageinfo.pagesize,
            'no': data.pageinfo.page,
        });

    });




    return {
        get: List.getChosed,
    };


});









KISP.panel('/Application/ChoseAcct/Footer', function (require, module, panel) {


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
* 添加产品对话框。
*/
KISP.panel('/Application/ChoseAcct', function (require, module, panel) {
    var KISP = require('KISP');

    var Content = module.require('Content');
    var Footer = module.require('Footer');
    var API = module.require('API');

    var Dialog = require('Dialog');
    var dialog = null;

    var toast = KISP.create('Toast', {
        duration: 1500,
        mask: 0,
    });
    var meta = {
        company: null,
        product: null,
        application: null,
    };
    var nowApplication = {};
    var nowChosed = {}; //当前选中的项账套

    panel.on('init', function () {

        dialog = Dialog.panel({
            'title': '选择账套',
            'width': 670,
            'height': 600,
            'z-index': 1023,
            'resizable': false,
            'container': panel,
            'content': Content,
            'footer': Footer,
        });


        dialog.on({
            'render': function () {
                API.get({
                    'product': meta.product,
                    'page': 1,
                    'pagesize': 10,
                });
            },
        });

        API.on('success', {
            'get': function (list, pageinfo) {
                var data = {
                    'list': list,
                    'pageinfo': pageinfo,
                }
                Content.render(data, nowChosed);
                Footer.render();
            },
        });

        Content.on({
            'page-chose': function (page) {
                API.get({
                    'page': page.no,
                    'pagesize': page.size,
                    'product': meta.product,
                });
            }
        })
        Footer.on({
            'ok': function () {
                dialog.close();

                var list = Content.get();
                nowChosed = list[0];

                if (!list.length) {
                    return KISP.alert('请选择一项。');
                }
                panel.fire('chosed-account', [list[0], meta.application]);
            },

            'cancel': function () {
                dialog.close();
            },
        });

    });


    panel.on('render', function (data) {
        meta.company = data.meta.company;
        meta.product = data.meta.product;
        meta.application = data.application;
        if (nowApplication.origin && (nowApplication.origin.slv_prod_id != meta.application.origin.slv_prod_id)) {
            nowChosed = {};  //换一个应用选账套时清空上次已选账套
        }
        nowApplication = meta.application;
        dialog.render();

    });



});








KISP.panel('/Application/Confirm/Footer', function (require, module, panel) {


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
KISP.panel('/Application/Confirm', function (require, module, panel) {
    

    var Content = module.require('Content');
    var Footer = module.require('Footer');
    var Dialog = require('Dialog');
    var dialog = null;

    var meta = {
        account: null,  //账套信息。
    };

    panel.on('init', function () {

        dialog = Dialog.panel({
            'title': '信息提示',
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








KISP.panel('/Application/Forbidden/Content/Head', function (require, module, panel) {

    var User = require('User');
    var checked = false;

    panel.on('init', function () {

    });
    panel.on('init', function () {
        panel.$on('click', {
            '[data-cmd="check"]': function () {
                checked = !checked;
                $(this).toggleClass('on', checked);
                panel.fire('check-all', [checked]);
            },

        });
    })




    panel.on('render', function (updateInfo) {

        // panel.fill({
        //     'items': list,
        // });

    });
    return {
        checkall: function (chosed) {
            checked = chosed;
            panel.$.find('[data-cmd="check"]').toggleClass('on', checked);
        }
    }
});









KISP.panel('/Application/Forbidden/Content/List', function (require, module, panel) {

    var User = require('User');

    var list = [];
    var Info;


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
                    return {
                        'index': index,
                        'name': item.name,
                        'tel': item.phone,
                    };

                },
            },
        });

    });
    panel.on('init', function () {
        panel.$on('click', {
            '[data-cmd="check"]': function () {
                var index = +this.getAttribute('data-index');
                list[index].chosed = !list[index].chosed
                var checked = list[index].chosed;
                $(this).toggleClass('on', checked);
                var some = list.some(function (item) {
                    return !item.chosed;
                })

                panel.fire('allcheck', [!some]);
            },

        });
    })




    panel.on('render', function (items) {

        list = items;

        panel.fill({
            'items': list,
        });

    });
    return {
        get: function () {
            var select = [];
            list.forEach(item => {
                if (item.chosed) { 
                    select.push(item.origin.user_id);
                }
            })
            return select;
        },
        checkall: function (checked) {
            list.forEach(function (item, index) {
                item.chosed = checked;
            })
            panel.$.find('[data-cmd="check"]').toggleClass('on', checked);
        }
    }



});








define('/Application/Forbidden/API', function (require, module, exports) {
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
             * 获取纷享销客用户列表。
             */
        get: function (opt) {

            var api = new API('web/apply/userList', {
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
                            'phone': item['mobile'],
                            'name': item['user_name'],
                            'status': item['status'],           //账套状态，0为禁用，1为启用，2为删除',
                            'isMananger': item['is_manager'],           //是否为管理员，0为普通用户，1为管理员',
                            'origin': item,
                        };
                    });


                    emitter.fire('success', 'get', [list]);

                },

                'fail': function (code, msg, json) {
                    KISP.alert('获取用户列表失败: {0}', msg);
                },

                'error': function () {
                    KISP.alert('获取用户列表错误: 网络繁忙，请稍候再试');
                },
            });


            api.post(opt);

        },



        /**
        * 设置用户状态。
        */
        post: function (opt) {

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
                'tid': opt.meta.company.origin['tid'],               //企业ID
                'prod_id': opt.meta.product.origin['prod_id'],       //产品ID
                'account_id': opt.meta.slvId, //应用ID
                'account_uid': opt.userid,  //需要被禁用的账套用户UID
                'status':0,                  //用户状态，0为禁用，1为启用，2为删除

            });

        },


    };


});


KISP.panel('/Application/Forbidden/Content', function (require, module, panel) {
    var List = module.require('List');
    var Head = module.require('Head');

    var meta = {
        list: [],       //最终要显示的用户列表。
    };

    panel.on('init', function () {
        Head.on({
            'check-all': function (checked) {
                List.checkall(checked);
            }
        });
        List.on({
            'allcheck': function (checked) { 
                Head.checkall(checked);
            }
        })

    });



    panel.on('render', function (data,updateInfo) {
        List.render(data);
        Head.render(updateInfo);
    });




    return {
        get: List.get,
    };


});









KISP.panel('/Application/Forbidden/Footer', function (require, module, panel) {


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
* 添加产品对话框。
*/
KISP.panel('/Application/Forbidden', function (require, module, panel) {
    var KISP = require('KISP');

    var Content = module.require('Content');
    var Footer = module.require('Footer');
    var API = module.require('API');

    var Dialog = require('Dialog');
    var dialog = null;

    var meta = {
        company: null,
        product: null,
        slvId: null,
        updateInfo: null,
    };

    panel.on('init', function () {

        dialog = Dialog.panel({
            'title': '信息提示',
            'width': 670,
            'height': 600,
            'z-index': 1023,
            'resizable': false,
            'container': panel,
            'content': Content,
            'footer': Footer,
        });


        dialog.on({
            'render': function () {
                API.get({
                    'tid': meta.product.origin.tid,	//企业id
                    'prod_id': meta.product.origin.prod_id,	//产品实例id
                    'slv_prod_id': meta.slvId,	//产品添加ID
                });
            },
        });

        API.on('success', {
            'get': function (data) {
                // data.forEach(function (item, index) {
                //     meta.application.forEach(function (appitem, num) {
                //         if (item.origin.slv_icrm_id === appitem.origin.slv_icrm_id) {
                //             item.chosed = true;
                //         }
                //     })
                // });


                Content.render(data, meta.updateInfo);
                Footer.render();
            },

            'post': function () {
                dialog.close();
                panel.fire('success');
            },
        });

        Footer.on({
            'ok': function () {
                var list = Content.get();
                var userid = list.join();
                if (!list.length) {
                    return KISP.alert('请至少选择一项。');
                }
                API.post({
                    'meta': meta,
                    'userid': userid,
                });
            },

            'cancel': function () {
                dialog.close();
            },
        });

    });


    panel.on('render', function (data) {
        meta.company = data.meta.company;
        meta.product = data.meta.product;
        meta.slvId = data.slvId;
        meta.updateInfo = data.updateInfo;
        dialog.render();

    });



});








KISP.panel('/Application/Manage/Content/Header', function (require, module, panel) {

    var listData = [];  //列表数据

    function Search(keyword) {
        var searchList = [];
        listData.map(function (item, index) {
            if (item.mobile.indexOf(keyword) != -1 || item.name.indexOf(keyword) != -1) {
                searchList.push(item);
            }
        });
        panel.fire('search', [searchList]);
    }
    panel.on('init', function () {

        panel.$on('click', {
            '[data-type="search"]': function () {
                var keyword = panel.$.find('[data-type="txt"]').val();
                Search(keyword);
            }
        });

    })


    panel.on('render', function (numInfo, list) {
        listData = list;
        panel.fill(numInfo, function () {
            return {
                'used': numInfo.used,
                'total': numInfo.total,
            }
        });
        panel.$.find('[data-type="txt"]').keypress(function () {
            if (event.keyCode === 13) {
                var keyword = panel.$.find('[data-type="txt"]').val();
                Search(keyword);

            }
        });
    });
    return {

    }



});









KISP.panel('/Application/Manage/Content/List', function (require, module, panel) {

    var User = require('User');

    var list = [];
    var selects = null;
    var Info;


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
                    return {
                        'index': index,
                        'name': item.name,
                        'acctname': item.acctname,
                        'mobile': item.mobile || '',
                        'time':item.time,
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

                if (checked) {
                    selects.delete(list[index].origin.prod_user_id);
                }
                else {
                    selects.add(list[index].origin.prod_user_id);
                }
                $(this).toggleClass('on', !checked);
                panel.$.find('[data-type="0"]').removeClass('on');
            },

        });
    })




    panel.on('render', function (items) {
        selects = new Set();

        list = items;


        panel.fill({
            'items': list,
        });

    });
    return {
        get: function () {
            return Array.from(selects);
        }
    }



});








/*
* 
*/
KISP.panel('/Application/Manage/Content/Pager', function (require, module, panel) {
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
            size: 10,               //每页的大小，即每页的记录数
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
        pager.render(options);
    });




});





define('/Application/Manage/API', function (require, module, exports) {
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
        * 获取应用使用人数数据。
        */
        getNum: function (opt) {

            var api = new API('web/apply/qingUserUsed', {
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

                    emitter.fire('success', 'get-num', [{
                        'total': data.count,
                        'used': data.used_count,
                    }]);
                },

                'fail': function (code, msg, json) {
                    KISP.alert('获取移动应用用户使用情况失败: {0}', msg);
                },

                'error': function () {
                    KISP.alert('获取移动应用用户使用情况错误: 网络繁忙，请稍候再试');
                },
            });

            api.post(opt);
        },


        /**
        * 获取移动应用用户列表。
        */
        get: function (opt) {

            var api = new API('web/apply/qingUserList', {
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
                    var list = data.list.map(function (item, index) {
                        return {
                            'name': item['user_name'],
                            'acctname':item['acct_name'],
                            'mobile': item['mobile'],
                            'time': item['last_used_time'],
                            'origin': item,
                        };
                    })
                    emitter.fire('success', 'get', [list, {
                        'total': data.count,
                        'page': data.page,
                        'pagesize': data.pagesize,
                    }]);
                },

                'fail': function (code, msg, json) {
                    KISP.alert('获取移动应用用户列表失败: {0}', msg);
                },

                'error': function () {
                    KISP.alert('获取移动应用用户列表错误: 网络繁忙，请稍候再试');
                },
            });

            api.post(opt);
        },

        /**
        * 解绑移动应用。
        */
        post: function (opt) {

            var api = new API('web/apply/unbindQingUser', {
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
                    toast.show('解绑用户成功', function () {
                        emitter.fire('success', 'post');
                    });
                },

                'fail': function (code, msg, json) {
                    KISP.alert('解绑用户失败: {0}', msg);
                },

                'error': function () {
                    KISP.alert('解绑用户错误: 网络繁忙，请稍候再试');
                },
            });

            api.post({
                'tid': opt.meta.product.origin.tid,	//企业id
                'prod_id': opt.meta.product.origin.prod_id,	//产品实例id
                'slv_prod_id': opt.meta.application.origin.slv_prod_id,
                'user_list': opt.user,
            });
        },


    };


});


KISP.panel('/Application/Manage/Content', function (require, module, panel) {
    var List = module.require('List');
    var Header = module.require('Header');
    var Pager = module.require('Pager');

    var meta = {
        list: [],       //最终要显示的用户列表。
    };

    panel.on('init', function () {
        Header.on({
            'search': function (list) { 
                List.render(list);
            }
        });

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
    });



    panel.on('render', function (numInfo, data, pageinfo) {
        panel.$.find('[data-cmd="no-data-tip"]').toggleClass('show', !data.length);
        Header.render(numInfo, data);
        List.render(data);
        Pager.render({
            'total': pageinfo.total,
            'size': pageinfo.pagesize,
            'no': pageinfo.page,
        });

    });




    return {
        get: List.get,
    };


});









KISP.panel('/Application/Manage/Footer', function (require, module, panel) {


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
* 添加产品对话框。
*/
KISP.panel('/Application/Manage', function (require, module, panel) {
    var KISP = require('KISP');

    var Content = module.require('Content');
    var Footer = module.require('Footer');
    var API = module.require('API');

    var Dialog = require('Dialog');
    var dialog = null;

    var meta = {
        company: null,
        product: null,
        application: null,
    };
    var numInfo = {};

    panel.on('init', function () {

        dialog = Dialog.panel({
            'title': '用户管理',
            'width': 670,
            'height': 600,
            'z-index': 1023,
            'resizable': false,
            'container': panel,
            'content': Content,
            'footer': Footer,
        });


        dialog.on({
            'render': function () {
                API.getNum({
                    'tid': meta.product.origin.tid,	//企业id
                    'prod_id': meta.product.origin.prod_id,	//产品实例id
                    'slv_prod_id':meta.application.origin.slv_prod_id,
                });

            },
        });

        API.on('success', {
            'get-num': function (data) {
                numInfo = data;
                API.get({
                    'page': 1,
                    'pagesize': 10,
                    'tid': meta.product.origin.tid,	//企业id
                    'prod_id': meta.product.origin.prod_id,	//产品实例id
                    'slv_prod_id':meta.application.origin.slv_prod_id,
                });
            },
            'get': function (data, pageinfo) {
                Content.render(numInfo, data, pageinfo);
                Footer.render();
            },

            'post': function () {
                dialog.close();
                panel.fire('success');
            },
        });

        Content.on({
            'page-chose': function (page) {
                API.get({
                    'page': page.no,
                    'pagesize': page.size,
                    'tid': meta.product.origin.tid,	//企业id
                    'prod_id': meta.product.origin.prod_id,	//产品实例id
                    'slv_prod_id':meta.application.origin.slv_prod_id,                    
                });
            }
        })
        Footer.on({
            'ok': function () {
                var list = Content.get();
                var userid = list.join();
                if (!list.length) {
                    return KISP.alert('请至少选择一项。');
                }
                API.post({
                    'meta': meta,
                    'user': userid,
                });
            },

            'cancel': function () {
                dialog.close();
            },
        });

    });


    panel.on('render', function (data) {
        meta.company = data.company;
        meta.product = data.product;
        meta.application = data.application;
        dialog.render();

    });



});








KISP.panel('/Application/Purchase/Content/List', function (require, module, panel) {

    var KISP = require('KISP');
    var $Date = KISP.require('Date');
    
    var User = require('User');

    var list = [];
    var selects = null;
    var Info;


    panel.on('init', function () {
        //产品到期时间小于30天时标红显示。
        function getExpiredClass(date) {
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
                        'num': item.num,
                        'date': item.date || '',
                        'sn': item.sn,
                        'expire-class': getExpiredClass(item.date),
                    };

                },
            },
        });

    });
    panel.on('init', function () {

    })




    panel.on('render', function (items) {
        selects = new Set();

        list = items;


        panel.fill({
            'items': list,
        });

    });
    return {

    }



});








define('/Application/Purchase/API', function (require, module, exports) {
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
        * 获取应用。
        */
        get: function (opt) {


            var api = new API('web/apply/licenseList', {
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
                    var list = data.map(function (item, index) {
                        return {
                            'sn': item['slv_prod_sn'],
                            'num': item['user_num'],
                            'date': item['expired_date'],
                            'origin': item,
                        };
                    })
                    emitter.fire('success', 'get', [list]);
                },

                'fail': function (code, msg, json) {
                    KISP.alert('获取应用购买详情失败: {0}', msg);
                },

                'error': function () {
                    KISP.alert('获取应用购买详情错误: 网络繁忙，请稍候再试');
                },
            });

            api.post(opt);
        },

    };


});


KISP.panel('/Application/Purchase/Content', function (require, module, panel) {

    
    var List = module.require('List');

    var meta = {
        list: [],       //最终要显示的用户列表。
    };

    panel.on('init', function () {
    });



    panel.on('render', function (data, pageinfo) {
        List.render(data);
    });




    return {
        get: List.get,
    };


});









KISP.panel('/Application/Purchase/Footer', function (require, module, panel) {


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
* 添加产品对话框。
*/
KISP.panel('/Application/Purchase', function (require, module, panel) {
    

    var Content = module.require('Content');
    var Footer = module.require('Footer');
    var API = module.require('API');

    var Dialog = require('Dialog');
    var dialog = null;

    var meta = {
        company: null,
        product: null,
        application: null,
    };

    panel.on('init', function () {

        dialog = Dialog.panel({
            'title': '购买详情',
            'width': 670,
            'height': 600,
            'z-index': 1023, 
            'resizable': false,
            'container': panel,
            'content': Content,
            'footer': Footer,
        });


        dialog.on({
            'render': function () {
                API.get({
                    'tid': meta.product.origin.tid,	//企业id
                    'prod_id': meta.product.origin.prod_id,	//产品实例id
                    'slv_prod_id': meta.application.origin.slv_prod_id,	//产品添加ID
                });
            },
        });

        API.on('success', {
            'get': function (data) {
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


    panel.on('render', function (data) {
        meta.company = data.meta.company;
        meta.product = data.meta.product;
        meta.application = data.application;
        dialog.render();

    });



});







/*
* 
*/
KISP.panel('/Application/Header', function (require, module, panel) {
    
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


    panel.on('render', function (data) {
        panel.fill({
            'company': data.company.name,
            'product': data.product.name,
        });


    });
    return {
        setList: function (list) {
            var userInfo = User.get();
            if (userInfo) {
                panel.$.find('[data-type="add-bar"]').addClass('on');
                return;
            }
            panel.$.find('[data-type="add-bar"]').removeClass('on');
        }
    }

});







/*
* 
*/
KISP.panel('/Application/Main', function (require, module, panel) {
    var KISP = require('KISP');
    var API = module.require('API');
    var List = module.require('List');
    var Header = module.require('Header');
    var News = module.require('News');

    var meta = {
        company: null,
        product: null,
    };


    panel.on('init', function () {

        List.on({
            'cmd': {
                '': function (cmd, item) {
                    panel.fire(cmd, [item]);
                },
                'refresh': function () {
                    API.get(meta);
                },
                'free-test': function (item) {    //免费试用
                    if (meta.product.status === 0) {
                        return KISP.alert('请先试用主产品后再进行副产品试用');
                    }
                    API.test({
                        'slv_icrm_id': item.origin.slv_icrm_id,	//应用产品id
                        'slv_prod_id': item.origin.slv_prod_id,	//产品添加ID
                        'tid': meta.company.origin.tid,        //企业id。
                        'prod_id': meta.product.origin.prod_id,    //产品id。
                    })
                },
                'update': function (item) {   //更新服务
                    API.update({
                        'meta': meta,
                        'item': item
                    })
                },
                'delete': function (item) {  //删除应用
                    API.delete({
                        'slv_prod_id': item.origin.slv_prod_id,	//产品添加ID
                        'tid': meta.company.origin.tid,        //企业id。
                        'prod_id': meta.product.origin.prod_id,    //产品id。
                    })
                },
                'manage': function (item) {  //分享逍客应用管理
                    API.getUrl({
                        'tid': meta.company.origin.tid,        //企业id。
                        'prod_id': meta.product.origin.prod_id,    //产品id。
                    })
                },
            },
        });

        API.on('success', {
            'get': function (list) {
                Header.render();
                List.render(list, meta.product);
                News.render(list);
                panel.fire('get-list', [list]);
            },
            'get-wxlsuccess': function (data) {

                window.open(data.url, '_blank');
            },
            'get-success': function (data) {
                window.open(data.url, '_blank');
            },
            //更新产品成功后/切换为私有云/启用公有云/修改产品名称后，需刷新列表。
            'refresh': function () {
                API.get(meta);
            },
        });
        API.on({
            // 'update-fail': function (slvId, data) {  //暂时不弹框批量禁用用户
            //     panel.fire('update-fail', [slvId, data]);
            // },
            'update-fail': function (item) {
                panel.fire('add-users', [item]);
            },
        })

    });



    panel.on('render', function (data) {
        meta.company = data.company;
        meta.product = data.product;

        API.get(meta);
    });
    return {
        getwxlurl: function (meta) {
            API.getwxlUrl({
                'tid': meta.company.origin.tid,        //企业id。
                'prod_id': meta.product.origin.prod_id,    //产品id。
                'slv_prod_id': meta.application.origin.slv_prod_id,	//产品添加ID
                'account_id':meta.acctitem.origin.account_id,
            })
        }
    }

});







/*
* 某个企业下的产品列表。
*/
KISP.view('/Application', function (require, module, view) {


    var Header = module.require('Header');
    var Main = module.require('Main');
    var Add = module.require('Add');
    var Manage = module.require('Manage');
    // var Forbidden = module.require('Forbidden');   //此功能暂时不做  判断用户数是否已超过，超过则跳出禁用客户
    var Purchase = module.require('Purchase');
    var Bind = module.require('Bind');
    var ChoseAcct = module.require('ChoseAcct');

    var meta = {
        company: null,
        product: null,
        application: null,  //应用列表
    };

    view.on('init', function () {
        ChoseAcct.on({
            'chosed-account': function (acctitem, appitem) {
                Main.getwxlurl({
                    acctitem: acctitem,
                    company: meta.company,
                    product: meta.product,
                    application: appitem,
                })
            }
        })
        Header.on({
            //跳到根节点，即我的企业，不需要传数据。
            'company-list': function () {
                view.fire('company-list');
            },
            // 跳转到企业列表页面
            'product-list': function () {
                view.fire('product-list', [meta.company]);
            },
            //刷新应用列表。
            'my-product': function () {
                Main.render(meta);
            },
            //添加应用。
            'add-application': function () {
                Add.render(meta);
            },
        });

        Main.on({
            'bind-account': function (item) {  //绑定账套
                Bind.render({
                    meta: meta,
                    application: item,
                });
            },
            'paramset': function (item) {  //参数设置时选择账套
                ChoseAcct.render({
                    meta: meta,
                    application: item,
                });
            },
            'purchase': function (item) {  //购买详情
                Purchase.render({
                    meta: meta,
                    application: item,
                });
            },
            'add-users': function (item) {  //添加用户
                var data = {
                    company: meta.company,
                    product: meta.product,
                    application: item,
                }
                view.fire('add-users', [data]);
            },
            'user-manage': function (item) {  //移动应用用户管理
                var data = {
                    company: meta.company,
                    product: meta.product,
                    application: item,
                }
                Manage.render(data);
            },
            'get-list': function (list) {   //
                meta.application = list;
            },
            // 'update-fail': function (slvId, data) {
            //     Forbidden.render({
            //         meta: meta,
            //         slvId: slvId,
            //         updateInfo: data,
            //     });
            // },

        })

        Add.on({
            //添加产品成功，刷新产品列表。
            'success': function () {
                Main.render(meta);
            },
        });

        Bind.on({
            //绑定账套成功，刷新产品列表。
            'success': function () {
                Main.render(meta);
            },
        });

    });


    /**
    * 渲染。
    *   data = {
    *       company: {},    //企业信息。
    *       product:{},      //产品信息
    *   };
    */
    view.on('render', function (data) {
        var company = meta.company = data.company;
        var product = meta.product = data.product;
        Header.render(meta);
        Main.render(meta);
    });




});





