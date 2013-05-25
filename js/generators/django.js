// Credits to @erzr for initial code

(function(g, u){

    var djangoTypeMapping = {
        'int': 'IntegerField',
        'float': 'DecimalField',
        'boolean': 'BooleanField',
        'char': 'CharField',
        'text': 'TextField'
    };

    var indent = '    ';

    var djangoGenerator = {
        name: 'Django',
        generate: function(board) {
            return 'code';
        }
    };

    g.registerGenerator(djangoGenerator.name, djangoGenerator);

})(GROUML.Generators, GROUML.Utility);