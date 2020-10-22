
define('/AccountBaks/Manual/Header/API', function (require, module, exports) {
    var $ = require('$');
    var KISP = require('KISP');
    var API = require('API');
    var Emitter = KISP.require('Emitter');

    var emitter = new Emitter();

    var loading = KISP.create('Loading', {
        mask: 0,
    });


    return {
        'on': emitter.on.bind(emitter),

        get: function (opt) {


            var api = new API('web/user/get_pan_kingdee_info', {
                'proxy': true,
            });


            api.on({
                'request': function () {
                    loading.show('获取中...');
                },

                'response': function () {
                    loading.hide();
                },

                'success': function (data, json, xhr) {
                    emitter.fire('getpan', [{
                        'used': data.used,
                        'total':data.total,
                        'rate':data.used_per,
                    }]);

                },

                'fail': function (code, msg, json) {
                    emitter.fire('getpan');
                },

                'error': function () {
                    emitter.fire('getpan');
                },
            });


            api.post({
                'tid': opt.company.origin['tid'],   //企业 id。
            });

        },



    };


});