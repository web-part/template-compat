
/*
* 我的账套。
*/
KISP.view('/Exp', function (require, module, view) {
  
    var Main = module.require('Main');
    var Header = module.require('Header');
    


    view.on('init', function () {
      
    });


    view.on('render', function () {
        Header.render();
        Main.render();

    });




});



