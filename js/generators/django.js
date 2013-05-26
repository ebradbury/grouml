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
        getBrush: function() {
            return 'py';
        },
        generate: function(board) {
            var code = '';
            var objs = board.get('objects');
            
            _(objs).each(function(o) {
                code += 'class ' + o.name + '(models.Model):\n'
                
                _(o.fields).each(function(f) {
                    code += indent + f.name + ' = models.' + djangoTypeMapping[f.type] + '(';
                    
                    if(f.options) {
                        var optLength = f.options.length || 0;
                        _(f.options).each(function(opt, idx) {
                            if(idx+1 == optLength) {
                                code += opt.name + '=' + opt.value;
                            } else {
                                code += opt.name + '=' + opt.value + ', ';
                            }
                        }, this);
                    }
                    
                    code += ')\n';
                }, this);
                
                code += '\n\n';
                
            }, this);
                
            return code;
        }
    };

    g.registerGenerator(djangoGenerator.name, djangoGenerator);

})(GROUML.Generators, GROUML.Utility);