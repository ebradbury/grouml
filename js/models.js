GROUML = GROUML || {};

(function(m) {

    m.UmlObject = Backbone.Model.extend({
        defaults: {
            Name: null
        }
    });

    m.UmlObjectField = Backbone.Model.extend({
        defaults: {
            Name: null,
            Type: null
        }
    });

})(GROUML.Models = GROUML.Models || {});