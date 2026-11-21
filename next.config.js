const fs = require("node:fs");
const path = require("node:path");

// The footer line (components/DocsShell.js): "rcube-html 0.9.0 · site v0.1.1 · published Nov 21, 2026, 1:02 PM CT".
// - the site's version: the newest change in its change log, versions/rcube-html-examples.json in the RCube workspace
//   (rcube\web\versions; RCUBE_VERSIONS_DIR overrides it)
// - the rcube-html the site is built with: node_modules/rcube-html/package.json
// - published: the deploy (rcube\script\rcube-html\deploy-rcube-html-example.cmd) sets NEXT_PUBLIC_DEPLOYED_AT before
//   the build; without it the line ends in "local build".
// The text is made here, once, so the page drawn at build time and the browser show exactly the same words.
const readJson = (file) => { try { return JSON.parse(fs.readFileSync(file, "utf8")); } catch { return null; } };

const siteVersion = () => {
  const dirs = [process.env.RCUBE_VERSIONS_DIR, path.resolve(__dirname, "..", "..", "web", "versions")].filter(Boolean);
  for (const dir of dirs) {
    const log = readJson(path.join(dir, "rcube-html-examples.json"));
    if (log?.current) return { version: log.current, title: (log.changes || []).find((c) => c.version === log.current)?.title || "" };
  }
  return { version: "", title: "" };
};

const published = () => {
  const at = Date.parse(process.env.NEXT_PUBLIC_DEPLOYED_AT || "");
  if (!Number.isFinite(at)) return "local build";
  const when = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Chicago", month: "short", day: "numeric", year: "numeric", hour: "numeric", minute: "2-digit", hour12: true,
  }).format(at).replace(/ /g, " ");
  return `published ${when} CT`;
};

const buildInfo = () => {
  const lib = readJson(path.join(__dirname, "node_modules", "rcube-html", "package.json"))?.version;
  const site = siteVersion();
  const text = [lib && `rcube-html ${lib}`, site.version && `site v${site.version}`, published()].filter(Boolean).join(" · ");
  return { NEXT_PUBLIC_BUILD_INFO: text, NEXT_PUBLIC_BUILD_INFO_TITLE: site.title ? `v${site.version}: ${site.title}` : "" };
};

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Static site: `npm run build` writes every page to out/ (served by Firebase Hosting, see firebase.json)
  output: "export",
  env: buildInfo(),
};

module.exports = nextConfig;
