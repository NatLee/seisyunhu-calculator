# Editable project cover

[`cover.svg`](cover.svg) is the editable source. [`cover.png`](cover.png) is the
1600 × 800 PNG export used by the README. Shapes and text are editable SVG;
embedded demo images keep their original source files listed below.

## Source assets

- [`js/price.js`](../../js/price.js)

The original demo images receive only typography, framing and scaling. The historical example evaluates the actual pricing function: three people, weekday 12:00–18:00, CROSSO/G5000 and no discount; NT$ 1,380 total, NT$ 460 each.

## Export

Open the SVG in a browser or vector editor. With Microsoft Edge installed:

```text
msedge --headless=new --disable-gpu --hide-scrollbars --window-size=1600,800 --screenshot=cover.png file:///absolute/path/to/cover.svg
```

Run the command from a scratch directory, inspect the PNG, then copy it beside
the SVG. Original demo images and animations are preserved unchanged; existing
attribution remains in the README.

## Decorative element

[`cover-element.png`](cover-element.png) is a separate transparent object illustration.
It is composed into the editable SVG as a small accent, with a faint dot pattern
and theme color. It does not replace or retouch the original demo images.

The final accent uses objects rather than an illustrated person. Text remains
editable SVG, and the PNG export keeps the existing README image path.
