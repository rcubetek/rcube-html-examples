/* Shared by every page: the header (render "server") and the footer (render "static"). */
RcubeSite.site({
  "render": "server",
  "themeKey": "starter-site-theme",
  "noscript": "<p>This site needs JavaScript to show its pages. Write to <a href=\"mailto:hello@example.com\">hello@example.com<\/a>.<\/p>",
  "fallbackHtml": "<p>This page could not be shown. Please reload it.<\/p>",
  "regions": {
    "header": {
      "schema": [
        {
          "type": "El",
          "props": {
            "tag": "header",
            "className": "site-header"
          },
          "children": [
            {
              "type": "El",
              "props": {
                "tag": "div",
                "className": "wrap bar"
              },
              "children": [
                {
                  "type": "El",
                  "props": {
                    "tag": "a",
                    "className": "brand",
                    "href": "index.html"
                  },
                  "children": [
                    "My company"
                  ]
                },
                {
                  "type": "El",
                  "props": {
                    "tag": "nav",
                    "className": "nav",
                    "id": "site-nav",
                    "aria-label": "Main"
                  },
                  "children": [
                    {
                      "type": "A",
                      "props": {
                        "href": "index.html",
                        "text": "Home"
                      }
                    },
                    {
                      "type": "A",
                      "props": {
                        "href": "about.html",
                        "text": "About"
                      }
                    },
                    {
                      "type": "A",
                      "props": {
                        "href": "contact.html",
                        "text": "Contact"
                      }
                    }
                  ]
                },
                {
                  "type": "El",
                  "props": {
                    "tag": "button",
                    "type": "button",
                    "className": "theme-toggle",
                    "aria-label": "Switch to dark mode"
                  },
                  "children": [
                    "◐"
                  ]
                },
                {
                  "type": "El",
                  "props": {
                    "tag": "button",
                    "type": "button",
                    "className": "menu-toggle",
                    "aria-controls": "site-nav",
                    "aria-expanded": "false",
                    "aria-label": "Menu"
                  },
                  "children": [
                    "☰"
                  ]
                }
              ]
            }
          ]
        }
      ]
    },
    "footer": {
      "render": "static",
      "schema": [
        {
          "type": "El",
          "props": {
            "tag": "footer",
            "className": "site-footer"
          },
          "children": [
            {
              "type": "El",
              "props": {
                "tag": "div",
                "className": "wrap"
              },
              "children": [
                "© {year} My company · ",
                {
                  "type": "A",
                  "props": {
                    "href": "contact.html",
                    "text": "Contact"
                  }
                }
              ]
            }
          ]
        }
      ]
    }
  }
});
