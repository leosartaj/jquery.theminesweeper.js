/*
 * theminesweeper
 * https://github.com/leosartaj/jquery.minesweeper.js
 *
 * Copyright (c) 2014 Sartaj Singh
 * Licensed under the MIT license.
 */

(function($) {

  // Collection method.
  $.fn.theminesweeper = function() {
    return this.each(function(i) {
      // Do something awesome to each selected element.
      $(this).html('awesome' + i);
    });
  };

  // Static method.
  $.theminesweeper = function(options) {
    // Override default options with passed-in options.
    options = $.extend({}, $.theminesweeper.options, options);
    // Return something awesome.
    return 'awesome' + options.punctuation;
  };

  // Static method default options.
  $.theminesweeper.options = {
    punctuation: '.'
  };

  // Custom selector.
  $.expr[':'].theminesweeper = function(elem) {
    // Is this element awesome?
    return $(elem).text().indexOf('awesome') !== -1;
  };

}(jQuery));
