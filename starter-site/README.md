# rcube-html starter: a website from data

A small static website — Home, About, Contact — whose text and layout are rcube-html schema in `data/`. No build is
needed and the host needs nothing but static files. The three render modes are used together:

| Part | `render` | What it means |
|---|---|---|
| Header (menu, light / dark button) | `"server"` | drawn into the page ahead of time, then taken over in the browser |
| Home and Contact text | `"server"` | the same |
| About page | `"static"` | drawn ahead of time as plain HTML; the browser leaves it alone |
| Footer | `"static"` | the same |
| Home's news box | `"client"` | drawn in the browser only ("Loading the latest news…" until then) |
| The contact form's fields | `"client"` (a node) | drawn in the browser only, inside the pre-rendered Contact page |

The tutorial page **Websites & pre-rendering** on [rcube-html.com](https://rcube-html.com/websites) explains each part.

## Try it

1. Open `index.html` in a browser (double-click it). Every page is drawn in the browser from `data/`.
2. Draw the pages ahead of time, so search engines and visitors without JavaScript get the whole page:

   ```bash
   npx rcube-html render .
   ```

   Each page now has its regions written into its HTML. Open it again: it looks the same, but the text is in the HTML
   (view the page's source). Running the command again replaces what it drew before.
3. Change a text in `data/pages/about.js`, run `npx rcube-html render .` again and reload.
4. Back to "drawn in the browser" for every page: `npx rcube-html render . --mode client`.

`npx rcube-html render . --check` changes nothing and exits with 1 when a page isn't drawn as its data says (for CI).
`--out <folder>` writes a drawn copy instead of changing the pages. `--env prod` / `--lang en` are what `render`
conditions read: `"render": { "default": "client", "prod": "server" }`.

## What's where

```
index.html, about.html, contact.html   the frames: <head>, regions (data-rcube-region), scripts
data/site.js                           shared: the header and footer regions, the theme key, the no-JavaScript text
data/pages/<page>.js                   each page's regions (main, news) — edit the text here
assets/site.css                        the site's look
assets/site.js                         what only this site does: the contact form's Send (RcubeSite.onSubmit)
rcube-html/                            rcube-html.js, rcube-site.js, styles.css (copied from rcube-html's dist/)
```

## Publish

Run `npx rcube-html render .`, then upload the folder to any static host (FTP, a File Manager, Firebase Hosting,
GitHub Pages, a CDN). Render again whenever you change `data/`: the `"server"` and `"static"` parts show what was
written at the last render; the `"client"` parts read `data/` every time.

## Make it yours

- Add a page: copy `about.html` to `services.html` (change its `<title>`, description and its `data/pages/...js`
  script) and write `data/pages/services.js`. Add it to the menu in `data/site.js`.
- `El` is any HTML element: `{ "type": "El", "props": { "tag": "section", "className": "hero" }, "children": [ "text", { node } ] }`.
  Every other rcube-html component works too: cards, tabs, tables, charts, form fields.
- Change a part's `render` any time, then render again.
