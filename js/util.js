var GROUML = GROUML || {};

GROUML.Utility = (function() {
    return {
        camelToUnderscore: function(str) {
            return str.replace(/([a-z]+)([A-Z][a-z]+)/g, '$1_$2').toLowerCase();
        }
    }
})();