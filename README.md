# The Minesweeper

A simple jquery-ui plugin that lets you play minesweeper in a webpage

## Getting Started
Download the [production version][min] or the [development version][max].

[min]: https://raw.github.com/sumit/jquery.minesweeper.js/master/dist/theminesweeper.min.js
[max]: https://raw.github.com/sumit/jquery.minesweeper.js/master/dist/theminesweeper.js

In your web page:

```html
<!-- Load libs -->
<script src="../libs/jquery/jquery.js"></script>
<!-- containe jquery-ui-core, jquery-ui-button, jquery-ui-widget -->
<script src="../libs/jquery-ui/jquery-ui-1.10.4.custom.min.js"></script>
<script src="../libs/masonry.min.js"></script>
<script src="../libs/jquery.timer.js"></script>
<!-- for theme from the themeroller -->
<link rel="stylesheet" href="../libs/jquery-ui/theme/jquery-ui.min.css">
<!-- Load the plugin -->
<link rel="stylesheet" href="../dist/jquery.theminesweeper.css">
<script src="../dist/jquery.theminesweeper.min.js"></script>

<script>

    jQuery(function($) {
        // select an empty div tag and call theminesweeper to initialize
        $('#(id)').theminesweeper();
    });

</script>

```

## Documentation
The Plugin can be initialized using the 'theminesweeper()' function on a an empty div tag.

The Plugin Can be configured using an initializing object just like anyother jquery-ui plugin or by the 'option' option after initialization.

### Configurable Options
_(Coming soon)_

## Examples
_(Coming soon)_

## Release History
_(Nothing yet)_
