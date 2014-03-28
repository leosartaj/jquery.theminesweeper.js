 /* theminesweeper
 * https://github.com/leosartaj/jquery.minesweeper.js
 *
 * Copyright (c) 2014 Sartaj Singh
 * Licensed under the MIT license.
 */

(function($) {

    var levels = [
        { height: 8 , width: 8, mines: 10 }
    ];
    var color = {
        0: 'transparent', 1: 'blue', 2: 'green', 3: 'red', 4: 'black', 5: 'black', 6: 'black', 7: 'black', 8: 'black', 9: 'black'
    };

    // Defines the widget
    $.widget('ss.theminesweeper', {

        
        // widget currrent version
        version: '0.1.0',

        options: {
            levels: levels,
            color: color
        },

        _create: function() {
            this.element.addClass('ss-minesweeper ui-widget ui-corner-all');
            this._createWrapper();
            this._createButtons();
            this._generateMines();
            this._renderMarkup();

            this._on({
                'mousedown button': this._clickHandler
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
                        buttons[i][j] = {label: 'x', mine: 'n', classname: 'ss-minesweeper-left', near: 0, active: 'y'};
                    }
                    else {
                        buttons[i][j] = {label: 'x', mine: 'n', near: 0, active: 'y'};
                    }
                }
            }
            for(i = 0; i < width; i++) {
                for(j = 0; j < height; j++) {
                    var btn = el.clone().text(buttons[i][j].label).appendTo(container);

                    if(!!buttons[i][j].classname) {
                        btn.addClass(buttons[i][j].classname);
                    }
                    btn.attr('x', i);
                    btn.attr('y', j);
                    btn.attr('xy',i + ',' +  j);
                }
            }
            level.buttons = buttons;
            container.buttonset();
            container.appendTo(this.shell);
            level.left = (height * width);
        },

        _renderMarkup: function() {
            this.shell.appendTo(this.element);
            this.element.find('button').css('width', '45').css('float', 'left').css('color', 'transparent');
            $('.ss-minesweeper-left').css('clear', 'left');
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
                    this._calNear(x, y);
                    mines--;
                }
            }

        },

        _clickHandler: function(e) {
            var btn = $(e.target).closest('button');
            if(e.which === 1) {
                var result = this._checkMine(e, btn);
                if(result === true) {
                    alert('Win!');
                    this.element.find('button').button('disable').css('opacity', '1');
                }
                else if(result === false) {
                    alert('Lost');
                    this.element.find('button').button('disable').css('opacity', '1');
                }
            }
            else {
                this._setFlag(btn);
            }
        },

        _checkMine: function(e, ui) {
            var level = this.options.levels[0], x = +ui.attr('x'), y = +ui.attr('y');

            if(level.buttons[x][y].mine === 'y') {
                this._showBoard();
                return false;
            }
            this._showRegion(x, y);
            if(this._checkWin()) {
                return true;
            }
        },

        _calNear: function(x, y) {
            var level = this.options.levels[0];

            if(((x - 1) > -1) && ((y - 1) > -1)) {
                level.buttons[x - 1][y - 1].near++;
            }
            if((y - 1) > -1) {
                level.buttons[x][y - 1].near++;
            }
            if((x - 1) > -1) {
                level.buttons[x - 1][y].near++;
            }
            if(((y + 1) < level.height) && ((x + 1) < level.width)) {
                level.buttons[x + 1][y + 1].near++;
            }
            if ((x + 1) < level.width) {
                level.buttons[x + 1][y].near++;
            }
            if((y + 1) < level.height) {
                level.buttons[x][y + 1].near++;
            }
            if (((x + 1) < level.width) && ((y - 1) > -1)) {
                level.buttons[x + 1][y - 1].near++;
            }
            if(((x - 1) > -1) && ((y + 1) < level.height)) {
                level.buttons[x - 1][y + 1].near++;
            }
        },

        _showBoard: function() {
            var x, y, level = this.options.levels[0], that = this;

            $('button').each(function() {
                x = +$(this).attr('x');
                y = +$(this).attr('y');
                if(level.buttons[x][y].mine === 'y') {
                    $(this).find('span').text('9').css('color', that.options.color[9]);
                }
                else{
                    $(this).find('span').text(level.buttons[x][y].near).css('color', that.options.color[level.buttons[x][y].near]);
                }
            });
        },

        _showRegion: function(x, y) {
            var c = x + ',' + y, level = this.options.levels[0], btn = level.buttons[x][y], i, j, nx, ny;

            if(btn.active === 'y') {
                if(btn.near !== 0) {
                    $('button[xy="' + c + '"]').find('span').text(btn.near).css('color', this.options.color[btn.near]).css('background', 'white');
                    btn.active = 'n';
                    level.left--;
                    return 0;
                }
                else {
                    $('button[xy="' + c + '"]').find('span').text(btn.near).css('color', this.options.color[btn.near]).css('background', 'white');
                    btn.active = 'n';
                    level.left--;
                    for(i = -1; i < 2; i ++) {
                        for(j = -1; j < 2; j++) {
                            nx = x + i;
                            ny = y + j;
                            if(nx > -1 && nx < level.height && ny > -1 && ny < level.width) {
                                this._showRegion(nx, ny);
                            }
                        }
                    }
                }
            }
            else {
                return 0;
            }
        },

        _checkWin: function() {
            var level = this.options.levels[0];
            if(level.left === level.mines) {
                return true;
            }
            return false;
        },

        _setFlag: function(ui) {
            var span = ui.find('span');
            if(span.text() === 'F') {
                span.text('x').css('color', 'transparent');
            }
            else {
                span.text('F').css('color', 'red');
            }
        }


    });

}(jQuery));
