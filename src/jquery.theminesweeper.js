/*
 * theminesweeper
 * https://github.com/leosartaj/jquery.minesweeper.js
 *
 * Copyright (c) 2014 Sartaj Singh
 * Licensed under the MIT license.
 */

(function($) {

    var levels = [
        { height: 8 , width: 8, mines: 10 }
    ];

    // Defines the widget
    $.widget('ss.theminesweeper', {

        
        // widget currrent version
        version: '0.1.0',

        options: {
            levels: levels
        },

        _create: function() {
            this.element.addClass('ss-minesweeper');
            this._createWrapper();
            this._createButtons();
            this._generateMines();
            this._renderMarkup();

            this._on({
                'click button': this._clickHandler
            });
        },
        
        _createWrapper: function() {
            var el = $('<div/>'), display;

            this.shell = el.clone().addClass('ss-minesweeper-shell');
            display = el.clone().addClass('ss-minesweeper-display').appendTo(this.shell);
        },

        _createButtons: function() {
            var el = $('<button/>'), container = $('<div/>').addClass('ss-minesweeper-buttons'), i = 0, j, level = this.options.levels[0], height = level.height, width = level.width, buttons = [];

            for(i = 0; i < width; i++) {
                buttons[i] = [];
                for(j = 0; j < height; j++) {
                    if( j === 0) {
                        buttons[i][j] = {label: '', mine: 'n', classname: 'ss-minesweeper-left'};
                    }
                    else {
                        buttons[i][j] = {label: '', mine: 'n'};
                    }
                }
            }
            i = 0; j = 0;
            $.each(buttons, function(i, button) {
                $.each(button, function(j, but) {
                    var btn = el.clone().text(but.label).appendTo(container).button();
                    if(!!but.classname) {
                        btn.addClass(but.classname);
                    }

                    if(!!but.classname) {
                        btn.addClass(but.classname);
                    }
                    btn.data('x', j);
                    btn.data('y', i);
                });
            });
            level.buttons = buttons;
            container.appendTo(this.shell);
        },

        _renderMarkup: function() {
            this.shell.appendTo(this.element);
        },

        _setOptions: function() {
            this._superApply(arguments);
        },

        _setOption: function(key, val) {
            this._super(key, val);

            if(key === 'levels') {
                this.shell.find('button').remove();
                this._createButtons();
                this._renderMarkup();
            }
            else if(key === 'disable') {
                this.shell.find('button').button('option', key, val);
            }
        },

        _generateMines: function() {
            var level = this.options.levels[0],mines = level.mines, width = level.width, height = level.height, x, y;

            while(mines !== 0) {
                x = Math.floor(width * Math.random());
                y = Math.floor(height * Math.random());
                level.buttons[x][y].mine = 'y';
                mines--;
            }

        },

        _clickHandler: function(e) {
            var btn = $(e.target).closest('button');
            this._checkMine(e, btn);
        },

        _checkMine: function(e, ui) {
            var check = this.options.levels[0].buttons[+ui.data('x')][+ui.data('y')].mine;

            if(check === 'y') {
                alert('lost');
            }
        }

    });

}(jQuery));
