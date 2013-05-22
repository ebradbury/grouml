var GROUML = GROUML || {};

(function($, m) {

    m.Board = StackMob.Model.extend({
        schemaName : 'board',
        createObject: function() {
            var d = new $.Deferred();
            var self = this;
            var obj = new m.Object({
                name: 'New Entity',
                type: 'Class'
            });
            obj.create({
                success: function(m) {
                    self.addRelationship('objects', m, {
                        success: function() {
                            d.resolve(m);
                        }
                    });
                }
            });
            return d.promise();
        }
    });

    m.Object = StackMob.Model.extend({
        schemaName : 'object',
        createField: function(callback, context) {
            var d = new $.Deferred();
            var self = this;
            var obj = new m.Field({
                name: 'New Field',
                type: 'int'
            });
            obj.create({
                success: function(m) {
                    self.addRelationship('fields', m, {
                        success: function() {
                            d.resolve(m);
                        }
                    });
                }
            });
            return d.promise();
        }
    });

    m.Field = StackMob.Model.extend({
        schemaName : 'field',
        createOption: function(callback, context) {
            var d = new $.Deferred();
            var self = this;
            var obj = new m.Option({
                name: 'New Option',
                type: 'value'
            });
            obj.create({
                success: function(m) {
                    self.addRelationship('options', m, {
                        success: function() {
                            d.resolve(m);
                        }
                    });
                }
            });
            return d.promise();
        }
    });

    m.Option = StackMob.Model.extend({
        schemaName : 'option'
    });

})(jQuery, GROUML.Models = GROUML.Models || {});