var GROUML = GROUML || {};

GROUML.Constants = (function() {
    return {
        gridSize: 20,
        types: ['int', 'float', 'boolean', 'char', 'text',],
        defaultObjectX: 120,
        defaultObjectY: 20,
    };
})();

GROUML.Utility = (function() {
    return {
        camelToUnderscore: function(str) {
            return str.replace(/([a-z]+)([A-Z][a-z]+)/g, '$1_$2').toLowerCase();
        },
        findWallSpaceForObject: function(width, height) {
            var testGap = GROUML.Constants.gridSize;
            
            var viewport = $('#viewport');
            var viewportWidth = viewport.width();
            var viewportHeight = viewport.height();
            
            var bestGoodnessSoFar = 0;
            var bestSoFar = {
                x: GROUML.Constants.defaultObjectX,
                y: GROUML.Constants.defaultObjectY,
            };
            
            for(var y = testGap; y < (viewportHeight - height); y += testGap) {
                for(var x = testGap; x < (viewportWidth - width); x += testGap) {
                    var goodness = 0;
                    
                    
                    
                    var el = document.elementFromPoint(x, y);
                    if(!$(el).hasClass('uml-object') && !$(el).parents('div.uml-object').length && !($(el).attr('id') == 'toolbar')) { goodness++; }
                    el = document.elementFromPoint(x + width, y);
                    if(!$(el).hasClass('uml-object') && !$(el).parents('div.uml-object').length && !($(el).attr('id') == 'toolbar')) { goodness++; }
                    el = document.elementFromPoint(x + width, y + height);
                    if(!$(el).hasClass('uml-object') && !$(el).parents('div.uml-object').length && !($(el).attr('id') == 'toolbar')) { goodness++; }
                    el = document.elementFromPoint(x, y + height);
                    if(!$(el).hasClass('uml-object') && !$(el).parents('div.uml-object').length && !($(el).attr('id') == 'toolbar')) { goodness++; }
                    
                    if(goodness == 4) {
                        return { x: x, y: y };
                    } else if(goodness > bestGoodnessSoFar) {
                        bestGoodnessSoFar = goodness;
                        bestSoFar.x = x;
                        bestSoFar.y = y;
                    }
                }
            }
            
            return bestSoFar;
        },
    }
})();