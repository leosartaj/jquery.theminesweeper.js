/*! The Minesweeper - v0.1.0 - 2014-03-27
* https://github.com/leosartaj/jquery.minesweeper.js
* Copyright (c) 2014 Sartaj Singh; Licensed MIT */
(function($) {

    var buttons = [
        { label: '' },
        { label: '' },
        { label: '' },
        { label: '' },
        { label: '' },
        { label: '' }
    ];

    // Defines the widget
    $.widget('ss.theminesweeper', {

        // widget currrent version
        version: '0.1.0',

        options: {
            buttons: buttons
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
            var el = $('<button/>'), container = $('<div/>').addClass('ss-minesweeper-buttons'), i;

            $.each(this.options.buttons, function(i, button) {
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
