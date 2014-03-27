/*
 * theminesweeper
 * https://github.com/leosartaj/jquery.minesweeper.js
 *
 * Copyright (c) 2014 Sartaj Singh
 * Licensed under the MIT license.
 */

(function($) {

    // Defines the widget
    $.widget('ss.theminesweeper', {

        // widget currrent version
        version: '0.1.0',

        _create: function() {
            this.element.addClass('ss-minesweeper');
            this._createWrapper();
            this._createButtons();
            this._renderMarkup();
        },
        
        _createWrapper: function() {

        },

        _createButtons: function() {

        },

        _renderMarkup: function() {


        }


    });

}(jQuery));
