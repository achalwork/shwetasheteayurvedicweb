# Design system (light theme)

## Palette
| Token | Hex | Use |
|---|---|---|
| cream | #FFFAF3 | page background |
| paper | #FFFFFF | cards, inputs |
| mint (soft blue) | #EAF0FA | alternate sections, footer |
| peach | #FDEBDD | warm alternate sections, featured card, closing panel |
| emerald (navy) | #1B2A5A | headings, primary buttons, links |
| saffron / marigold | #F4A340 / #FFC857 | CTA hover, badges, highlights (fills; no text on cream) |
| clay / ochre | #C2452F / #A63A27 | italic words, numerals / small text |
| ink / ink-muted | #1A2233 / #53607A | body text (AA on cream) |
Class names (emerald, mint, forest, gold, rose) are legacy names; they now map to this palette in tailwind.config.js.

## Fonts
Fraunces (display), Plus Jakarta Sans (UI), Noto Devanagari for Marathi and Hindi.

## Motion
Easing cubic-bezier(.22,1,.36,1), 0.6-1.0s, once-only reveals, Lenis, route fades; reduced-motion respected.
