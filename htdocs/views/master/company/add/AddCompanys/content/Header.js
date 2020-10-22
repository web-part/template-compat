

KISP.panel('/AddCompanys/Content/Header', function (require, module, panel) {
    

    var list = {};
    var allChosed = false;

    panel.on('init', function () {

        panel.$on('click', {
            '[data-cmd="check-all"]': function (event) {

                list.now.forEach(function (item, index) {
                    if (!list.origin[index].ifChecked) {
                        item.ifChecked = !allChosed;
                    }
                });
                allChosed = !allChosed;

                $(this).toggleClass('on', allChosed);

                panel.fire('all-chosed', [allChosed]);
            }
        });

    });



    panel.on('render', function (data) {
        list = data.list;
        allChosed = data.allChosed;
        panel.$.find('[data-cmd="check-all"]').toggleClass('on', allChosed);
        
    });

    return {
        'allChosed': function (status) {
            allChosed = status;
            panel.$.find('[data-cmd="check-all"]').toggleClass('on', allChosed);
        }
    };


});






