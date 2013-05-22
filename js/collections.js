GROUML = GROUML || {};

(function(c) {

    c.Boards = StackMob.Collection.extend({
        model: GROUML.Models.Board
    });

    c.Objects = StackMob.Collection.extend({
        model: GROUML.Models.Object
    });
    
    c.Fields = StackMob.Collection.extend({
        model: GROUML.Models.Field
    });

    c.Options = StackMob.Collection.extend({
        model: GROUML.Models.Option
    });
    
})(GROUML.Collections = GROUML.Collections || {});