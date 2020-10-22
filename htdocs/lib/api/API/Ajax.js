
/**
* 针对 IE8、IE9 的跨域资源请求。
* 使用了 IE8、IE9 下特定的对象 XDomainRequest 来请求。
* 注意，XDomainRequest 是非标准对象。 在高级浏览器中，已改成了 XMLHttpRequest;
* 
* 后端的架构：
*   前端原本要请求目标接口 A，在 XDomainRequest 下，改成请求代理接口 `service/kiswebapp/web_api_router`，
*   并把目标接口 A 的名称和数据 post 给代理接口。
*   代理接口接收到后，进行数据转换，转发请求给目标接口 A，然后再转发返回值给前端。
*/
define('API/Ajax', function (require, module, exports) {

    var $Object = KISP.require('Object');
    var $String = KISP.require('String');
    var Query = KISP.require('Query');
    var Proxy = KISP.require('Proxy');
    var JSON = KISP.require('JSON');

    //空函数。
    function noop() {

    }



    //[XDomainRequest](https://developer.mozilla.org/zh-CN/docs/Web/API/XDomainRequest)

    /**
    * 发起 ajax 网络请求(核心方法)。
    *   method: '',             //网络请求的方式：'get' 或 'post'。
    *   config = {
    *       name: '',           //必选，后台接口的名称，会用在 url 中。
    *       url: '',            //可选，请求的 url 地址。
    *       proxy: false,       //是否启用代理。 要启用，可以指定为 true，或一个具体的 json 或 js 文件名。
    *       successCode: 200,   //指示请求成功时的代码。 数字或字符串。
    *       timeout: 0,         //超时时间。 如果指定为 0，则使用浏览器内置的超时管理，会调用 error 回调函数。
    *
    *       data: {},           //可选，要发送的数据。 
    *       field: {}           //响应中的映射字段。
    *           
    *       success: fn,        //请求成功时的回调函数。
    *       fail: fn,           //请求失败时的回调函数。
    *       error: fn,          //请求错误时的回调函数。
    *       ontimeout: fn,      //请求超时时的回调函数。
    *
    *   };
    * 返回： 
    *   XDomainRequest 实例对象 xdr。 
    *   如果使用的是代理，则返回 null。
    */
    function request(method, config) {
      
        var proxy = config.proxy;

        if (proxy) { //使用了代理
            Proxy.request(proxy, config);
            return null;
        }



        var isTimeout = false; //指示是否已超时
        var tid = null;
        var timeout = config.timeout || 0;
        var successCode = config.successCode;
        var field = config.field;

        var fnTimeout = config.ontimeout || noop;
        var fnSuccess = config.success || noop;
        var fnFail = config.fail || noop;
        var fnError = config.error || noop;


        var url = config.url + 'service/kiswebapp/web_api_router';



        //同时启动超时器和发起请求，让它们去竞争。

        if (timeout > 0) {
            tid = setTimeout(function () {
                isTimeout = true;
                xdr.abort(); //取消当前响应，关闭连接并且结束任何未决的网络活动。
                fnTimeout(xdr);

            }, timeout);
        }



        //
        var xdr = new XDomainRequest();
        xdr.open(method, url);

        xdr.onload = function (res) {
            if (isTimeout) {
                return;
            }

            clearTimeout(tid);


            //要用这个，不要用 res.target.responseText；
            //在纯 IE9 下，res.target 为空。
            var responseText = xdr.responseText;

            var json = JSON.parse(responseText);

            if (!json) {
                fnError(xdr);
                return;
            }


            var code = json[field.code];

            if (code == successCode) {
                var data = (field.data in json) ? json[field.data] : {};
                fnSuccess(data, json, xdr);
            }
            else {
                var msg = json[field.msg];
                fnFail(code, msg, json, xdr);
            }
        };

        xdr.ontimeout = function () {
            fnTimeout(xdr);
        };

        xdr.onerror = function () {
            fnError(xdr);
        };



        var name = 'kis/' + config.name;    //如 `web/login/login` -> `kis/web/login/login`
        name = name.split('/').join('.');   //如 `kis/web/login/login` -> `kis.web.login.login`


        var json = {
            'api': name,
            'method': method,
            'custdata': config.data || {},
        };

        json = JSON.stringify(json);

        xdr.send(json);


        return xdr;
    }






    return  {

        get: function (config) {
            return request('get', config);
        },

        post: function (config) {
            return request('post', config);
        },
    };

    

});


