var GROUML = GROUML || {};

(function(q){

    q.GetObjects = function(board_id) {
        var d = new $.Deferred();
        var obj = new GROUML.Models.Board({
            board_id: board_id
        });
        obj.fetchExpanded(1, {
            success: function() {
                d.resolve(obj.get('objects'));
            }
        });
        return d.promise();
    };

    q.GetFields = function(object_id) {
        var d = new $.Deferred();
        var obj = new GROUML.Models.Object({
            object_id: object_id
        });
        obj.fetchExpanded(1, {
            success: function() {
                d.resolve(obj.get('fields'));
            }
        });
        return d.promise();
    };

    q.GetOptions = function(field_id) {
        var d = new $.Deferred();
        var obj = new GROUML.Models.Field({
            field_id: field_id
        });
        obj.fetchExpanded(1, {
            success: function() {
                d.resolve(obj.get('options'));
            }
        });
        return d.promise();
    };

})(GROUML.Queries = GROUML.Queries || {});