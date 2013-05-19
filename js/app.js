GROUML = GROUML || {};

GROUML.Generators = (function() {
    var generators = {};
    return {
        registerGenerator: function(name, generator) {
            generators[name] = generator;
        },
        getGenerator: function(name) {
            return generators[name];
        },
        getGeneratorNames: function() {
            var names = [];
            for (var i in generators) {
                names.push(i);
            }
            return names;
        }
    };
})();

GROUML.Core = (function() {
    return {
        addFieldToClass: function(fieldName, type, className) {
            var classDiagram = GROUML.Collections.UmlObjects.findWhere({Name: className, Type: 'Class'});
            
            // Are UmlObjectFields tied to specific UmlObjects via FK yet?
            var field = new GROUML.Models.UmlObjectField({ Name: field, Type: type });
        },
    };
})();

(function($){
    $(function() {
        var grid_size = 20;

        var m = new GROUML.Models.UmlObject({
            Name: 'Person',
            Type: 'Class',
        });

        var c = new GROUML.Collections.UmlObjectFields([
            {
                Name: 'id',
                Type: 'int'
            },
            {
                Name: 'last_name',
                Type: 'char'
            },
            {
                Name: 'last_name',
                Type: 'char'
            },
            {
                Name: 'age',
                Type: 'int'
            }
        ]);

        var Test = new GROUML.Views.UmlObject({
            model: m,
            collection: c
        });

        $('#wall').append(Test.render().el);

        var infinitedrag = $.infinitedrag("#wall", {}, {
            width: 100,
            height: 100,
            start_col: 0,
            start_row: 0,
            oncreate: function(){},
        });
        
        $('div.uml-object').draggable({ grid: [grid_size, grid_size] }).resizable({ grid: [grid_size, grid_size] });
        $('div.uml-object add-field').on('click', function() {
            var className = $(this).closest('div.uml-object p.name').text();
            
            var field = new GROUML.Models.UmlObjectField({Name: '', Type: ''});
            
            // Unfinished. Need to re-render the view for the object so that new, blank field will show up.
            Test.render().el;
        });
    });
})(jQuery);
