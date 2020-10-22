/*
* babel time: 2020-10-19 16:42:31
*
* source md5: 27D343B619B065E03DB2625304BE7DC3
*
* source file: htdocs/lib/api/API.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

/**
* 云 API。 
* 主要实现自动加上 uid、和 access_token 等必要字段。
*/
define('API', function (require, module, exports) {
    var $ = require('$');
    var KISP = require('KISP');
    var SessionStorage = KISP.require('SessionStorage');
    var MD5 = KISP.require('MD5');
    var $String = KISP.require('String');
    var $Date = KISP.require('Date');
    var Emitter = KISP.require('Emitter');

    var Ajax = module.require('Ajax');
    var Sign = module.require('Sign');

    var storage = new SessionStorage(module.id);
    var emitter = new Emitter();

    function create(name, config) {
        //针对 IE8、IE9 的跨域资源访问。
        if (window.XDomainRequest) {
            config = Object.assign({}, config, {
                'get': Ajax.get,
                'post': Ajax.post
            });
        }

        var api = KISP.create('API', name, config);
        return api;
    }

    function API(name, config) {
        var api = create(name, config);
        var get = api.get.bind(api);
        var post = api.post.bind(api);
        var current = null;

        //用钩子函数的方式重写。
        //以便自动加上必要的字段，如 uid、access_token 等。
        api.post = function (data, query) {

            //每次都从 session 里读取。
            //可以让别的页签有机会重新写入 session。
            //这样可以在不刷新页面的情况下，使用新的值。
            var session = storage.get();

            current = data = API.sign(session, data);

            return post(data, query);
        };

        api.on('response', function (status, json, xhr) {
            if (!json) {
                return;
            }

            //代理的，xhr 为空。
            if (xhr && json.state != current.state) {
                KISP.alert('伪造请求');

                //返回 false，以取消触发后面的事件。
                return false;
            }
        });

        api.on('code', {
            202: function _() {
                KISP.alert('会话已超时，请重新登录。', function () {
                    emitter.fire('session-timeout');
                });

                //返回 false，以取消触发后面的事件。
                return false;
            },

            203: function _() {
                KISP.alert('您的帐号已在其它地方登录，您已被迫下线，如果不是您本人操作，请注意账号安全！', function () {
                    emitter.fire('session-timeout');
                });

                //返回 false，以取消触发后面的事件。
                return false;
            }
        });

        return api;
    }

    ////test----------------------------------------------
    //setTimeout(function () {
    //    KISP.alert('您的帐号已在其它地方登录，您已被迫下线，如果不是您本人操作，请注意账号安全！', function () {
    //        emitter.fire('session-timeout');
    //    });
    //}, 13*1000);


    //静态方法。
    Object.assign(API, {

        /**
        * 绑定静态事件。
        */
        on: emitter.on.bind(emitter),

        /**
        * 创建实例。
        * 兼容 IE8、IE9 的跨域资源访问。
        */
        create: create,

        /**
        * 配置公共字段。
        */
        set: function set(session) {
            storage.set(session);
        },

        /**
        * 清空所有配置的公共字段。
        */
        clear: function clear() {
            storage.clear();
        },

        /**
        * 对指定的一个或多个数据对象进行签名。
        * 返回一个合并后签名的新对象，新增了字段：state, timestamp, sign。
        * 已重载 sign(data, ..., dataN);           //
        * 已重载 sign(false, data, ..., dataN);    //第一个参数为 false，则不生成 sign 字段。
        */
        sign: function sign(data, dataN) {
            var disabled = data === false;
            var args = Array.from(arguments);

            //此时为 sign(false, ...); 
            //表示不生成 sign 字段，仅添加 state 和 timestamp 两个字段。
            if (disabled) {
                args = args.slice(1);
            }

            var info = Sign.get(disabled, args);
            return info;
        }

    });

    return API;
});