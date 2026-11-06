# Editable project cover

[cover.svg](cover.svg) is the editable source; [cover.png](cover.png) is the
1280 × 640 PNG used by the README (under 1 MB).

## Design and source

The ticket uses the documented 2021 historical example: three people, weekday CROSSO/G5000, 12:00–18:00, 6 × NT$230 = NT$1,380, or NT$460 per person. It is not a current venue quote.

Text and geometry are editable SVG. Existing demo images, screenshots and animations
remain in their original files; only the cover composition changed.

## Export

Open the SVG in a browser or vector editor. It uses Segoe UI, Georgia, Consolas
and Noto Sans TC system fonts, so another computer may substitute fonts.
The PNG preserves the reviewed appearance. With Microsoft Edge installed:

```text
msedge --headless=new --disable-gpu --hide-scrollbars --window-size=1280,640 --screenshot=cover.png file:///absolute/path/to/cover.svg
```

Render into a scratch directory, inspect the full-size image and a 320 × 160
thumbnail, then replace the PNG beside the SVG. Keep all original demo files.
