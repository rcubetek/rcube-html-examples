// Tutorial for rcube-html 0.9: whole websites from data — regions, the render modes (server / static / client), mixing
// them, conditions, and drawing pages ahead of time with `rcube-html render` (rcube-site.js, rcube-html/server, the CLI).

export const websites = {
  sections: [
    {
      heading: "A website drawn from data",
      body: [
        "rcube-html can draw **whole pages**, not only forms. The text and layout live as schema in data files; each page is a small HTML frame with **regions**, and `rcube-site.js` (in `dist/browser/`) draws each region from the data. The host needs nothing but static files — upload by FTP, a File Manager, Firebase or any CDN.",
        "Three components are made for pages: **`El`** — any HTML element with text and nodes inside (`\"tag\": \"section\"`, `\"nav\"`, `\"svg\"`, …); **`Message`** — a line your code changes with `setNodeProps`; **`ClientOnly`** — a part drawn in the browser only (see below). Menu links (`A` inside an `El` with `\"tag\": \"nav\"`) to the current page get `aria-current=\"page\"`, and `\"{year}\"` becomes the year.",
        "The example below is a page in miniature: a header with a menu, a hero, an accordion and a contact form that is drawn in the browser only. The **starter-site** folder on GitHub is a complete three-page site to copy.",
      ],
      code: `<!-- about.html: a frame with three regions -->
<div data-rcube-region="header"></div>
<div data-rcube-region="main"><noscript>This site needs JavaScript.</noscript></div>
<div data-rcube-region="footer"></div>

<script src="rcube-html/rcube-html.js" defer></script>
<script src="rcube-html/rcube-site.js" defer></script>
<script src="data/site.js" defer></script>          <!-- RcubeSite.site({ … })  shared by every page -->
<script src="data/pages/about.js" defer></script>   <!-- RcubeSite.page({ … })  this page -->
<script src="js/site.js" defer></script>            <!-- optional: RcubeSite.onSubmit(…) -->`,
    },
    {
      heading: "The data files",
      body: [
        "`data/site.js` holds what every page shares (the header and footer regions, the site's settings); `data/pages/<page>.js` holds the page's own regions. They are JavaScript around JSON — `RcubeSite.page({ … })` — so the pages also work opened straight from the disk (browsers don't let a `file://` page fetch `.json` files).",
        "A region the page names replaces the site's region of the same name. `fromUrl` fills form fields from the address: `contact.html?topic=school` chooses \"School Office\".",
      ],
      code: `// data/site.js
RcubeSite.site({
  "render": "server",                     // how regions are drawn unless they say otherwise
  "themeKey": "my-site-theme",            // light / dark choice of a .theme-toggle button
  "noscript": "<p>This site needs JavaScript. Write to hello@example.com.</p>",
  "regions": {
    "header": { "schema": [ { "type": "El", "props": { "tag": "header", "className": "site-header" }, "children": [
      { "type": "El", "props": { "tag": "nav" }, "children": [
        { "type": "A", "props": { "href": "index.html", "text": "Home" } },
        { "type": "A", "props": { "href": "about.html", "text": "About" } }
      ] }
    ] } ] },
    "footer": { "render": "static", "schema": [ { "type": "El", "props": { "tag": "footer" }, "children": [ "© {year} My company" ] } ] }
  }
});

// data/pages/about.js
RcubeSite.page({
  "regions": { "main": { "schema": [
    { "type": "El", "props": { "tag": "main", "id": "main" }, "children": [
      { "type": "H1", "props": { "text": "About us" } },
      { "type": "P", "props": { "text": "Since 2017 …", "className": "lead" } }
    ] }
  ] } },
  "fromUrl": { "topic": { "school": "School Office" } }
});`,
    },
    {
      heading: "Three render modes",
      body: [
        "Every region has a **`render`** setting that says how it is drawn. Without the render step everything is drawn in the browser, so drawing ahead of time is optional — add it when search engines, link previews or visitors without JavaScript should get the whole page.",
      ],
      list: [
        "**`\"server\"`** (the default) — drawn into the page ahead of time with its JSON; in the browser it is **taken over** (React hydration): menus, buttons and forms work and nothing is drawn again, so there is no blank moment.",
        "**`\"static\"`** — drawn into the page as plain HTML; the browser leaves it as it is (no JavaScript). Footers, legal text, articles.",
        "**`\"client\"`** — drawn in the browser only; ahead of time only its `placeholder` schema and `noscript` HTML are written in its place. Live data, anything that depends on the visitor, the address or the time.",
      ],
    },
    {
      heading: "Mixing them in one project",
      body: [
        "Use all three at once — per site, per page, per region and per node. A region's own `render` wins, then the page's, then the site's; the command's `--mode` overrides them all for one run.",
        "Inside a region drawn ahead of time, a **node** can say `\"render\": \"client\"` with a `\"placeholder\"`: it is drawn in the browser only (as a `ClientOnly` node), and its fields still belong to the region's form — `runValidation()` and `onSubmit` see them. Use this inside `\"server\"` regions (a `\"static\"` region is never taken over, so it would keep its placeholder).",
        "`render` can depend on what the build knows — the environment (`--env`), the language (`--lang` or the page's `<html lang>`) and the page — never on the visitor:",
      ],
      code: `// pre-render only for production, draw in the browser otherwise
"render": { "default": "client", "prod": "server" }

// by facts: env, lang, page (a value or a list of values)
"render": { "when": { "lang": ["en"], "env": "prod" }, "then": "server", "else": "client" }

// a node drawn in the browser only, inside a pre-rendered page
{ "type": "El", "id": "contact-form", "render": "client",
  "placeholder": [ { "type": "P", "props": { "text": "Write to us at hello@example.com." } } ],
  "props": { "tag": "div" }, "children": [ … the form's fields … ] }`,
    },
    {
      heading: "Draw the pages ahead of time: rcube-html render",
      body: [
        "The **`rcube-html render`** command draws every page's regions into the HTML, as their `render` says. Run it before you publish — by hand, in an npm build or in CI. It has React inside, so nothing else needs installing, and it runs each page's data files (its `<script src>` under `data/`). Running it again replaces what it drew before.",
        "Node code does the same with **`renderPage(html, { site, page, facts, mode })`** from `rcube-html/server` — for an Express or Next.js server, or a build script of your own.",
      ],
      code: `npx rcube-html render public_html                 # draw the pages in place
npx rcube-html render site --out dist             # write a drawn copy, keep the source as it is
npx rcube-html render public_html --env prod      # facts the render conditions read (also --lang)
npx rcube-html render public_html --mode client   # every page back to "drawn in the browser"
npx rcube-html render public_html --check         # change nothing; exit 1 if a page isn't drawn as asked

# package.json of an npm project
"scripts": { "build": "vite build && rcube-html render dist" }

// Node: import { renderPage } from "rcube-html/server";
const { html } = renderPage(pageHtml, { site, page, facts: { page: "about.html", env: "prod" } });`,
    },
    {
      heading: "Change it any time",
      body: [
        "The render modes are just settings in the data files: change a region from `\"static\"` to `\"server\"`, or a page to `\"client\"`, then render again. Different publishes (dev, staging, prod) can draw the same files differently with `--env`.",
        "**After editing data, render again before you upload.** A `\"server\"` or `\"static\"` region shows what was written into the page at the last render; a `\"client\"` region reads the data file directly, so its changes show at once. `--check` lists the pages that are out of date.",
        "Other frameworks: **React / Next.js** call `renderPage` or render the schema themselves; **Angular, Vue, Nuxt** call it from their Node build or server; **JSP, PHP, .NET** include pages or regions drawn at build time and use `\"client\"` regions for what changes per request.",
      ],
    },
  ],
  schema: [
    { type: "El", id: "site-header", props: { tag: "header", className: "rc-d-flex rc-align-items-center rc-justify-content-between rc-border-bottom rc-pb-2 rc-mb-3" }, children: [
      { type: "STRONG", props: { text: "My company" } },
      { type: "El", id: "menu", props: { tag: "nav", className: "rc-d-flex rc-gap-3" }, children: [
        { type: "A", props: { href: "#home", text: "Home" } },
        { type: "A", props: { href: "#about", text: "About", "aria-current": "page", className: "rc-fw-bold" } },
        { type: "A", props: { href: "#contact", text: "Contact" } },
      ] },
    ] },
    { type: "El", id: "hero", props: { tag: "section", className: "rc-mb-3" }, children: [
      { type: "H3", props: { text: "Software that runs your business" } },
      { type: "El", props: { tag: "p", className: "rc-text-secondary" }, children: [
        "This header, text and accordion would be ", { type: "STRONG", props: { text: "drawn ahead of time" } },
        " (render \"server\"); the form below is drawn in the browser only.",
      ] },
    ] },
    { type: "Accordion", id: "faq", props: { defaultActiveKey: "q1" }, items: [
      { key: "q1", title: "Where does the text live?", children: [{ type: "P", props: { text: "In data files (RcubeSite.page({ … })), as schema — the HTML page is only a frame." } }] },
      { key: "q2", title: "Do I need a server?", children: [{ type: "P", props: { text: "No: static files on any host. rcube-html render runs on your computer or in CI before you upload." } }] },
    ] },
    { type: "ClientOnly", id: "contact", items: [
      { key: "content", children: [
        { type: "El", props: { tag: "div", className: "rc-border rc-rounded rc-p-3 rc-mt-3" }, children: [
          { type: "H5", props: { text: "Contact us (drawn in the browser only)" } },
          { type: "InputField", props: { name: "name", label: "Your name", required: true } },
          { type: "InputField", props: { name: "email", label: "Email", type: "email", required: true } },
          { type: "ButtonField", id: "send", props: { text: "Send", variant: "primary", className: "rc-mt-2", onClick: "send()" } },
          { type: "Message", id: "msg", props: { text: "" } },
        ] },
      ] },
      { key: "placeholder", children: [{ type: "P", props: { text: "Write to us at hello@example.com." } }] },
    ] },
    { type: "El", id: "site-footer", props: { tag: "footer", className: "rc-border-top rc-mt-3 rc-pt-2 rc-small rc-text-secondary" }, children: [
      "© My company — the footer would be render \"static\": plain HTML.",
    ] },
  ],
  actionsCode: `send: () => {
  const entries = api.runValidation();            // nothing when a field isn't valid (the errors show)
  if (entries) api.setNodeProps("msg", { text: "Thank you, " + entries[0].name + " — we'll write back soon.", ok: true });
},`,
  props: [
    ["El { tag, …attributes }", "Any HTML element; `children` are text (strings) and nodes. Props are React's: `className`, `htmlFor`, `strokeWidth`, `aria-label`, …"],
    ["Message { text, ok, className }", "A line of text code changes (`setNodeProps`); nothing while empty."],
    ["ClientOnly { items: [content, placeholder] }", "Drawn in the browser only; ahead of time its placeholder. Written for you from `\"render\": \"client\"` on a node."],
    ["render", "`\"server\"`, `\"static\"`, `\"client\"`, `{ default, <env>: mode }` or `{ when: { env, lang, page }, then, else }` — on the site, a page, a region or a node."],
    ["placeholder / noscript", "What a `\"client\"` region or node shows before the browser draws it (schema / HTML)."],
    ["regions", "`{ name: { render, schema, placeholder, noscript, values } }` in `RcubeSite.site` and `RcubeSite.page` (a page's region replaces the site's of the same name)."],
    ["fromUrl / values", "Form values from the address (`{ topic: { school: \"School Office\" } }`, or `true` for the text as it is) and starting values."],
    ["themeKey / fallbackHtml", "Where the light / dark choice is kept; what shows when a page can't be drawn."],
    ["rcube-html render <folder>", "`--out`, `--mode auto|server|static|client`, `--env`, `--lang`, `--year`, `--data`, `--check`."],
  ],
  events: [
    ["RcubeSite.onSubmit(fn)", "A form's `runValidation()` passed (a ButtonField with `onClick: \"runValidation()\"`).", "`(values, form, event)` — `form.api` has every action"],
    ["RcubeSite.onReady(fn)", "Each region's form is drawn or taken over.", "`(form, regionName)`"],
    ["RcubeSite.component(name, fn)", "Registers a component of the site's own (browser only: use it in `\"client\"` parts).", "as `registerComponent`"],
  ],
  tips: [
    "Keep each page's `<title>` and description in its HTML — search results and link previews show them.",
    "A form's fields must be in one region.",
    "`\"{year}\"` in a pre-rendered region is the year of the last render: render again at least once a year.",
    "Class `theme-toggle` switches light / dark, class `menu-toggle` opens `.site-header`'s menu, and links to `#part` of a page land there — all built into rcube-site.js.",
  ],
};
