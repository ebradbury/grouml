var GROUML = GROUML || {};

(function(v) {

    v.FieldView = Backbone.View.extend({
        tagName: 'li',
        _template: null,
        events: {
            'change input.name': function(e) {
                var val = $(e.target).val();
                this.model.set('name', val);
                this.model.save();
            },
            'change select.type': function(e) {
                var val = $(e.target).val();
                this.model.set('type', val);
                this.model.save();
            }
        },
        initialize: function() {
            this._template = _.template($('#tpl-field-view').html());
        },
        render: function() {
            this.$el.html(this._template(this.model.toJSON()));

            var $type = this.$el.find('.type');
            $type.val(this.model.get('type'));

            return this;
        }
    });

    v.FieldsView = Backbone.View.extend({
        initialize: function(options) {
            this.collection = new GROUML.Collections.Fields();
            this.collection.on('reset', this.render, this);

            var self = this;
            GROUML.Queries.GetFields(options.object_id)
                .done(function(objects) {
                    objects = objects || [];
                    self.collection.reset(objects);
                });
        },
        render: function() {
            this.collection.each(function(m) {
                var fieldView = new v.FieldView({model:m});
                this.$el.append(fieldView.render().el);
            }, this);
            return this;
        }
    });

    v.ObjectView = Backbone.View.extend({
        className: 'uml-object uml-class',
        initialize: function() {
            this._template = _.template($('#tpl-object-view').html());
        },
        events: {
            'change .object-name': function(e) {
                var val = $(e.target).val();
                this.model.set('name', val);
                this.model.save();
            }
        },
        setPositionAndDraggable: function(is_first) {
           var x = this.model.get('x'),
               y = this.model.get('y');

            if (!x && !y && !is_first) {
                var w = this.$el.width(),
                    h = this.$el.height();

                var pos = GROUML.Utility.findWallSpaceForObject(w, h);
                x = pos.x;
                y = pos.y;
            }

            this.$el.css({top: y, left: x, position:'absolute'});

            var model = this.model,
                gridSize = GROUML.Constants.gridSize;
            $(this.$el).draggable({
                grid: [gridSize, gridSize],
                stop: function() {
                    var position = $(this).position();
                    model.set({
                        x: position.left,
                        y: position.top
                    });
                    model.save();
                }
            }).resizable({ grid: [gridSize, gridSize] })
        },
        render: function() {
            this.$el.append(this._template(this.model.toJSON()));

            var $fields = this.$el.find('.fields');

            // this is not great.
            new v.FieldsView({
                el: $fields,
                object_id: this.model.get('object_id')
            }).render();

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
            var count = 0;
            this.collection.each(function(m) {
                var objectView = new v.ObjectView({model:m});
                this.$el.append(objectView.render().el);
                objectView.setPositionAndDraggable(count++ === 0);
            }, this);
            return this;
        }
    });

})(GROUML.Views = GROUML.Views || {});