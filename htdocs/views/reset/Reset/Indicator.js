
/**
* 重置密码。
*/
KISP.panel('/Reset/Indicator', function (require, module, panel) {

    panel.on('init', function () {
        
    });




    panel.on('render', function (step) {
        
        panel.$.find('[data-step]').removeClass('on');
        panel.$.find('[data-step="' + step + '"]').addClass('on');

    });





});