## Fonts
---

Fonts are a critical part of the initial loading performance of the application. Poorly optimized fonts can significantly increase the amount of downloaded resources and negatively impact Core Web Vitals.

### Naming Conventions

- **Use kebab-case for CSS variables.**  
  Kebab-case is the standard naming convention for CSS properties, such as `background-color`, `font-family`, and `border-radius`. CSS custom properties should follow the same convention for consistency and readability.

### Variable Fonts

Prefer using **variable fonts** whenever possible.

Variable fonts contain multiple font weights and styles inside a single file, allowing the application to use different typography variants without downloading multiple independent font files.

For example, instead of downloading:

- Regular
- Medium
- SemiBold
- Bold

as separate files, a single variable font can provide all of them.

This reduces:
- HTTP requests
- Asset duplication
- Overall font size
- Layout inconsistencies

### Convert Fonts to WOFF2

Always use the `woff2` format in production.

`woff2` is significantly smaller and more optimized for web delivery than `.ttf` or `.otf` formats, which are commonly provided when downloading fonts from Google Fonts.

Benefits of `woff2`:
- Better compression
- Faster download times
- Reduced bandwidth usage
- Better rendering performance

### Generate a Font Subset

Font files often contain thousands of unused glyphs and character sets.

Generating a subset allows trimming the font file to include only the character ranges required by the application.

For example:
- Latin characters
- Spanish accents
- Common punctuation symbols

This can drastically reduce the final font size.

Be careful when aggressively trimming character ranges in applications with user-generated content. Users may input characters that are not included in the generated subset, causing missing glyphs or rendering issues.

A good strategy is to:
- Include all expected languages
- Preserve common punctuation
- Keep fallback system fonts enabled

You can generate optimized subsets using:

[Font Squirrel Webfont Generator](https://www.fontsquirrel.com/tools/webfont-generator?utm_source=chatgpt.com)
