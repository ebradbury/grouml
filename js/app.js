GROUML = GROUML || {};

GROUML.Constants = (function() {
    return {
        gridSize: 20,
    };
})();

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

(function($){
    $(function() {
        var objectView = new GROUML.Views.UmlObjects();
        $('#viewport').append(objectView.render().el);

        var gridSize = GROUML.Constants.gridSize;

        var m = new GROUML.Models.UmlObject({
            Name: 'Person',
            Type: 'Class'
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

        objectView.add(m, c);

        var infinitedrag = $.infinitedrag("#wall", {}, {
            width: 100,
            height: 100,
            start_col: 0,
            start_row: 0,
            oncreate: function(){},
        });
        
        var $addButton = $('#add-class-diagram');

        $addButton.button({
            text: false,
            icons: {
                primary: "ui-icon-plusthick"
            }
        });

        $addButton.on('click', function() {
            objectView.new('New Entity');
        })
    });
})(jQuery);
