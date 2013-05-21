var GROUML = GROUML || {};

(function(r) {

    r.MainRouter = Backbone.Router.extend({
        currentBoard: null,
        routes: {
            '': 'index',
            'board/:id': 'board'
        },
        initialize: function() {
            Backbone.history.start();
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
        board: function(id) {
            var obj = new GROUML.Models.Board({
                board_id: id
            });

            var self = this;
            obj.fetch({
                success: function(m) {
                    self.currentBoard = m;
                },
                error: function() {

                }
            })
        }
    });

})(GROUML.Routers = GROUML.Routers || {});