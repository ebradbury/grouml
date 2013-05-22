var GROUML = GROUML || {};

(function(v) {

    v.ObjectView = Backbone.View.extend({
        className: 'uml-object uml-class',
        initialize: function() {
            this._template = _.template($('#tpl-object-view').html());
        },
        render: function() {
            this.$el.append(this._template());
            return this;
        }
    });

    v.BoardView = Backbone.View.extend({
        initialize: function() {
            this.collection = new GROUML.Collections.Objects();
            this.collection.on('reset', this.render, this);

            var self = this;
            GROUML.Events.on('board:change', function(board_id) {
                self.changeBoard(board_id);
            });
        },
        changeBoard: function(board_id) {
            var self = this;
            GROUML.Queries.GetObjects(board_id)
                .done(function(objects) {
                    objects = objects || [];
                    self.collection.reset(objects);
                });
        },
        render: function() {
            this.collection.each(function(m) {
                this.$el.append(new v.ObjectView({model:m}).render().el);
            }, this);
            return this;
        }
    });

})(GROUML.Views = GROUML.Views || {});