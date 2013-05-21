var GROUML = GROUML || {};

(function(m) {

    m.Board = StackMob.Model.extend({
        schemaName : 'board'
    });

    m.Object = StackMob.Model.extend({
        schemaName : 'object'
    });

    m.Field = StackMob.Model.extend({
        schemaName : 'field'
    });

    m.Option = StackMob.Model.extend({
        schemaName : 'option'
    });

})(GROUML.Models = GROUML.Models || {});