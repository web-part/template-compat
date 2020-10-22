
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



