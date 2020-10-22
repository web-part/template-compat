
define('/AddCompanys/Content/API', function (require, module, exports) {
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



        get: function (opt, list) {
            
            var api = new API('web/org/org_list', {
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
                    var list = data.map(function (item) {

                        return {
                            'tid':item.tid,
                            'name': item.name,
                            'num': item.use_prod_num,
                            'phone': item.admin_mobile,
                            'status':item.org_status,
                            'creatName': item.admin_name,
                            'ifChecked': item.is_show?true:false,
                        };

                    });
                    emitter.fire('success', [list]);


                },

                'fail': function (code, msg, json) {

                    KISP.alert('获取企业列表失败: {0}', msg, function () {
                        emitter.fire('fail', 'post');
                    });
                },

                'error': function () {
                    KISP.alert('获取企业列表失败错误: 网络繁忙，请稍候再试');
                },
            });
            api.post({

            });

        },
    };


});


KISP.panel('/AddCompanys/Content/Header', function (require, module, panel) {
    

    var list = {};
    var allChosed = false;

    panel.on('init', function () {

        panel.$on('click', {
            '[data-cmd="check-all"]': function (event) {

                list.now.forEach(function (item, index) {
                    if (!list.origin[index].ifChecked) {
                        item.ifChecked = !allChosed;
                    }
                });
                allChosed = !allChosed;

                $(this).toggleClass('on', allChosed);

                panel.fire('all-chosed', [allChosed]);
            }
        });

    });



    panel.on('render', function (data) {
        list = data.list;
        allChosed = data.allChosed;
        panel.$.find('[data-cmd="check-all"]').toggleClass('on', allChosed);
        
    });

    return {
        'allChosed': function (status) {
            allChosed = status;
            panel.$.find('[data-cmd="check-all"]').toggleClass('on', allChosed);
        }
    };


});









KISP.panel('/AddCompanys/Content/List', function (require, module, panel) {
    
    var User = require('User');

    var list = {};
    var allChosed = null;
    var status$text = {
        '0': '未认证',
        '1': '审核中',
        '2': '已认证',
        '3': '认证失败'
    };
    panel.on('init', function () {
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
                        return {
                            'index': index,
                            'name': item.name,
                            'num': item.num,
                            'phone': item.phone,
                            'status': status$text[item.status],
                            'creatName': item.creatName,
                            'ifChecked': item.ifChecked ? 'has-chosed' : '',
                        };

                    },
                },
            },

            //无数据时，显示一个大大的创建按钮。
            'add': function (data) {
                return data.items.length ? '' : {};
            },
        });

        panel.$on('click', {
            '[data-cmd="check"]': function () {
                var index = +this.getAttribute('data-index');
                var item = list.now[index];
                var ifAllChosed = true;

                if (list.origin[index].ifChecked) {
                    return;
                }

                $(this).toggleClass('on');
                item.ifChecked = !item.ifChecked;

                list.now.forEach(function (item, index) {
                    if (!item.ifChecked) {
                        ifAllChosed = false;
                    }
                })

                if (ifAllChosed == allChosed) {
                    return;
                }
                allChosed = ifAllChosed;

                panel.fire('chose-status', [ifAllChosed]);

            }
        });

    });



    panel.on('render', function (data) {
        list = data;
        list.now.forEach(function (item, index) {
            item.ifChecked ? '' : allChosed = false;
        });
        panel.fill({
            'items': list.now,
        });

        var userInfo = User.get();
        
        if (userInfo) {
            panel.$.find('[data-type="create-com"]').addClass('on');
            return;
        }
        panel.$.find('[data-type="create-com"]').removeClass('on');


    });

    return {
        'setStatus': function (status) {
            allChosed = status;
            panel.$.find('[data-cmd="check"]').toggleClass('on', status);
        },
        'get': function () {
            
            var chosedData = [];
            list.now.forEach(function (item, index) {
                if (item.ifChecked && !list.origin[index].ifChecked) { 
                    chosedData.push(item.tid);
                }
            })
           
            return chosedData;
        }
    };


});








define('/AddCompanys/Header/API', function (require, module, exports) {
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



        post: function (list) {
            var api = new API('web/org/to_show', {
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
                        emitter.fire('success');
                    });

                },

                'fail': function (code, msg, json) {
                    KISP.alert('添加企业到常用企业列表中失败: {0}', msg, function () {
                        emitter.fire('fail', 'post');
                    });
                },

                'error': function () {
                    KISP.alert('添加企业到常用企业列表中错误: 网络繁忙，请稍候再试');
                },
            });

            list = JSON.stringify(list);
            list = encodeURIComponent(list);
            api.post({
                tid: list,
            });

        },
    };


});


KISP.panel('/AddCompanys/Content', function (require, module, panel) {

    var List = module.require('List');
    var Header = module.require('Header');
    var API = module.require('API');
    var meta = {
        origin: [],
        now: [],
    };
    var allData = [];

    panel.on('init', function () {

        panel.$on('click', {
            '[data-cmd="register"]': function () {
                panel.fire('register');
            }
        })

        API.on({
            'success': function (list) {
                allData = list;
                DealData(list)
            }
        });
        Header.on({
            'all-chosed': function (status) {
                List.setStatus(status);
            },
            'ok': function (list) {
                API.post(list);
            }
        });
        List.on({
            'chose-status': function (status) {
                Header.allChosed(status);
            },

        })

    });

    function DealData(list) {
        var allChosed = true;

        meta.origin = JSON.parse(JSON.stringify(list));
        meta.now = list;
        if (list.length) {
            list.forEach(function (item, index) {
                if (!item.ifChecked) {
                    allChosed = false;
                }
            });
        } else {
            allChosed = false;
        }



        Header.render({
            'allChosed': allChosed,
            'list': meta,
        });
        List.render(meta);
    }

    panel.on('render', function (keyword) {
        if (keyword !== undefined && allData.length) {
            var searchList = [];
            allData.map(function (item, index) {
                if (item.name.toLowerCase().indexOf(keyword.toLowerCase()) != -1) {
                    searchList.push(item);
                }
            });
            DealData(searchList);
            return;
        }

        if (keyword == undefined) {
            API.get();
        }

    });

    return {
        'get': List.get,
    };


});









KISP.panel('/AddCompanys/Header', function (require, module, panel) {

    var KISP = require('KISP');


    var API = module.require('API');

    panel.on('init', function () {


        panel.$on('click', {
            '[data-cmd]': function () {
                var cmd = this.getAttribute('data-cmd');
                panel.fire(cmd);
            },
            '[data-type="search"]': function () {
                var keyword = panel.$.find('[data-type="txt"]').val();
                panel.fire('search', [keyword]);
            }
        });

        panel.$.find('[data-type="txt"]').on({
            'keypress': function () {
                if (event.keyCode === 13) {
                    var keyword = panel.$.find('[data-type="txt"]').val();
                    panel.fire('search', [keyword]);
                }
            }
        });

        API.on({
            'success': function () {
                panel.fire('add-success');
            }
        })

    });



    panel.on('render', function () {

    });

    return {
        'postData': function (list) {
            if (!list.length) {
                return KISP.alert('请至少选择一项。');
            }
            API.post(list);
        }
    };


});




/*
* 
*/
KISP.view('/AddCompanys', function (require, module, view) {
    var Content = module.require('Content');
    var Header = module.require('Header');


    view.on('init', function () {


        Content.on({
            //注册企业。
            'register': function () {
                view.fire('register');
            },
        });


        Header.on({
            'ok': function () {
                var list = Content.get();
                Header.postData(list);

            },
            'company-list': function () {
                view.fire('to-companys');
            },
            'search': function (keyword) { 
                Content.render(keyword);
            },
            //注册企业。
            'register': function () {
                view.fire('register');
            },
            'add-success': function () {
                view.fire('add-success');
            },
        });

    });


    view.on('render', function (data) {
        Content.render();
        Header.render();

    });

});





