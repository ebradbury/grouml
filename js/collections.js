GROUML = GROUML || {};

(function(c) {

    c.UmlObjectFields = Backbone.Collection.extend({
        model: GROUML.Models.UmlObjectField
    });

})(GROUML.Collections = GROUML.Collections || {});