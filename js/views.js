var GROUML = GROUML || {};

(function(v) {

    v.OptionView = Backbone.View.extend({
        tagName: 'li',
        className: 'option',
        _template: null,
        events: {
            'change .key': function(e) {
                var val = $(e.target).val();
                this.model.set('name', val);
                this.model.save();

                GROUML.Events.trigger(GROUML.EventConstants.Option.EditName);
            },
            'change .value': function(e) {
                var val = $(e.target).val();
                this.model.set('value', val);
                this.model.save();

                GROUML.Events.trigger(GROUML.EventConstants.Option.EditValue);
            }
        },
        initialize: function() {
            this._template = _.template($('#tpl-option-view').html());
        },
        render: function() {
            this.$el.html(this._template(this.model.toJSON()));
            return this;
        }
    });

    v.OptionsView = Backbone.View.extend({
        _fieldId: null,
        events: {
            'click .add-field-option-wrapper': function() {
                var self = this;
                var field = new GROUML.Models.Field({
                    field_id: this._fieldId
                });

                field.fetch({
                    success: function(m) {
                        m.createOption()
                        .done(function(m) {
                            var $options = self.$el.find('ul');
                            $options.append(new v.OptionView({model:m}).render().el);
                        });
                    }
                });

                GROUML.Events.trigger(GROUML.EventConstants.Option.Add);
            }
        },
        initialize: function() {
            this.collection = new GROUML.Collections.Options();
            this.collection.on('reset', this.render, this);

            this._template = _.template($('#tpl-options-view').html());

            var self = this;
            GROUML.Events.on('field:change', function(field) {
                self.changeField(field);
            });
        },
        changeField: function(field) {
            this._field = field;

            var self = this;
            GROUML.Queries.GetOptions(this._field.get('field_id'))
                .done(function(options) {
                    options = options || [];
                    self.collection.reset(options);
                });
        },
        render: function() {
            this.$el.html(this._template({name: this._field.get('name')}));

            var $options = this.$el.find('ul');
            this.collection.each(function(m){
                $options.append(new v.OptionView({model:m}).render().el);
            }, this);
            return this;
        }
    });
    
    v.FieldView = Backbone.View.extend({
        tagName: 'li',
        _template: null,
        events: {
            'click input.delete-field': function(e) {
                var self = this;
                this.model.destroy({
                    success: function(model) {
                        self.remove();
                    },
                    error: function(model, response) {
                        console.debug(response);
                    }
                });

                GROUML.Events.trigger(GROUML.EventConstants.Field.Delete);
            },
            'change input.name': function(e) {
                var val = $(e.target).val();
                this.model.set('name', val);
                this.model.save();

                GROUML.Events.trigger(GROUML.EventConstants.Field.EditName);
            },
            'change select.type': function(e) {
                var val = $(e.target).val();
                this.model.set('type', val);
                this.model.save();

                GROUML.Events.trigger(GROUML.EventConstants.Field.EditType);
            },
            'click': function() {
                GROUML.Events.trigger('field:change', this.model);
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
        tagName: 'ul',
        className: 'fields',
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
        addNew: function(m) {
            var fieldView = new v.FieldView({model:m});
            this.$el.append(fieldView.render().el);
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
        _fieldsView: null,
        className: 'uml-object uml-class',
        initialize: function() {
            this._template = _.template($('#tpl-object-view').html());
            this._fieldsView = new v.FieldsView({
                object_id: this.model.get('object_id')
            });
            
            this._spinner = new Spinner({ lines: 10, length: 8, width: 4, radius: 8, color: '#999'});
        },
        events: {
            'click .delete-object': function(e) {
                var self = this;
                this.model.destroy({
                    success: function(model) {
                        self.remove();
                    },
                    error: function(model, response) {
                        console.debug(response);
                    }
                });
                GROUML.Events.trigger(GROUML.EventConstants.Object.Delete);
            },
            'change .object-name': function(e) {
                var val = $(e.target).val();
                this.model.set('name', val);
                this.model.save();

                GROUML.Events.trigger(GROUML.EventConstants.Object.EditName);
            },
            'click .add-field-wrapper': function() {
                this.loading(true);
                var self = this;
                this.model.createField()
                .done(function(m) {
                    self._fieldsView.addNew(m);
                    self.loading(false);
                });

                GROUML.Events.trigger(GROUML.EventConstants.Field.Add);
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
                    
                    // double bitwise not truncates floats
                    model.set({
                        x: ~~position.left,
                        y: ~~position.top
                    });
                    model.save();

                    GROUML.Events.trigger(GROUML.EventConstants.Object.DragEnd);
                }
            }).resizable({ grid: [gridSize, gridSize] })
        },
        loading: function(flag) {
            if(flag) {
                this._spinner.spin(this.el);
            } else {
                this._spinner.stop();
            }
        },
        render: function() {
            this.$el.append(this._template(this.model.toJSON()));

            var $fields = this.$el.find('.field-wrapper');

            $fields.append(this._fieldsView.render().el);

            return this;
        }
    });

    v.BoardView = Backbone.View.extend({
        initialize: function() {
            this.collection = new GROUML.Collections.Objects();
            this.collection.on('reset', this.render, this);
            
            var self = this;
            GROUML.Events.on('board:change', function(board) {
                self.changeBoard(board);
            });
            
            GROUML.Events.on('object:add', function(created) {
                self.collection.add(created);
                var objectView = new v.ObjectView({model:created});
                self.$el.append(objectView.render().el);
                objectView.setPositionAndDraggable(true);
            });
        },
        changeBoard: function(board) {
            var self = this;
            GROUML.Queries.GetObjects(board.get('board_id'))
                .done(function(objects) {
                    objects = objects || [];
                    self.collection.reset(objects);
                });
        },
        render: function() {
            this.collection.each(function(m) {
                var objectView = new v.ObjectView({model:m});
                this.$el.append(objectView.render().el);
                objectView.setPositionAndDraggable();
            }, this);
            return this;
        }
    });
    
    v.ToolbarView = Backbone.View.extend({
        events: {
            'click #add-object': function() {
                this._board.createObject().done(function(m) {
                        GROUML.Events.trigger('object:add', m);
                });
            },
        },
        initialize: function() {
            this._template = _.template($('#tpl-toolbar-view').html());
            
            var self = this;
            GROUML.Events.on('board:change', function(board) {
                self._board = board;
            });
        },
        render: function() {
            this.$el.append(this._template());
            
            this.$el.find('#add-object').button({
                text: false,
                icons: {
                    primary: 'ui-icon-plusthick'
                }
            });
            
            return this;
        }
    });
    
    v.CodeView = Backbone.View.extend({
        _board: null,
        _currentGenerator: null,
        _generatorNames: null,
        events: {
            'change select#generator': function(e) {
                var selectedGenerator = $(e.target).val();
                
                if(selectedGenerator == '')
                    return;

                GROUML.Events.trigger(GROUML.EventConstants.Generator.Changed, selectedGenerator);

                this._currentGenerator = GROUML.Generators.getGenerator(selectedGenerator);
                
                this.render();
            },
        },
        initialize: function() {
            this._template = _.template($('#tpl-code-view').html());
            this._generatorNames = GROUML.Generators.getGeneratorNames()
            
            var self = this;
            GROUML.Events.on('board:change', function(board) {
                self._board = board;
            });
        },
        render: function() {
            if(this._currentGenerator) {
                var self = this;
                
                this._board.fetchExpanded(3, {
                    success: function(b) {
                        var code = self._currentGenerator.generate(b),
                            brush = self._currentGenerator.getBrush(),
                            loadBrush = null;

                        var $pre = $('<pre>');
                        $pre.html(code);

                        if (brush) {
                            $pre.addClass('brush: ' + brush);
                            loadBrush = GROUML.Syntax.ensureBrush(brush);
                        }

                        var params = {
                            generators: self._generatorNames,
                            currentGeneratorName:  self._currentGenerator.name
                        };

                        self.$el.html(self._template(params));

                        var $output = self.$el.find('#code-output');
                        $output.append($pre);

                        loadBrush.done(function() {
                            SyntaxHighlighter.highlight();
                        });
                    }
                });
            } else {
                this.$el.html(this._template({generators: this._generatorNames, currentGeneratorName:  '', code: '' }));
            }
            
            return this;
        },
    });

})(GROUML.Views = GROUML.Views || {});