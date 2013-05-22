var GROUML = GROUML || {};

(function(r) {

    r.MainRouter = Backbone.Router.extend({
        _boardView: null,
        routes: {
            '': 'index',
            'board/:id': 'board',
            'board/:id/:field': 'board'
        },
        initialize: function() {
            Backbone.history.start();

            this._boardView = new GROUML.Views.BoardView();
        },
        index: function() {
            var obj = new GROUML.Models.Board();

            var self = this;
            obj.create({
                success: function(m) {
                    var id = m.get('board_id');
                    self.navigate('board/' + id, {trigger: true});
                }
            });
        },
        board: function(id, field) {
            GROUML.Events.trigger('board:change', id);
        }
    });

})(GROUML.Routers = GROUML.Routers || {});