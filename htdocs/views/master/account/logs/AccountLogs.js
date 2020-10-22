
/*
* ɾ����¼�б�
*/
KISP.view('/AccountLogs', function (require, module, view) {
    var Header = module.require('Header');
    var Main = module.require('Main');

    var meta = {
        company: null,
    };


    view.on('init', function () {

        Header.on({
            //�������ڵ㣬���ҵ���ҵ������Ҫ�����ݡ�
            'company-list': function () {
                view.fire('company-list');
            },

            //ˢ���б�
            'refresh': function () {
                Main.render(meta);
            },

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





