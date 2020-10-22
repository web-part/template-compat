
(function () {

    //业务层自定义的数据。

    // var isMac = navigator.platform.toLowerCase().indexOf('mac') != -1;
    //var url = isMac ?
    //    'http://downloads.cmcloud.cn/kis/kiscloud/KISYunClient.Mac.pkg' :
    //    'http://downloads.cmcloud.cn/kis/kiscloud/KISCloudClient.exe';



    /**
    * 每次发布时，请根据需要去更改!!!!!。
    */
    //var env = 'official';   //正式环境。
    //var env = 'public';     //公测环境和体验环境。
    var env = 'test';       //测试环境。





    var env$downurl = {
        'official': 'http://downloads.cmcloud.cn/kis/kiscloud/stable/KISCloudClient.exe',   //正式环境下载插件地址
        'public': 'http://downloads.cmcloud.cn/kis/kiscloud/KISCloudClient.exe',   //测试、体验环境下载插件地址
        'test': 'http://downloads.cmcloud.cn/kis/kiscloud/KISCloudClient.exe',
    };

    var isMac = navigator.platform.toLowerCase().indexOf('mac') != -1;
    var url = isMac ? 'http://downloads.cmcloud.cn/kis/kiscloud/stable/KisyunClient.mac.dmg' : env$downurl[env];


    var env$data = {
        //测试环境。
        'test': {
            //api: 'http://172.18.4.39:8088/',
            // api: 'http://172.20.58.45:8088/',  //杨斌环境
            api: 'http://kisdep.kingdee.com:8088/',
            plugin: url,
            help: 'http://kisdep.kingdee.com:8181/docs/show/230',
        },

        //公测环境和体验环境。
        'public': {
            //api: 'http://kisapp.kingdee.com:8088/',
            api: 'https://kisapp.kingdee.com/',
            plugin: url,
            help: 'https://kisdep.kingdee.com/docs/show/230',
        },

        //正式环境。
        'official': {
            api: 'https://kisyun.kingdee.com/',
            plugin: url,
            help: 'https://kisdep.kingdee.com/docs/show/129',
        },
    };






    KISP.data({
        'pager': {
            size: 20,    //分页大小,
        },
        'plugin': {
            url: env$data[env].plugin,   //这个配置会删掉，请相应的模块逐步使用下面的 `env` 节点。
        },

        'environment': env,             //这个配置会删掉，请相应的模块逐步使用下面的 `env` 节点。

        //相应的环境和数据。
        'env': {
            'name': env,            //环境的名称。
            'data': env$data[env],  //环境的数据。
        },


        '/AccountCreate/Type2/Content/Subject/List': {
            'env': env,
        },


        '/Products/Main/API': {
            test: 1, // 1 跳到测试环境， 其它的为我的本机 'http://172.20.58.63/Web/kis-o2o/htdocs/index.html'
        },

        '/Products/Buy/API': {
            test: 1, // 1 跳到测试环境， 其它的为我的本机 'http://172.20.58.63/Web/kis-o2o/htdocs/index.html'
        },

        '/Header/API': {
            test: 1, // 1 跳到测试环境， 其它的为我的本机 'http://172.20.58.63/Web/kis-o2o/htdocs/index.html'
        },
    });



    // KISP 内部模块所需要的默认配置
    KISP.config({
        'API': {
            /**
            * API 接口 Url 的主体部分。
            */
            url: env$data[env].api,


            /**
            * API 接口 Url 的后缀部分。
            * 针对那些如 '.do'、'.aspx' 等有后缀名的接口比较实用。
            */
            ext: '',

            /**
            * 在 url 中增加一个随机 key，以解决缓存问题。
            * 当指定为 false 时，则禁用。
            */
            random: false,

            //为了防止后台过快的返回数据而显示让某些需要显示
            //"数据加载中"的效果不明显， 这里强行加上一个随机延迟时间。
            delay: {
                min: 100,
                max: 400,
            },
        },


        'App': {
            name: 'kis-cloud-FD56F4B0C998',
        },

        'Proxy': {
            base: 'api/',
        },

        'Mask': {
            'opacity': 0.5,
        },

        'View': {

        },

        //'Tabs/Events': {
        //    test:true,
        //},
    });




    /**master.debug.begin*/
    //------------------------------------------------------------------------
    //开发过程中用到的配置，正式发布后自动化工具会自动删掉的。 

    KISP.data({
        //自动填充登录框。
        'login': {
            // phone: '13317484766',
            // password: 'kis123456',

            //龚欢的。
            phone: '13246651431',
            password: '613569gh',

            ////sl
            //phone: '17373649847',
            //password: 'sl891218',

            //phone: '18684656330',
            //password: 'sl891218',
        },

        '/Products/Main/API': {
            test: 0, // 1 跳到测试环境， 其它的为我的本机 'http://172.20.58.63/Web/kis-o2o/htdocs/index.html'
        },

        '/Products/Buy/API': {
            test: 0, // 1 跳到测试环境， 其它的为我的本机 'http://172.20.58.63/Web/kis-o2o/htdocs/index.html'
        },

        '/Header/API': {
            test: 0, // 1 跳到测试环境， 其它的为我的本机 'http://172.20.58.63/Web/kis-o2o/htdocs/index.html'
        },
    });




    //----------------------------------------------------------------------------------------
    /**master.debug.end*/




})();

