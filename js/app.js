GROUML = GROUML || {};

GROUML.Constants = (function() {
    return {
        gridSize: 20,
        types: ['int', 'float', 'boolean', 'char', 'text',],
        defaultObjectX: 120,
        defaultObjectY: 20,
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
        var umlObjects = new GROUML.Collections.UmlObjects();
        var objectView = new GROUML.Views.UmlObjects({collection: umlObjects});
        
        $('#tabs').tabs({
            heightStyle: 'fill',
            activate: function(event, ui) {
                if(ui.newPanel.attr('id') == 'code-tab') {
                    var djangoGenerator = GROUML.Generators.getGenerator('django');
                    ui.newPanel.html('<pre>');
                    
                    console.log(umlObjects.collection);
                    
                    umlObjects.each(function(umlObject) {
                        ui.newPanel.append(djangoGenerator.generate({model: umlObject.toJSON(), fields: umlObject.collection}) + '\n\n');
                    }, this);
                    
                    ui.newPanel.append('</pre>');
                }
            },
        });
        
        // fix the classes
        $( ".tabs-bottom .ui-tabs-nav, .tabs-bottom .ui-tabs-nav > *" )
        .removeClass( "ui-corner-all ui-corner-top" )
        .addClass( "ui-corner-bottom" );
    
        // move the nav to the bottom
        $( ".tabs-bottom .ui-tabs-nav" ).appendTo( ".tabs-bottom" );
        
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
                Name: 'first_name',
                Type: 'char',
                Options: {
                    'max_length': 25,
                    'default': 'Elliot',
                },
            },
            {
                Name: 'last_name',
                Type: 'char',
                Options: {
                    'max_length': 50,
                    'default': 'Bradbury',
                    'blank': true,
                },
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
