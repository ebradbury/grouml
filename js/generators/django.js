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
        generate: function(obj) {
            var name = obj.model.Name;
            var all = 'class ' + name + '(models.Model):\n';
            obj.fields.each(function(f) {
                console.log(f);
                all += f.get('Name') + ' = models.' + djangoTypeMapping[f.get('Type')] + '()'
            }, this);
            
            return all;
        },
    };

    g.registerGenerator('django', djangoGenerator);

})(GROUML.Generators, GROUML.Utility);