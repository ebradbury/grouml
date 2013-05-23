GROUML = GROUML || {};

(function(v) {

    v.UmlObjectFieldType = Backbone.View.extend({
        tagName: 'select',
        className: 'type',
        attributes: {
            dir: 'rtl',
        },
        events: {
            'keydown': function(e) {
                if (e.which === 13 || e.which === 27) {
                    this.$el.blur();
                    e.preventDefault();
                    return false;
                }
            },
            'focus': function() {
                $('#field-options').remove()
                this._fieldOptionsView = new v.UmlObjectFieldOptions({model:this.model, _objectModel: this._objectModel, _fieldModel: this._fieldModel });
                $('body').append(this._fieldOptionsView.render().el);
            },
        },
        initialize: function(opts) {
            this._objectModel = opts._objectModel || null;
            this._fieldModel = opts._fieldModel || null;
            this._template = _.template($('#type_options_template').html());
        },
        render: function() {
            var type_options_html = this._template({
                types: GROUML.Constants.types,
                current: this.model.get('Type'),
            });
            
            this.$el.html(type_options_html);
            
            return this;
        }
    });

    v.UmlObjectFieldName = Backbone.View.extend({
        tagName: 'input',
        className: 'name',
        events: {
            'keyup': function(){
                this.model.set('Name', this.$el.val());
                this.$el.attr('size', this.$el.val().length);
            },
            'keydown': function(e) {
                if (e.which === 13 || e.which === 27) {
                    this.$el.blur();
                    e.preventDefault();
                    return false;
                }
            },
            'click': function(e) {
                this.$el.select();
            },
            'focus': function() {
                $('#field-options').remove()
                this._fieldOptionsView = new v.UmlObjectFieldOptions({model:this.model, _objectModel: this._objectModel, _fieldModel: this._fieldModel });
                $('body').append(this._fieldOptionsView.render().el);
            },
        },
        initialize: function(opts) {
            this._objectModel = opts._objectModel || null;
            this._fieldModel = opts._fieldModel || null;
        },
        render: function() {
            this.$el.attr('value', this.model.get('Name')).html();
            return this;
        }
    });

    v.FieldDeleteButton = Backbone.View.extend({
        tagName: 'input',
        className: 'field-delete-button',
        attributes: {
            type: 'image',
            src: 'img/glyphicons/glyphicons_191_circle_minus.png',
            alt: 'Delete Field',
            title: 'Delete Field',
        },
        events: {
            'click': function() {
//                 alert('delete field');
                this.model.destroy();
                this._parentView.remove();
            },
        },
        initialize: function(opts) {
            this._parentView = opts.parentView || null;
        },
        render: function() {
            this.$el.html();
            return this;
        },
    });
    
    v.UmlObjectField = Backbone.View.extend({
        tagName: 'li',
        _name: null,
        _type: null,
        initialize: function(opts) {
            this._objectModel = opts._objectModel || null;
            this._deleteButton = new v.FieldDeleteButton({model:this.model, parentView: this});
            this._name = new v.UmlObjectFieldName({model:this.model, _objectModel: this._objectModel, _fieldModel: this.model});
            this._type = new v.UmlObjectFieldType({model:this.model, _objectModel: this._objectModel, _fieldModel: this.model});
        },
        render: function() {
            this.$el.append(this._deleteButton.render().el);
            this.$el.append(this._name.render().el);
            this.$el.append(this._type.render().el);
            return this;
        }
    });
    
    v.UmlObjectFieldOptionKey = Backbone.View.extend({
        tagName: 'input',
        className: 'key',
        attributes: { value: 'foo' },
        events: {
            'focus': function() {
                this._focusValues = { key: this.$el.val(), value: this.$el.next('input.value').val() };
            },
            'blur': function() {
                this._blurValues = { key: this.$el.val() };
                
                if(this._blurValues.key != this._focusValues.key) {
                    var opts = this.model.get('Options');
                    delete opts[this._blurValues.key];
                    opts[this._focusValues.key] = this._blurValues.value;
                    this.model.set('Options', opts);
                }
            },
            'keydown': function(e) {
                if (e.which === 13 || e.which === 27) {
                    this.$el.blur();
                    e.preventDefault();
                    return false;
                }
            },
            'click': function(e) {
                this.$el.select();
            },
        },
        initialize: function(opts) {
            this._key = opts._key || 'New Option';
        },
        render: function() {
            this.$el.attr('value', this._key);
            return this;
        }
    });
    
    v.UmlObjectFieldOptionValue = Backbone.View.extend({
        tagName: 'input',
        className: 'value',
        attributes: { value: 'bar' },
        events: {
            'focus': function() {
                this._focusValues = { key: this.$el.prev('input.key').val(), value: this.$el.val() };
            },
            'blur': function() {
                this._blurValues = { value: this.$el.val() };
                
                if(this._blurValues.value != this._focusValues.value) {
                    var opts = this.model.get('Options');
                    opts[this._focusValues.key] = this._blurValues.value;
                    this.model.set('Options', opts);
                }
            },
            'keydown': function(e) {
                if (e.which === 13 || e.which === 27) {
                    this.$el.blur();
                    e.preventDefault();
                    return false;
                }
            },
            'click': function(e) {
                this.$el.select();
            },
        },
        initialize: function(opts) {
            this._key = opts._key || 'New Option';
        },
        render: function() {
            this.$el.attr('value', this.model.get('Options')[this._key] || 'New Option');
            return this;
        }
    });
    
    v.UmlObjectFieldOption = Backbone.View.extend({
        tagName: 'li',
        className: 'option',
        initialize: function(opts) {
            this._key = opts._key || 'New Option';
            this._keyView = new v.UmlObjectFieldOptionKey({model:this.model, _key:this._key});
            this._valueView = new v.UmlObjectFieldOptionValue({model:this.model, _key:this._key});
        },
        render: function() {
            this.$el.append(this._keyView.render().el);
            this.$el.append(this._valueView.render().el);
            return this;
        }
    });

    v.UmlObjectFieldAddOption = Backbone.View.extend({
        className: 'add-field-option-wrapper',
        attributes: {
            tabindex: -1,
        },
        events: {
            'click input': function() {
                this.trigger('field-option:add');
            }
        },
        render: function() {
            this.$el.html('<input type="image" tabindex="-1" src="img/glyphicons/glyphicons_190_circle_plus.png" />');
            return this;
        }
    });
    
    v.UmlObjectFieldOptionsTitle = Backbone.View.extend({
        tagName: 'p',
        className: 'field-options-title',
        initialize: function(opts) {
            this._objectModel = opts._objectModel || null;
            this._fieldModel = opts._fieldModel || null;
            this._template = _.template($('#field_options_title_template').html());
            this._objectModel.on('change:Name', this.render, this);
            this._fieldModel.on('change:Name', this.render, this);
        },
        render: function() {
            this.$el.html(this._template({objectName: this._objectModel.get('Name'), fieldName: this._fieldModel.get('Name') }));
            return this;
        },
    });
    
    v.UmlObjectFieldOptions = Backbone.View.extend({
        attributes: { id: 'field-options' },
        initialize: function(opts) {
            this._objectModel = opts._objectModel || null;
            this._fieldModel = opts._fieldModel || null;
            
            this._addFieldOptionView = new v.UmlObjectFieldAddOption()
            
            this._addFieldOptionView.on('field-option:add', function() {
                this.$el.find('ul').append(new v.UmlObjectFieldOption({model:this.model}).render().el);
            }, this);
            
            this._spinner = new Spinner({ lines: 10, length: 8, width: 4, radius: 8, color: '#999'});
        },
        render: function() {
            var title = new v.UmlObjectFieldOptionsTitle({model:this.model, _fieldModel: this._fieldModel, _objectModel: this._objectModel});
            this.$el.html(title.render().el).append('<ul></ul>');
            var ul = this.$el.find('ul');
            for(o in this.model.get('Options')) {
                ul.append(new v.UmlObjectFieldOption({model:this.model, _key:o}).render().el);
            }
            this.$el.append(this._addFieldOptionView.render().el);
            
            return this;
        },
        loading: function(flag) {
            var flag = flag || true;
            
            if(flag) {
                this._spinner.spin(this.el);
            } else {
                this._spinner.stop();
            }
        },
    });
    
    v.UmlObjectFields = Backbone.View.extend({
        tagName: 'ul',
        className: 'fields',
        initialize: function(opts) {
            this._objectModel = opts._objectModel || null;
            
            var self = this;
            
            this.collection.on('add', function(m, c, options) {
                var isNew = options.isNew || false;
                
                if(isNew) {
                    var newField = new v.UmlObjectField({model:m, _objectModel: self._objectModel}).render();
                    
                    this.$el.append(newField.el);
                    
                    newField.$el.find('input.name').select();
                    
                    return this;
                } else {
                    this.render();
                }
            }, this);
        },
        render: function() {
            this.$el.html('');
            this.collection.each(function(m){
                this.$el.append(new v.UmlObjectField({model:m, _objectModel: this._objectModel}).render().el);
            }, this);
            return this;
        }
    });

    v.UmlObjectAddField = Backbone.View.extend({
        className: 'add-field-wrapper',
        attributes: {
            tabindex: -1,
        },
        events: {
            'click input': function() {
                this.trigger('field:add');
            }
        },
        render: function() {
            this.$el.html('<input type="image" tabindex="-1" src="img/glyphicons/glyphicons_190_circle_plus.png" />');
            return this;
        }
    });
    
    v.UmlObjectName = Backbone.View.extend({
        tagName: 'input',
        className: 'object-name',
        initialize: function() {
            this.model.on('change:Name', this.render, this);
        },
        events: {
            'keyup': function(){
                this.model.set('Name', this.$el.val());
                this.$el.attr('size', this.$el.val().length);
            },
            'keydown': function(e) {
                if (e.which === 13 || e.which === 27) {
                    this.$el.blur();
                    e.preventDefault();
                    return false;
                }
            },
            'click': function(e) {
                this.$el.select();
            },
        },
        render: function() {
            var name = this.model.get('Name');
            this.$el.attr({ value: name, size: name.length }).html();
            return this;
        }
    });

    v.ObjectDeleteButton = Backbone.View.extend({
        tagName: 'input',
        className: 'delete-button',
        attributes: {
            type: 'image',
            src: 'img/glyphicons/glyphicons_192_circle_remove.png',
            alt: 'Delete Object',
            title: 'Delete Object',
        },
        events: {
            'click': function() {
//                 alert('delete field');
                this.model.destroy();
                this._parentView.remove();
            },
        },
        initialize: function(opts) {
            this._parentView = opts.parentView || null;
        },
        render: function() {
            this.$el.html();
            return this;
        },
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
            this._deleteButton = new v.ObjectDeleteButton({model:this.model, parentView: this});
            this._fieldsView = new v.UmlObjectFields({collection:this.collection, _objectModel: this.model});
            this._addFieldView = new v.UmlObjectAddField();

            this._addFieldView.on('field:add', function() {
                this.collection.add({
                    Name: 'New Field',
                    Type: 'int'
                }, {isNew: true});
            }, this);
            
            this._spinner = new Spinner({ lines: 10, length: 8, width: 4, radius: 8, color: '#999'});
        },
        render: function() {
            this.$el.append(this._nameView.render().el);
            this.$el.append(this._deleteButton.render().el);
            this.$el.append(this._fieldsView.render().el);
            this.$el.append(this._addFieldView.render().el);
            return this;
        },
        loading: function(flag) {
            var flag = flag || true;
            
            if(flag) {
                this._spinner.spin(this.el);
            } else {
                this._spinner.stop();
            }
        },
    });

    v.UmlObjects = Backbone.View.extend({
        id: 'wall',
        objects: [],
        add: function(model, collection) {
            var objectView = new v.UmlObject({
                model: model,
                collection: collection,
                attributes: { style: 'position: absolute; left: -9999px; top: -9999px;' },
            });
            var gridSize = GROUML.Constants.gridSize;
            this.objects.push(objectView);
            
            this.collection.add(model);
            
            var ovEl = objectView.render().el;
            
            this.$el.append($(ovEl).draggable({ grid: [gridSize, gridSize] }).resizable({ grid: [gridSize, gridSize] }));
            
            var elWidth = $(ovEl).outerWidth();
            var elHeight = $(ovEl).outerHeight();
            
            var placement = GROUML.Utility.findWallSpaceForObject(elWidth, elHeight);
            
            $(ovEl).css({ 'left': placement.x + 'px', 'top': placement.y + 'px' });
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