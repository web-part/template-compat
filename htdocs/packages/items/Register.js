
define('/Register/API', function (require, module, exports) {
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
    });




    return {
        'on': emitter.on.bind(emitter),

        post: function (opt) {
            var api = new API('web/user/reg_enterprise_new', {
                proxy: true,
            });

            api.on({
                'request': function () {
                    loading.show('注册中...');
                },

                'response': function () {
                    loading.hide();
                },

                'success': function (data, json, xhr) {

                    toast.show('注册企业成功', function () {
                        emitter.fire('success', []);
                    });
                },

                'fail': function (code, msg, json) {
                    KISP.alert('注册企业失败: {0}', msg);
                },

                'error': function () {
                    KISP.alert('注册企业错误: 网络繁忙，请稍候再试');
                },
            });



            api.post({
                'enterprise_name': opt.name,
            });

        },


    };


});


KISP.panel('/Register/Form', function (require, module, panel) {
    var KISP = require('KISP');


    panel.set('show', false);

    /**
    * 初始化时触发。
    * 即首次 render 之前触发，且仅触发一次。
    * 适用于创建实例、绑定事件等只需要执行一次的操作。
    */
    panel.on('init', function () {
        var toast = KISP.create('Toast', {
            duration: 1500,
            icon: 'close',
        });


        panel.$on('click', {
            '[data-cmd="submit"]': function () {

                var $name = panel.$.find('[name="name"]');
                var name = $name.val();

                if (!name) {
                    toast.show('企业名称必填', function () {
                        $name.focus();
                    });
                }
                else {
                    panel.fire('submit', [name]);
                }

            },
        });

        panel.$.on({
            'keypress': function (event) {
                if (event.keyCode === 13) {
                    var $name = panel.$.find('[name="name"]');
                    var name = $name.val();

                    if (!name) {
                        toast.show('企业名称必填', function () {
                            $name.focus();
                        });
                    }
                    else {
                        panel.fire('submit', [name]);
                    }
                }
            },
        })

    });



    /**
    * 渲染时触发。
    * 即外界显式调用 render() 时触发，且每次调用都会触发一次。
    * 外界传进来的参数会原样传到这里。
    */
    panel.on('render', function () {
        panel.$.removeClass('on');
        panel.$.find('[name="name"]').val('');

    });

    panel.on('show', function () {
        panel.$.addClass('on');
    });



});

/*
* 
*/
KISP.panel('/Register/Header', function (require, module, panel) {
    

 


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








KISP.panel('/Register/Types', function (require, module, panel) {
    var KISP = require('KISP');
    

    var list = [
        { value: '0', },
        { value: '1', },
        { value: '2', },
        { value: '3', },
        
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

            panel.fire('change', [item]);

        });



    });



    /**
    * 渲染时触发。
    * 即外界显式调用 render() 时触发，且每次调用都会触发一次。
    * 外界传进来的参数会原样传到这里。
    */
    panel.on('render', function () {
        tabs.reset();
        tabs.render();

    });





});

/*
* 注册企业。
*/
KISP.view('/Register', function (require, module, view) {
    var API = module.require('API');
    var Header = module.require('Header');
    var Types = module.require('Types');
    var Form = module.require('Form');


    var meta = {
        type: '',
    };

    view.on('init', function () {

        Header.on({
            //跳回到企业列表。
            'company-list': function () {
                view.fire('company-list');
            },
        });


        Types.on({
            'change': function (item) {
                meta.type = item.value;
                Form.show();
            },
        });

        Form.on({
            'submit': function (name) {
                API.post({
                    'type': meta.type,
                    'name': name,
                });
            },
        });

        API.on({
            //注册企业成功，跳回企业列表页。
            'success': function () {
                view.fire('addcompany-list');
            },
        });
    
    });


    view.on('render', function () {
        meta.type = '';

        Header.render();
        Types.render();
        Form.render();

    });



});





