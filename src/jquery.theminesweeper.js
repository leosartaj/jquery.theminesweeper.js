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
                    if(j === 0) {
                        buttons[i][j] = {label: 'x', mine: 'n', classname: 'ss-minesweeper-left'};
                    }
                    else {
                        buttons[i][j] = {label: 'x', mine: 'n'};
                    }
                }
            }
            for(i = 0; i < width; i++) {
                for(j = 0; j < height; j++) {
                    var btn = el.clone().text(buttons[i][j].label).appendTo(container).button();

                    if(!!buttons[i][j].classname) {
                        btn.addClass(buttons[i][j].classname);
                    }
                    btn.data('x', j);
                    btn.data('y', i);
                }
            }
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
                this._generateMines();
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
                if(level.buttons[x][y].mine === 'n') {
                    level.buttons[x][y].mine = 'y';
                    console.log('yes');
                    mines--;
                }
            }

        },

        _clickHandler: function(e) {
            var btn = $(e.target).closest('button');
            this._checkMine(e, btn);
        },

        _checkMine: function(e, ui) {
            var level = this.options.levels[0], x = +ui.data('x'), y = +ui.data('y');

            if(level.buttons[x][y].mine === 'y') {
                ui.find('span').text('9');
                return 0;
            }
            ui.find('span').text(this._checkNum(x, y));
        },

        _checkNum: function(x, y) {
            var level = this.options.levels[0], num = 0;

            if(((x - 1) > -1) && ((y - 1) > -1)) {
                if(level.buttons[x - 1][y - 1].mine === 'y') {
                    num++;
                }
            }
            if((y - 1) > -1) {
                if(level.buttons[x][y - 1].mine === 'y') {
                    num++;
                }
            }
            if((x - 1) > -1) {
                if(level.buttons[x - 1][y].mine === 'y') {
                    num++;
                }
            }
            if(((y + 1) < level.width) && ((x + 1) < level.height)) {
                if(level.buttons[x + 1][y + 1].mine === 'y') {
                    num++;
                }
            }
            if ((x + 1) < level.height) {
                if(level.buttons[x + 1][y].mine === 'y') {
                    num++;
                }
            }
            if((y + 1) < level.width) {
                if(level.buttons[x][y + 1].mine === 'y') {
                    num++;
                }
            }
            if (((x + 1) < level.height) && ((y - 1) > -1)) {
                if(level.buttons[x + 1][y - 1].mine === 'y') {
                    num++;
                }
            }
            if(((x - 1) > -1) && ((y + 1) < level.width)) {
                if(level.buttons[x - 1][y + 1].mine === 'y') {
                    num++;
                }
            }

            if(num === 0) {
                this._checkNum(x - 1, y + 1);
                this._checkNum(x + 1, y - 1);
                this._checkNum(x, y - 1);
                this._checkNum(x, y + 1);
                this._checkNum(x - 1, y - 1);
                this._checkNum(x + 1, y);
                this._checkNum(x + 1, y + 1);
                this._checkNum(x - 1, y - 1);
            }
            return num;
        }


    });

}(jQuery));
