/*
* babel time: 2020-10-19 16:42:32
*
* source md5: FD80E7003AC849C367994098CABCB2A7
*
* source file: htdocs/routers/Accounts.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

/**
* 
*/
KISP.route('Accounts', function (require, module) {

    return {
        'company-list': function companyList() {
            var Master = module.require('Master');
            Master.open('Companys', []);
        },

        'product-list': function productList(company) {
            var Master = module.require('Master');
            Master.open('Products', [{ 'company': company }]);
        },

        'add-user': function addUser(data) {
            var Master = module.require('Master');
            Master.open('AccountUsers', [data]);
        },

        'to-baks': function toBaks(data) {
            var Master = module.require('Master');
            Master.open('AccountBaks', [data]);
        },

        'create-account': function createAccount(data) {
            var AccountCreate = module.require('AccountCreate');
            AccountCreate.render(data);
        },
        'recover-account': function recoverAccount(data) {
            var AccountRecover = module.require('AccountRecover');
            AccountRecover.render(data);
        },

        //��������¼�ɹ���
        'third-login': function thirdLogin(user) {
            var Login = module.require('Login');
            Login.done(user);
        },

        //�����ʱ�����ˡ� �����Űɡ� 
        'apps': function apps(data) {
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
        'open': function open(data) {
            var AccountPlugin = require('AccountPlugin');
            AccountPlugin.open(data);
        },

        /**
        * �򿪵�����Ӧ�á�
        */
        'url': function url(_url) {
            //location.href = url;
            window.open(_url); //���´��ڣ����ܻ����������ء�
        }

    };
});