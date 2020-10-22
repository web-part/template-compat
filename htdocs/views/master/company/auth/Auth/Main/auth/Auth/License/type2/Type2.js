
/*
* 
*/
KISP.panel('/Auth/Main/Auth/License/Type2', function (require, module, panel) {
    
    
    var Name = module.require('Name');
    var Code = module.require('Code');
    var Photo = module.require('Photo');


    panel.set('show', false);

    panel.on('init', function () {


    });


    panel.on('render', function (actived) {
        
        panel.$.toggleClass('on', actived);

        Name.render();
        Code.render();
        Photo.render();

    });

    return {
        reset: function () {
            panel.$.removeClass('on');

            Name.reset();
            Code.reset();
            Photo.reset();
        },

        get: function () {
            var name = Name.get();
            var code = Code.get();
            var photo = Photo.get();

            return [
                { key: 'name', value: name, },
                { key: 'code', value: code, },
                { key: 'photo', value: photo, },
            ];
        },

        
    };

});





