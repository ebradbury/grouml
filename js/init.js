var GROUML = GROUML || {};

(function($) {

    GROUML.Events = _.extend({}, Backbone.Events);

    $(function() {
        $.infinitedrag('#board', {}, {
            width: 100,
            height: 100,
            start_col: 0,
            start_row: 0,
            oncreate: function(){},
        });

        GROUML.Router = new GROUML.Routers.MainRouter();
    });

})(jQuery);