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
                success: function(z) {
                    self.appendAndSave('objects', [z.get('object_id')], {
                        success: function() {
                            d.resolve(obj);
                        }
                    });
                }
            });
            return d.promise();
        }
    });

    m.Object = StackMob.Model.extend({
        schemaName : 'object',
        createField: function() {
            var d = new $.Deferred();
            var obj = new m.Field({
                name: 'New Field',
                type: 'int'
            });

            var self = this;
            obj.create({
                success: function(z) {
                    self.appendAndSave('fields', [z.get('field_id')], {
                        success: function() {
                            d.resolve(obj);
                        }
                    });
                }
            });
            return d.promise();
        }
    });

    m.Field = StackMob.Model.extend({
        schemaName : 'field',
        createOption: function() {
            var d = new $.Deferred();
            var self = this;
            var obj = new m.Option({
                name: 'New Option',
                type: 'value'
            });
            obj.create({
                success: function(z) {
                    self.appendAndSave('options', [z.get('option_id')], {
                        success: function() {
                            d.resolve(obj);
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