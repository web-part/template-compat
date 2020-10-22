/**
* 
*/
KISP.route('Accounts', function (require, module) {


    return {
        'company-list': function () {
            var Master = module.require('Master');
            Master.open('Companys', []);
        },

        'product-list': function (company) {
            var Master = module.require('Master');
            Master.open('Products', [{ 'company': company, }]);
        },

        'add-user': function (data) {
            var Master = module.require('Master');
            Master.open('AccountUsers', [data]);
        },

        'to-baks': function (data) {
            var Master = module.require('Master');
            Master.open('AccountBaks', [data]);
        },

        'create-account': function (data) {
            var AccountCreate = module.require('AccountCreate');
            AccountCreate.render(data);
        },
        'recover-account': function (data) {
            var AccountRecover = module.require('AccountRecover');
            AccountRecover.render(data);
        },

        //��������¼�ɹ���
        'third-login': function (user) {
            var Login = module.require('Login');
            Login.done(user);
        },

        //�����ʱ�����ˡ� �����Űɡ� 
        'apps': function (data) {
            var Master = module.require('Master');
            Master.open('AccountApps', [data]);
        },

        /**
        * �򿪶�Ӧ�����ס�
        *   data = {
        *       tid: '',        //��ѡ����ҵ id��
        *       acctid: '',     //��ѡ������ id��
        *   };
        */
        'open': function (data) {
            var AccountPlugin = require('AccountPlugin');
            AccountPlugin.open(data);
        },

        /**
        * �򿪵�����Ӧ�á�
        */
        'url': function (url) {
            //location.href = url;
            window.open(url);   //���´��ڣ����ܻ����������ء�
        },

    };
});
