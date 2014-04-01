/*! The Minesweeper - v0.1.0 - 2014-04-01
* https://github.com/leosartaj/jquery.minesweeper.js
* Copyright (c) 2014 Sartaj Singh; Licensed MIT */
(function($) {

    // constains info about the current level
    var levels = [
        { height: 8 , width: 8, mines: 10 }
    ];

    //contains all the necessary colors
    // 0 - no nearby mine
    // 1, 2, 3, 4, 5, 6, 7, 8 nearby mines
    // m for mines left
    // t for timer
    var color = {
        0: 'transparent', 1: 'blue', 2: 'green', 3: 'red', 4: 'black', 5: 'black', 6: 'black', 7: 'black', 8: 'black', m: 'red', t: 'red'
    };

    // Defines the widget
    $.widget('ss.theminesweeper', {

        
        // widget currrent version
        version: '0.1.0',

        // configurable options
        options: {
            levels: levels,
            color: color
        },

        _create: function() {

            var level = this.options.levels[0];

            // copying total number of mines for mines left displayer
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

            var el = $('<div/>'), span = $('<span/>'), level = this.options.levels[0];

            this.shell = el.clone().addClass('ss-minesweeper-shell ui-widget-header ui-corner-all'); 
            this.display = el.clone().addClass('ss-minesweeper-display ui-corner-all'); 
            this.display.appendTo(this.shell);

            span.clone().addClass('ss-minesweeper-mines').text(level.mleft).appendTo(this.display);
            span.clone().addClass('ss-minesweeper-timer').text('0.0').appendTo(this.display);

            // counts the elapsed time
            level.elapsed = 0.0;
            
            // timer function from jquery.timer.js
            // calculates the elapsed time
            level.timer = $.timer(function() {
                level.elapsed = level.elapsed + 0.01;
                $('.ss-minesweeper-timer').text(level.elapsed.toPrecision(3));
            });
        },

        _createButtons: function() {

            var el = $('<button/>'), container = $('<div/>').addClass('ss-minesweeper-buttons ui-helper-clearfix ui-widget-content ui-corner-all'), i = 0, j, level = this.options.levels[0], height = level.height, width = level.width, buttons = [];

            // initializing smiley button
            el.clone().addClass('ss-minesweeper-smiley ui-widget-content ui-corner-all').data('r', 1).appendTo(this.display).button({
                label: 'Smiley', icons:{
                    primary: 'happy-smiley', secondary: null
                }, text: false
            });

            // updates buttons array
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

            // creating the buttons displayed
            for(j = 0; j < height; j++) {

                for(i = 0; i < width; i++) {

                    var btn = el.clone().text(buttons[i][j].label).appendTo(container);

                    // adding necessary classnames
                    if(!!buttons[i][j].classname) {
                        btn.addClass(buttons[i][j].classname);
                    }

                    // creating useful button attributes
                    btn.attr('x', i);
                    btn.attr('y', j);
                    btn.attr('xy',i + ',' +  j);

                }

            }

            // pushing buttons to global levels array
            level.buttons = buttons;

            // making the buttonset
            container.buttonset();
            container.appendTo(this.shell);
            
            // total number of buttons
            level.left = (height * width);

        },
        _renderMarkup: function() {
            this.shell.appendTo(this.element);
            
            // sets up the css styling
            this._setStyle();
        },

        // takes care of configurable options
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

        // random mine generator function
        _generateMines: function() {

            var level = this.options.levels[0],mines = level.mines, width = level.width, height = level.height, x, y;

            while(mines !== 0) {

                // random  mine coordinates
                x = Math.floor(width * Math.random());
                y = Math.floor(height * Math.random());

                if(level.buttons[x][y].mine === 'n') {
                    level.buttons[x][y].mine = 'y';
                    this._calNear(x, y);
                    mines--;
                }
            }

        },

        // handles the clicks smartly
        _clickHandler: function(e) {
            // btn - the clicked button
            var btn = $(e.target).closest('button'), result;

            // starting the timer
            if(!this.options.levels[0].timer.isActive) {
                this.options.levels[0].timer.set({ time: 10, autostart: true });
            }

            // changing smiley
            this._changeSmiley('0', '1');

            if(e.which === 1) {

                if(btn.data('r') === 1) {
                    this._restart();
                }
                else if(btn.data('f') === 'f') {
                    this._setFlag(btn);
                    this._changeSmiley('1', '0');
                    return 0;
                }
                else {
                    result = this._checkMine(e, btn);
                    if(result === true) {
                        this.element.find('.ss-minesweeper-buttons button').button('disable').css('opacity', '1');
                        return 0;
                    }
                    else if(result === false) {
                        this.element.find('.ss-minesweeper-buttons button').button('disable').css('opacity', '1');
                        return 0;
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
            
            // changing smiley
            this._changeSmiley('1', '0');
        },

        // checks if there is a mine
        _checkMine: function(e, ui) {

            var level = this.options.levels[0], x = +ui.attr('x'), y = +ui.attr('y');

            if(level.buttons[x][y].mine === 'y') {
                this._showBoard();
                this._changeSmiley('1', '2');
                return false;
            }

            this._showRegion(x, y);

            if(this._checkWin()) {
                this._changeSmiley('1', '3');
                return true;
            }

        },

        // updates near counter for the cells touching a mine
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

        // shows complete board if lost
        _showBoard: function() {
            var x, y, level = this.options.levels[0], that = this;

            // pausing the timer
            level.timer.pause();

            $('.ss-minesweeper-buttons button').each(function() {

                x = +$(this).attr('x');
                y = +$(this).attr('y');

                if(level.buttons[x][y].mine === 'y') {
                    $(this).button('option', 'icons', { primary: 'mine-smiley', secondary: null });
                }
                else{
                    $(this).find('span').text(level.buttons[x][y].near).css('color', that.options.color[level.buttons[x][y].near]);
                }

            });
        },

        // shows paricular region on a non-mine click
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

                    // recursive call to adjoining cell
                    for(i = -1; i < 2; i++) {

                        for(j = -1; j < 2; j++) {

                            // new coordinates
                            nx = +(x + i);
                            ny = +(y + j);

                            if(nx > -1 && nx < level.width && ny > -1 && ny < level.height) {
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

        // checks if the player won
        _checkWin: function() {

            var level = this.options.levels[0];

            if(level.left === level.mines) {

                // pausing the timer on a win
                level.timer.pause();
                return true;
            }

            return false;

        },

        // toggles flag
        _setFlag: function(ui) {

            var level = this.options.levels[0];

            if(ui.data('f') === 'f') {

                level.mleft++;
                ui.button('option', 'icons', { primary: null, secondary: null });
                ui.data('f', '');

            }
            else {

                // if mines left = 0, then don't allow anymore flags
                if(level.mleft !== 0 ) {

                    level.mleft--;
                    ui.button('option', 'icons', { primary: 'flag-smiley', secondary: null });
                    ui.data('f', 'f');

                }

            }

            // updating the mines left displayer
            $('.ss-minesweeper-mines').text(level.mleft);

        },

        // takes care of the default styling for the widget
        _setStyle: function() {

            var pad_left = $('.ss-minesweeper-display').css('padding-left');

            this.element.find('.ss-minesweeper-buttons button').css('width', '45').css('float', 'left').css('color', 'transparent');

            $('.ss-minesweeper-display').css('position', 'relative');

            $('.ss-minesweeper-smiley').css('position', 'relative').css('top', '50%').css('left', '45%');


            $('.ss-minesweeper-mines').css('color', this.options.color.m).css('padding-right', '1em').css('float', 'right'); 


            $('.ss-minesweeper-timer').css('color', this.options.color.t).css('left', pad_left).css('padding-left', '1em').css('float', 'left').css('position', 'absolute'); 

            $('.ss-minesweeper-left').css('clear', 'left');

            // initailizes masonry from masonry.js
            $('.ss-minesweeper-buttons').masonry({itemSelector: "button", isFitWidth: true, columnWidth: "button"});

        },

        // allows restart
        _restart: function() {

            var el = this.element, level = this.options.levels[0];

            level.mleft = level.mines;

            // removing buttons
            el.find('.ss-minesweeper-buttons').remove();
            $('.ss-minesweeper-smiley').remove();

            // updating mines left displayer
            $('.ss-minesweeper-mines').text(level.mleft);

            // stopping and resetting timer
            level.timer.stop();
            level.elapsed = 0.0;
            $('.ss-minesweeper-timer').text('0.0');

            // re-initializing board
            this._createButtons();
            this._renderMarkup();

            // re-generating mines
            this._generateMines();
        },

        // changes the smiley on smiley button
        _changeSmiley: function(from, to) {

            var smiley = ['happy-smiley', 'check-smiley', 'sad-smiley', 'cool-smiley'];

            $("." + smiley[+from]).removeClass(smiley[+from]).addClass(smiley[+to]);
        }

    });

}(jQuery));
