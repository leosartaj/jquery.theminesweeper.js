# The Minesweeper

A simple jquery-ui plugin that lets you play minesweeper in a webpage

## Getting Started
Download the plugin [production version][min] or the [development version][max].

[min]: https://raw.githubusercontent.com/leosartaj/jquery.theminesweeper.js/master/dist/jquery.theminesweeper.min.js
[max]: https://raw.githubusercontent.com/leosartaj/jquery.theminesweeper.js/master/dist/jquery.theminesweeper.js

Download the [css][mins].

[mins]: https://raw.githubusercontent.com/leosartaj/jquery.theminesweeper.js/master/dist/jquery.theminesweeper.css

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

The Plugin Can be configured using an initializing object just like any other jquery-ui plugin or by the 'option' option after initialization.

### Configurable Options

####levels
levels array allows to initialize level of your choice. It contains a single object having height, width and mines property.
Here's an example :

```javascript

$('#id').theminesweeper({
    levels: [ { height: 8, width: 8, mines: 10 } ]
});

```

##### OR

After initialization

```javascript

$('#id').theminesweeper( 'option', 'levels', [ { height: 8, width: 8, mines: 10 } ] );

```

####color
color object allows to set custom colors for the various elements.
Here's an example :

```javascript

$('#id').theminesweeper({
    color: { 0: 'transparent', 1: 'blue', 2: 'green', 3: 'red', 4: 'black', 5: 'black', 6: 'black', 7: 'black', 8: 'black', m: 'red', t: 'red' }
});

```

0 represents no mine, likewise 1 stands for 1 mine, 2 for 2 and so on.
m stands for mines left displayer.
t stands for timer.

##### OR

After initialization

```javascript

$('#id').theminesweeper( 'option', 'color', 
    { 0: 'transparent', 1: 'blue', 2: 'green', 3: 'red', 4: 'black', 5: 'black', 6: 'black', 7: 'black', 8: 'black', m: 'red', t: 'red' }
);

```

####Smiley

In the css file for the plugin, set the path for desired smilies.

```css

/* location of custom icons */
.happy-smiley {
    background-image: url(Path) !important;
}

.check-smiley {
    background-image: url(Path) !important;
}

.sad-smiley {
    background-image: url(Path) !important;
}

.cool-smiley {
    background-image: url(Path) !important;
}

.flag-smiley {
    background-image: url(Path) !important;
}

.mine-smiley {
    background-image: url(Path) !important;
}

```

## Examples

Checkout the examples in the example directory

## Release History

Check The Release History [On Jquery][mint] or [On Github][maxt]

[mint]: https://plugins.jquery.com/theminesweeper
[maxt]: https://github.com/leosartaj/jquery.theminesweeper.js/releases
