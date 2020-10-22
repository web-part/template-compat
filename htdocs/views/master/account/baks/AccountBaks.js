
/*
* 某个产品下的账套备份列表。
*/
KISP.view('/AccountBaks', function (require, module, view) {
    var Header = module.require('Header');
    var Auto = module.require('Auto');
    var Manual = module.require('Manual');
    var Private = module.require('Private');
    var Confirm = module.require('Confirm');
    var VCode = module.require('VCode');
    var Tabs = module.require('Tabs');
    var API = module.require('API');

    var meta = {
        company: null,
        product: null,
        item: null,     //记录要操作的项，单个时为 item，批量时为 list。 
        M: null,        //记录当前正在操作的模块，只能为 Manual、Auto、Private 之一。 用于在删除记录后调用该模块进行刷新。
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

            //刷新列表。
            'refresh': function () {
                view.refresh();
            },

        });

        //切换页签。
        Tabs.on('change', {
            'auto': function (item) {
                Private.hide();
                Manual.hide();
                Auto.render(meta);
            },

            'manual': function (item) {
                Private.hide();
                Auto.hide();
                Manual.render(meta);
            },

            'private': function () {
                Auto.hide();
                Manual.hide();
                Private.render(meta);
            },
        });


        [Auto, Manual, Private].forEach(function (M) {

            M.on('delete', {
                //单个删除。
                'item': function (item) {
                    meta.M = M;
                    meta.item = item;
                    Confirm.delete(item);
                },

                //批量删除。 
                //目前仅针对公有云。
                'list': function (list) {
                    meta.M = M;
                    meta.item = list;

                    //需要验证码。
                    VCode.delete(meta.company);
                },
            });

            M.on({
                //单个下载。
                'download': function (item) {
                    meta.item = item;
                    Confirm.download(item);
                },
            });
        });

      
        

        //确认对话框，针对单个删除或下载的。
        Confirm.on({
            //单个删除。
            'delete': function () {
                if (meta.item.status == 2) { //备份异常、备份失败的，直接删除，无需验证码。
                    API.delete({
                        'company': meta.company,
                        'item': meta.item,
                    });
                }
                else { //需要验证码。
                    VCode.delete(meta.company, meta.item);
                }
            },

            //单个下载。
            'download': function () {
                //需要验证码。
                VCode.download(meta.company, meta.item);
            },
        });

        //获得短信验证码后，确认提交。
        VCode.on('submit', {

            //提交删除。
            'delete': function (form) {
                //删除一和或多条账套备份记录。
                API.delete({
                    'company': meta.company,
                    'form': form,
                    'item': meta.item,
                });
            },

            //提交下载。
            'download': function (form) {
                API.download({
                    'company': meta.company,
                    'item': meta.item,
                    'form': form,
                });
            },
        });


        //提交成功。
        API.on('success', {
            //删除成功，包括单个和批量的。
            'delete': function () {
                meta.M.reset();     //重置，以便能刷新。
                meta.M.refresh();   //
                VCode.hide();
            },

            //下载成功，动态获得 url。
            'download': function (url) {
                VCode.hide();
                location.href = url; //设置 url 即可直接下载。
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
        meta.company = data.company;
        meta.product = data.product;
        meta.item = null;
        meta.M = null;

        Header.render(meta);

        Auto.reset();
        Manual.reset();
        Private.reset();

        Tabs.render(0);

    });




});





