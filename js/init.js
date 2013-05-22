var GROUML = GROUML || {};

(function($) {

    GROUML.Events = _.extend({}, Backbone.Events);

    $(function() {
        $.infinitedrag('#wall', {}, {
            width: 100,
            height: 100,
            start_col: 0,
            start_row: 0,
            oncreate: function(){},
        });

        var $addButton = $('#add-class-diagram');

        $addButton.button({
            text: false,
            icons: {
                primary: "ui-icon-plusthick"
            }
        });

        GROUML.Router = new GROUML.Routers.MainRouter();
    });

})(jQuery);