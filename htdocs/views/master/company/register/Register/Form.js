

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