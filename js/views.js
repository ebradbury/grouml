GROUML = GROUML || {};

(function(v) {

    v.UmlObjectFieldType = Backbone.View.extend({
        tagName: 'span',
        className: 'type',
        attributes: {
            contentEditable: true,
        },
        render: function() {
            this.$el.html(this.model.get('Type'));
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
            }
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
            this.collection.on('add', this.render, this);
        },
        render: function() {
            this.$el.html('');
            this.collection.each(function(m){
                this.$el.append(new v.UmlObjectField({model:m}).render().el);
            }, this);
            return this;
        }
    });

    // This seems a little silly to basically define an input button using a view. Please advise.
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
            }
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
                });
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
            this.objects.push(objectView);
            this.$el.append(objectView.render().el);
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