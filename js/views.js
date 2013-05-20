GROUML = GROUML || {};

(function(v) {

    v.UmlObjectFieldType = Backbone.View.extend({
        tagName: 'select',
        className: 'type',
        events: {
            'keydown': function(e) {
                if (e.which === 13 || e.which === 27) {
                    this.$el.blur();
                    e.preventDefault();
                    return false;
                }
            },
        },
        render: function() {
            var type_options_html = _.template($('#type_options_template').html(), {
                types: GROUML.Constants.types,
                current: this.model.get('Type'),
            });
            
            this.$el.html(type_options_html);
            
            return this;
        }
    });

    v.UmlObjectFieldName = Backbone.View.extend({
        tagName: 'span',
        className: 'name',
        attributes: {
            contentEditable: true
        },
        events: {
            'click': function(e) {
                this.$el.focus();
                e.stopPropagation();
                return false;
            },
            'input': function(){
                this.model.set('Name', this.$el.text());
            },
            'keydown': function(e) {
                if (e.which === 13 || e.which === 27) {
                    this.$el.blur();
                    e.preventDefault();
                    return false;
                }
            },
            'focus': function(e) {
                $(this.$el).selectText();
            },
        },
        render: function() {
            this.$el.html(this.model.get('Name'));
            return this;
        }
    });

    v.UmlObjectField = Backbone.View.extend({
        tagName: 'li',
        _name: null,
        _type: null,
        initialize: function() {
            this._name = new v.UmlObjectFieldName({model:this.model});
            this._type = new v.UmlObjectFieldType({model:this.model});
        },
        render: function() {
            this.$el.append(this._name.render().el);
            this.$el.append(this._type.render().el);
            return this;
        }
    });

    v.UmlObjectFields = Backbone.View.extend({
        tagName: 'ul',
        className: 'fields',
        initialize: function() {
            this.collection.on('add', function(m, c, options) {
                // FIXME - issue #2
                var isNew = options.isNew || false;
                
                if(isNew) {
                    var newField = new v.UmlObjectField({model:m}).render();
                    
                    this.$el.append(newField.el);
                    
                    newField.$el.find('span.name').get(0).focus();
                    
                    return this;
                } else {
                    this.render();
                }
            }, this);
        },
        render: function() {
            this.$el.html('');
            this.collection.each(function(m){
                this.$el.append(new v.UmlObjectField({model:m}).render().el);
            }, this);
            return this;
        }
    });

    v.UmlObjectAddField = Backbone.View.extend({
        className: 'add-field-wrapper',
        events: {
            'click input': function() {
                this.trigger('field:add');
            }
        },
        render: function() {
            this.$el.html('<input type="image" src="img/glyphicons/glyphicons_190_circle_plus.png" />');
            return this;
        }
    });
    
    v.UmlObjectName = Backbone.View.extend({
        tagName: 'p',
        className: 'name',
        attributes: {
            contentEditable: true
        },
        events: {
            'click': function(e) {
                this.$el.focus();
                e.stopPropagation();
                return false;
            },
            'input': function(){
                this.model.set('Name', this.$el.text());
            },
            'keydown': function(e) {
                if (e.which === 13 || e.which === 27) {
                    this.$el.blur();
                    e.preventDefault();
                    return false;
                }
            },
            'focus': function(e) {
                $(this.$el).selectText();
            },
        },
        initialize: function() {
            this.model.on('change:Name', this.render, this);
        },
        render: function() {
            this.$el.html(this.model.get('Name'));
            return this;
        }
    });

    v.UmlObject = Backbone.View.extend({
        className: 'uml-object uml-class',
        attributes: {
            style: 'position: absolute;',
        },
        _nameView: null,
        _fieldsView: null,
        _addFieldView: null,
        events: {
            'click': function(e) {
                this.$el.find('[contentEditable]').blur();
            }
        },
        initialize: function() {
            this._nameView = new v.UmlObjectName({model:this.model});
            this._fieldsView = new v.UmlObjectFields({collection:this.collection});
            this._addFieldView = new v.UmlObjectAddField();

            this._addFieldView.on('field:add', function() {
                this.collection.add({
                    Name: 'New Field',
                    Type: 'int'
                }, {isNew: true});
            }, this);
        },
        render: function() {
            this.$el.append(this._nameView.render().el);
            this.$el.append(this._fieldsView.render().el);
            this.$el.append(this._addFieldView.render().el);
            return this;
        }
    });

    v.UmlObjects = Backbone.View.extend({
        id: 'wall',
        objects: [],
        add: function(model, collection) {
            var objectView = new v.UmlObject({
                model: model,
                collection: collection
            });
            var gridSize = GROUML.Constants.gridSize;
            this.objects.push(objectView);
            
            this.$el.append($(objectView.render().el).draggable({ grid: [gridSize, gridSize] }).resizable({ grid: [gridSize, gridSize] }));
        },
        new: function(name) {
            var m = new GROUML.Models.UmlObject({
                Name: name
            });

            var c = new GROUML.Collections.UmlObjectFields([
                {
                    Name: 'id',
                    Type: 'int'
                }
            ]);

            this.add(m, c);
        }
    });

})(GROUML.Views = GROUML.Views || {});