/*
 * theminesweeper
 * https://github.com/leosartaj/jquery.minesweeper.js
 *
 * Copyright (c) 2014 Sartaj Singh
 * Licensed under the MIT license.
 */

(function($) {

    var levels = [
        { height: 8 , width: 8 }
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
            this._renderMarkup();
        },
        
        _createWrapper: function() {
            var el = $('<div/>'), display;

            this.shell = el.clone().addClass('ss-minesweeper-shell');
            display = el.clone().addClass('ss-minesweeper-display').appendTo(this.shell);
        },

        _createButtons: function() {
            var el = $('<button/>'), container = $('<div/>').addClass('ss-minesweeper-buttons'), i = 0, j, level = this.options.levels[0], height = level.height, width = level.width, buttons = [];

            for(i = 0; i < width; i++) {
                for(j = 0; j < height; j++) {
                    if( j === 0) {
                        buttons.push({label: '', classname: 'ss-minesweeper-left'});
                    }
                    else {
                        buttons.push({label: ''})
                    }
                }
            }

            $.each(buttons, function(i, button) {
                var btn = el.clone().text(button.label).appendTo(container).button();
                if(!!button.classname) {
                    btn.addClass(button.classname);
                }

                if(!!button.classname) {
                    btn.addClass(button.classname);
                }

            });

                container.appendTo(this.shell);
        },

        _renderMarkup: function() {
            this.shell.appendTo(this.element);
        }

    });

}(jQuery));
