
/*
* 
*/
KISP.panel('/Auth/Main/Auth/License/Type0', function (require, module, panel) {
    
    var Code = module.require('Code');
    var Photo = module.require('Photo');

    panel.set('show', false);


    panel.on('init', function () {


    });


    panel.on('render', function (actived) {
        
        panel.$.toggleClass('on', actived);

        Code.render();
        Photo.render();

    });


    return {
        reset: function () {
            panel.$.removeClass('on');
            Code.reset();
            Photo.reset();
        },


        get: function () {
            var code = Code.get();
            var photo = Photo.get();

            return [
                { key: 'code', value: code, },
                { key: 'photo', value: photo, },
            ];
        },
        setCode:Code.setCode,
    };
});





