/*
* babel time: 2020-10-19 16:41:37
*
* source md5: 68811B1A5E39FE4E690CF24BCF13F31F
*
* source file: htdocs/views/master/account/baks/AccountBaks/private/Private/Header.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

/*
* 
*/
KISP.panel('/AccountBaks/Private/Header', function (require, module, panel) {

    panel.on('init', function () {});

    panel.on('render', function (data) {
        panel.$.find('[data-cmd="progress"]').css('display', 'block');
        panel.fill({
            'used': data && data.used || '0.0G',
            'total': data && data.total || '0.0G'
        });

        panel.$.find('[data-cmd="bar-num"]').width(data.rate);
    });

    return {};
});