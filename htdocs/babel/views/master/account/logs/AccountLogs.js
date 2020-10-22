/*
* babel time: 2020-10-19 16:41:37
*
* source md5: 9FDFDA4B724EC5F08C134EBE2478FA41
*
* source file: htdocs/views/master/account/logs/AccountLogs.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

/*
* ɾ����¼�б�
*/
KISP.view('/AccountLogs', function (require, module, view) {
    var Header = module.require('Header');
    var Main = module.require('Main');

    var meta = {
        company: null
    };

    view.on('init', function () {

        Header.on({
            //�������ڵ㣬���ҵ���ҵ������Ҫ�����ݡ�
            'company-list': function companyList() {
                view.fire('company-list');
            },

            //ˢ���б�
            'refresh': function refresh() {
                Main.render(meta);
            }

        });
    });

    /**
    * ��Ⱦ��
    *   data = {
    *       company: {},    //��ҵ��Ϣ��
    *   };
    */
    view.on('render', function (data) {
        meta = data;

        Header.render(data);
        Main.render(data);
    });
});