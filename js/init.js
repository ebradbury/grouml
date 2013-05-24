var GROUML = GROUML || {};

(function($) {

    GROUML.Events = _.extend({}, Backbone.Events);

    $(function() {
        $('#tabs').tabs({
            heightStyle: 'fill',
            activate: function(event, ui) {},
        }).removeClass('ui-corner-all');;
        
        $('#tabs ul.ui-tabs-nav').removeClass('ui-corner-all');
        
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