var GROUML = GROUML || {};

GROUML.Events = _.extend({}, Backbone.Events);

GROUML.EventConstants = (function() {
    return {
        Object: {
            Add: 'object:add',
            Delete: 'object:delete',
            EditName: 'object:edit:name',
            DragEnd: 'object:drag:end'
        },
        Field: {
            Add: 'field:add',
            Delete: 'field:delete',
            EditName: 'field:edit:name',
            EditType: 'field:edit:type'
        },
        Option: {
            Add: 'option:add',
            Delete: 'option:delete',
            EditName: 'option:edit:name',
            EditValue: 'option:edit:value'
        },
        Generator: {
            Changed: 'generator:changed'
        }
    }
})();

(function(e) {

    // object events

    e.on(GROUML.EventConstants.Object.Add, function() {
        GROUML.Tracking.Object.add();
    });

    e.on(GROUML.EventConstants.Object.Delete, function() {
        GROUML.Tracking.Object.delete();
    });

    e.on(GROUML.EventConstants.Object.EditName, function() {
        GROUML.Tracking.Object.editName();
    });

    e.on(GROUML.EventConstants.Object.DragEnd, function() {
        GROUML.Tracking.Object.drag();
    });

    // field events

    e.on(GROUML.EventConstants.Field.Add, function() {
        GROUML.Tracking.Field.add();
    });

    e.on(GROUML.EventConstants.Field.Delete, function() {
        GROUML.Tracking.Field.delete();
    });

    e.on(GROUML.EventConstants.Field.EditName, function() {
        GROUML.Tracking.Field.editName();
    });

    e.on(GROUML.EventConstants.Field.EditType, function() {
        GROUML.Tracking.Field.editType();
    });

    // option events

    e.on(GROUML.EventConstants.Option.Add, function() {
        GROUML.Tracking.Option.add();
    });

    e.on(GROUML.EventConstants.Option.Delete, function() {
        GROUML.Tracking.Option.delete();
    });

    e.on(GROUML.EventConstants.Option.EditName, function() {
        GROUML.Tracking.Option.editName();
    });

    e.on(GROUML.EventConstants.Option.EditValue, function() {
        GROUML.Tracking.Option.editValue();
    });

    // generator events

    e.on(GROUML.EventConstants.Generator.Changed, function(name) {
        GROUML.Tracking.Generator.changed(name);
    });

})(GROUML.Events);