GROUML = GROUML || {};

(function(c) {

    c.UmlObjects = Backbone.Collection.extend({
        model: GROUML.Models.UmlObject
    });
    
    c.UmlObjectFields = Backbone.Collection.extend({
        model: GROUML.Models.UmlObjectField
    });

    
})(GROUML.Collections = GROUML.Collections || {});