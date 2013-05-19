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

(function($){
    $(function() {
        var grid_size = 20;

        var m = new GROUML.Models.UmlObject({
            Name: 'Person'
        });

        var c = new GROUML.Collections.UmlObjectFields([
            {
                Name: 'id',
                Type: 'int'
            }
        ]);

        window.Test = new GROUML.Views.UmlObject({
            model: m,
            collection: c
        });

        $('body').append(Test.render().el);

        $('div.uml-object').draggable({ grid: [grid_size, grid_size] }).resizable({ grid: [grid_size, grid_size] });
    });
})(jQuery);
