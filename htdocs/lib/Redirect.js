
/**
* 动态写入地址，轮询监控并实现跳转。
* 实现原理：
*   如果一个页面的 url 是动态获取到的，并且要在新窗口打开它，常规的做法是调用 window.open(url) 打开一个弹出式窗口。
*   但大多数浏览器默认会拦截弹出式窗口，主要是因为大多数广告都是弹出式窗口的形式。
*   但如果我们通过 a 标签打开新窗口的方式，则不会给拦截。
*   因此，在要打开业务 html 中，我们用 a 标签打开一个固定的跳转页面，称为代理页面，比如：
*   <a href="html/redirect.html?key=xxx" target="_blank" >认证企业</a>
*   点击时，同时打开跳转的代理页面 redirect.html，并且异步去获取真实要跳转的目标 url，写入到 storage 里。
*   然后在 redirect.html 中，监控 storage，一旦发现有目标 url，即通过 location.href = url 跳转即可。
*
*/
define('Redirect', function (require, module, exports) {
    var $ = require('$');
    var storage = localStorage;
    var name = 'kis-cloud-AEC8058A7646-' + module.id;
    var interval = 200;


    function getAll() {
        var all = storage.getItem(name) || '{}';

        all = JSON.parse(all);

        //安全起见，总是返回一个可用的 {}。
        return typeof all == 'object' ? all || {} : {}; 
    }


    function setAll(all) {
        all = JSON.stringify(all);
        storage.setItem(name, all);
    }



    return {

        set: function (key, url) {
            var all = getAll();

            all[key] = url;
            setAll(all);
        },

        reset: function (key) {
            var all = getAll();

            delete all[key];
            setAll(all);
        },


        watch: function (key, fn) {

            var id = setInterval(function () {
                var all = getAll();
                var url = all[key];

                if (!url) {
                    return;
                }


                clearInterval(id);
                delete all[key];
                setAll(all);

                fn && fn(url);

            }, interval);
            
            
        },
    };

 


});