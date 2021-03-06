var GROUML = GROUML || {};

(function(r) {

    r.MainRouter = Backbone.Router.extend({
        _boardView: null,
        _optionsView: null,
        _boardId: null,
        routes: {
            '': 'index',
            'board/:id': 'board',
            'board/:id/:field': 'board'
        },
        initialize: function() {
            this._toolbarView = new GROUML.Views.ToolbarView({el: '#board-tab'}).render();
            this._boardView = new GROUML.Views.BoardView({el:'#board'});
            this._optionsView = new GROUML.Views.OptionsView({el: '#field-options'});
            
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
        board: function(id, field) {
            if (this._boardId !== id) {
                this._boardId = id;
                this._board = new GROUML.Models.Board({board_id: id});
                
                var self = this;
                this._board.fetch({
                    success: function(m) {
                        GROUML.Events.trigger('board:change', m);
                    },
                    error: function(m, r) {
                        console.debug(r);
                    },
                });
            }

            if (field) {
                GROUML.Events.trigger('field:change', id);
            }
        }
    });

})(GROUML.Routers = GROUML.Routers || {});