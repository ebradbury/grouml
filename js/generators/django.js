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
            var code = '<pre>';
            var objs = board.get('objects');
            
            _(objs).each(function(o) {
                code += 'class ' + o.name + '(models.Model):\n'
                
                _(o.fields).each(function(f) {
                    code += indent + f.name + ' = models.' + djangoTypeMapping[f.type] + '(';
                    
                    if(f.options) {
                        var optLength = f.options.length || 0;
                        _(f.options).each(function(opt, idx) {
                            if(idx == optLength) {
                                code += opt.get('name') + '=' + opt.get('value');
                            } else {
                                code += opt.get('name') + '=' + opt.get('value') + ', ';
                            }
                        }, this);
                    }
                    
                    code += ')\n';
                }, this);
                
                code += '\n\n';
                
            }, this);
                
            return code + '</pre>';
        }
    };

    g.registerGenerator(djangoGenerator.name, djangoGenerator);

})(GROUML.Generators, GROUML.Utility);