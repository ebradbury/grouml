// Credits to @erzr for initial code

var djangoTypeMapping = {
    'int': 'IntegerField',
    'float': 'DecimalField',
    'boolean': 'BooleanField',
    'char': 'CharField',
    'text': 'TextField',
};

var indent = '    ';

var djangoGenerator = (function() {
    return {
        generate: function(name, obj) {
            var all = 'class ' + name + '(models.Model):\n';
            for(var i in obj) {
                var v = obj[i];
                
                if (typeof v === 'string') {
                    all += camelToUnderscore(i) + ' = models.' + djangoTypeMapping[v] + '()\n';
                } else {
                    var f = camelToUnderscore(i) + ' = models.' + djangoTypeMapping[v['type']] + '(',
                        count = 0;
                    for (var p in v) {
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
    }
})();

GROUML.registerGenerator('django', djangoGenerator);