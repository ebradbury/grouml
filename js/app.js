// Credit to @erzr for getting this class started
var GROUML = (function() {
    var generators = {};
    return {
        registerGenerator: function(name, generator) {
            generators[name] = generator;
        },
        getGenerator: function(name) {
            return generators[name];
        },
        getObjectFromUMLObject: function(name) {
            var object = {};
            
            var uObject = $('div.uml-object[data-name=' + name + ']');
            
            $(uObject).find('ul.fields li').each(function(index, el) {
                var name = $(el).attr('data-name');
                var type = $(el).attr('data-type');
                
                object[name] = type;
            });
            
            return object;
        },
        generateCodeForUMLObject: function(generator, name) {
            var object = this.getObjectFromUMLObject(name);
            
            console.log(this.getGenerator(generator).generate(name, object));
        },
    };
})();

function camelToUnderscore(str) {
    return str.replace(/([a-z]+)([A-Z][a-z]+)/g, '$1_$2').toLowerCase();
}

(function($){
    $(document).ready(function() {
        var grid_size = 20;
        
        $('div.uml-object').draggable({ grid: [grid_size, grid_size] }).resizable({ grid: [grid_size, grid_size] });
        
        GROUML.generateCodeForUMLObject('django', 'Person');
    });
})(jQuery);
