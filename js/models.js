GROUML = GROUML || {};

(function(m) {

    m.UmlObject = Backbone.Model.extend({
        defaults: {
            Name: null,
            Type: null // Type of diagram. e.g. Class Diagram
        }
    });

    m.UmlObjectField = Backbone.Model.extend({
        defaults: {
            Name: null,
            Type: null,
            Options: {},
        }
    });

})(GROUML.Models = GROUML.Models || {});