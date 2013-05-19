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
        generate: function(name, obj) {
            var all = 'class ' + name + '(models.Model):\n';
            for(var i in obj) {
                if (!obj.hasOwnProperty(i)) {
                    continue;
                }

                var v = obj[i];

                if (typeof v === 'string') {
                    all += u.camelToUnderscore(i) + ' = models.' + djangoTypeMapping[v] + '()\n';
                } else {
                    var f = u.camelToUnderscore(i) + ' = models.' + djangoTypeMapping[v['type']] + '(',
                        count = 0;
                    for (var p in v) {
                        if (!v.hasOwnProperty(p)) {
                            continue;
                        }

                        if (p !== 'type') {
                            if (count++ !== 0) {
                                f += ', ';
                            }
                            f += p + '=' + v[p];
                        }
                    }
                    f += ')';
                    all += indent + f + '\n';
                }
            }
            return all;
        }
    };

    g.registerGenerator('django', djangoGenerator);

})(GROUML.Generators, GROUML.Utility);