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
            contentEditable: true,
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
        render: function() {
            this.collection.each(function(m){
                this.$el.append(new v.UmlObjectField({model:m}).render().el);
            }, this);
            return this;
        }
    });

    // This seems a little silly to basically define an input button using a view. Please advise.
    v.UmlObjectAddField = Backbone.View.extend({
        className: 'add-field-wrapper',
        render: function() {
            this.$el.html('<input type="image" src="img/glyphicons/glyphicons_190_circle_plus.png" />');
            return this;
        },
    });
    
    v.UmlObjectName = Backbone.View.extend({
        tagName: 'p',
        className: 'name',
        attributes: {
            contentEditable: true,
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
        initialize: function() {
            this._nameView = new v.UmlObjectName({model:this.model});
            this._fieldsView = new v.UmlObjectFields({collection:this.collection});
            this._addFieldView = new v.UmlObjectAddField();
        },
        render: function() {
            this.$el.append(this._nameView.render().el);
            this.$el.append(this._fieldsView.render().el);
            this.$el.append(this._addFieldView.render().el);
            return this;
        }
    });

})(GROUML.Views = GROUML.Views || {});