+++
title = "CSS Variables update"
date = "2024-07-30"
author = "Mirus"
cover = "img/css-variables-update.webp"
coverCaption = "By the way, you can add a caption for your cover"
description = "A small demo of native CSS Variables. You can create your very own re-Terminal today!"
layout = "css-vars-showcase"
Toc=true
+++

## What is going on?

Hello. This is a first step toward color schema flexibility. 

You still can use existing predefined `accent` colors from the list:
- blue
- green
- orange
- pink
- red

but if you need to pick another accent colors you can do it with the help of native CSS Variables.

Just create, if you haven't any yet, `static/style.css`

and redefine two CSS variables, like this 

```css
:root {
  --accent: blue;
  --accent-contrast-color: yellow;
}
```

### Any other CSS Variable I should know? 

You can find all of them in the browser's page inspector, but here is the list with default values anyway:

```css
  :root {
    --accent: #23B0FF; /* 1 of 5 basic colors */
    --background: color-mix(in srgb, var(--accent) 2%, #1D1E28 98%); /* background color; inherit shades of the accent */
    --accent-contrast-color: black; /* mainly uses for text on the accent backgrounds but not limited */
    --color: white; /* text color, also some other text use the variable in color mixing */
    --border-color: rgba(255, 255, 255, .1); /* border color */
    --phone: "max-width: 684px"; /* phone breakpoint */
    --tablet: "max-width: 900px"; /* tablet breakpoint */

    /* code syntax */
    /* take a look at themes/re-terminal/assets/css/syntax.scss to understand in detail which color stands for */
    --syntax-func-color: color-mix(in srgb, var(--accent) 70%, #999 30%); 
    --syntax-var-color: color-mix(in srgb, var(--accent) 90%, transparent);
    --syntax-value-color: color-mix(in srgb, var(--accent), white);
  }
```


### Future plans
Already right now you can play with CSS Variables and achieve decent results, but I hope will work on some light-ish presets and maybe on exposing event more tokens to the users.


## The interactive demo