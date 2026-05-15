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

[Font subsetter online tool](https://font-converters.com/tools/font-subsetter)
----
## HTML

### Prefer `<svg>` Tags Over `<img>` for SVG Content
Always prefer inline `<svg>` tags when inserting SVG content. This approach allows us to easily animate SVG elements and add interactivity through CSS or JavaScript. Inline SVGs also let us modify properties such as `fill`, `stroke`, `opacity`, and transformations directly from CSS.

When using an `<img>` tag to load an SVG file, the SVG is treated as an external image document. Because of this, we cannot directly style or manipulate its internal elements.

However, there is one important exception:

**Prefer using an `<img>` tag when the SVG is a critical static asset that benefits from browser caching**, especially assets used during the First Contentful Paint (FCP), such as logos or large illustrations. Loading SVGs through `<img>` allows the browser to cache the asset independently and avoid duplicating the SVG markup in the HTML document.

### Use Semantically Correct HTML Elements (`main`, `nav`, `footer`, etc.)

When building the general page layout, prefer semantically meaningful HTML elements instead of generic `<div>` containers whenever possible.
Use elements such as:
- `<main>`
- `<header>`
- `<nav>`
- `<footer>`
- `<section>`
- `<article>`
- `<aside>`
These elements help describe the purpose and structure of the content, improving readability, accessibility, maintainability, and SEO.
Avoid using `<div>` elements when a semantic alternative better represents the role of the content.

### Use `<body>` as the Main Page Container
Prefer using the `<body>` element as the primary layout container for the page instead of wrapping the entire application inside an additional root `<div>`.
For example, it is valid to apply layout styles such as Flexbox directly to the `<body>` element:
```css
body {
  display: flex;
  flex-direction: column;
}
```

### Create Clean HTML by Minimizing CSS Classes Inside Components
Prefer using a single class name on the root container of a component and rely on CSS selectors to target its child elements whenever possible.
This approach may require more advanced selectors such as `:first-child`, `:last-child`, `:nth-child()`, or nested selectors, but it helps keep the HTML structure cleaner and easier to read by reducing unnecessary class names on internal elements.
Avoid adding class names to every nested element unless they represent reusable subcomponents, semantic elements, or states that require explicit identification.

### Use BEM for Nested Elements in Reusable Components
When creating reusable HTML/CSS components, use the BEM naming convention to avoid naming collisions and improve readability and maintainability.
Use the following structure:
```css
.component-name__inner-element--optional-variant
```