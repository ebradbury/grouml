var GROUML = GROUML || {};

GROUML.Syntax = (function() {
    var mapping = {
        py: '//cdnjs.cloudflare.com/ajax/libs/SyntaxHighlighter/3.0.83/scripts/shBrushPython.min.js'
    };

    return {
        ensureBrush: function(brush) {
            var d = new $.Deferred();

            var wasFound = _(SyntaxHighlighter.brushes).find(function(b) {
                return _(b.aliases).find(function(a) {
                    return a === brush;
                })
            });

            if (wasFound) {
                d.resolve();
            } else {
                var map = mapping[brush];
                if (map) {
                    $.getScript(map).done(function() {
                        d.resolve();
                    });
                } else {
                    d.reject();
                }
            }

            return d.promise();
        }
    };

})();