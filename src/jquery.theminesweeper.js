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
        0: 'transparent', 1: 'blue', 2: 'green', 3: 'red', 4: 'black', 5: 'black', 6: 'black', 7: 'black', 8: 'black', 9: 'black', m: 'red', t: 'red'
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
            var level = this.options.levels[0];

            level.mleft = level.mines; 


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
            var el = $('<div/>'), btn = $('<button/>'), span = $('<span/>'), level = this.options.levels[0];

            this.shell = el.clone().addClass('ss-minesweeper-shell ui-widget-header ui-corner-all'); 
            this.display = el.clone().addClass('ss-minesweeper-display ui-corner-all'); 
            this.display.appendTo(this.shell);
            btn.clone().text('s').addClass('ss-minesweeper-smiley ui-widget-content ui-corner-all').data('r', 1).button().appendTo(this.display);
            span.clone().addClass('ss-minesweeper-mines').text(level.mleft).appendTo(this.display);
            span.clone().addClass('ss-minesweeper-timer').text('00:00').appendTo(this.display);
        },

        _createButtons: function() {
            var el = $('<button/>'), container = $('<div/>').addClass('ss-minesweeper-buttons ui-helper-clearfix ui-widget-content ui-corner-all'), i = 0, j, level = this.options.levels[0], height = level.height, width = level.width, buttons = [];

            for(i = 0; i < width; i++) {
                buttons[i] = [];
                for(j = 0; j < height; j++) {
                    if(j === 0) {
                        buttons[i][j] = {label: 's', mine: 'n', classname: 'ss-minesweeper-left', near: 0, active: 'y'};
                    }
                    else {
                        buttons[i][j] = {label: 's', mine: 'n', near: 0, active: 'y'};
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
            this._setStyle();
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
            var btn = $(e.target).closest('button'), result;
            if(e.which === 1) {
                if(btn.data('r') === 1) {
                    this._restart();
                }
                else if(btn.find('span').text() === 'F') {
                    this._setFlag(btn);
                    return 0;
                }
                if(btn.data('r') === 1) {
                    this._restart();
                }
                else {
                    result = this._checkMine(e, btn);
                    if(result === true) {
                        alert('Win!');
                        this.element.find('.ss-minesweeper-buttons button').button('disable').css('opacity', '1');
                    }
                    else if(result === false) {
                        alert('Lost');
                        this.element.find('.ss-minesweeper-buttons button').button('disable').css('opacity', '1');
                    }
                }
            }
            else {
                if(btn.data('r') === 1) {
                    this._restart();
                }
                else {
                    this._setFlag(btn);
                }
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

            $('.ss-minesweeper-buttons button').each(function() {
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
                    $('button[xy="' + c + '"]').button('disable').css('opacity', '1');
                    btn.active = 'n';
                    level.left--;
                    return 0;
                }
                else {
                    $('button[xy="' + c + '"]').find('span').text(btn.near).css('color', this.options.color[btn.near]).css('background', 'white');
                    $('button[xy="' + c + '"]').button('disable').css('opacity', '1');
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
            var span = ui.find('span'), level = this.options.levels[0];
            if(span.text() === 'F') {
                level.mleft++;
                span.text('x').css('color', 'transparent');
            }
            else {

                if(level.mleft !== 0 ) {
                    level.mleft--;
                    span.text('F').css('color', 'red');
                }
            }
            $('.ss-minesweeper-mines').text(level.mleft);
        },

        _setStyle: function() {

            var pad_left;

            this.element.find('.ss-minesweeper-buttons button').css('width', '45').css('float', 'left').css('color', 'transparent');

            $('.ss-minesweeper-display').css('position', 'relative');

            $('.ss-minesweeper-smiley').css('position', 'relative').css('top', '50%').css('left', '50%');


            $('.ss-minesweeper-mines').css('color', this.options.color.m).css('padding-right', '1em').css('float', 'right'); 

            pad_left = $('.ss-minesweeper-display').css('padding-left');

            $('.ss-minesweeper-timer').css('color', this.options.color.t).css('left', pad_left).css('padding-left', '1em').css('float', 'left').css('position', 'absolute'); 

            $('.ss-minesweeper-left').css('clear', 'left');

            $('.ss-minesweeper-buttons').masonry({itemSelector: "button", isFitWidth: true, columnWidth: "button"});

        },

        _restart: function() {
            var el = this.element, level = this.options.levels[0];
            level.mleft = level.mines;
            el.find('.ss-minesweeper-buttons').remove();
            $('.ss-minesweeper-mines').text(level.mleft);
            $('.ss-minesweeper-timer').text('00:00');
            this._createButtons();
            this._renderMarkup();
            this._generateMines();
        }


    });

}(jQuery));
