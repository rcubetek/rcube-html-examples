// Websites & pre-rendering — Whole static websites from data: regions, the render modes server / static /
//    client, mixing them, and drawing pages ahead of time with rcube-html render.
// Live example and explanation: https://rcube-html.com/websites
// Group: Advanced
//
// Covers:
//   - A website drawn from data
//   - The data files
//   - Three render modes
//   - Mixing them in one project
//   - Draw the pages ahead of time: rcube-html render
//   - Change it any time
//
// Form fields (name — type, label):
//   - name — InputField "Your name" (required)
//   - email — InputField "Email" (required)
//
// Actions written here: send
//
// Use it in a client component ("use client"):
//   import { schema, actions } from "<path>/schema/websites";
//   const form = useDynamicTag({ schema, actions });
//   return <DynamicTag form={form} />;
//
// Made by scripts/build-schemas.mjs from src/tutorials/examples/ — don't edit this file, edit the tutorial.

// The schema: the page, as a list of nodes ({ type, id, props, children }).
export const schema = [
  {
    "type": "El",
    "id": "site-header",
    "props": {
      "tag": "header",
      "className": "rc-d-flex rc-align-items-center rc-justify-content-between rc-border-bottom rc-pb-2 rc-mb-3"
    },
    "children": [
      {
        "type": "STRONG",
        "props": {
          "text": "My company"
        }
      },
      {
        "type": "El",
        "id": "menu",
        "props": {
          "tag": "nav",
          "className": "rc-d-flex rc-gap-3"
        },
        "children": [
          {
            "type": "A",
            "props": {
              "href": "#home",
              "text": "Home"
            }
          },
          {
            "type": "A",
            "props": {
              "href": "#about",
              "text": "About",
              "aria-current": "page",
              "className": "rc-fw-bold"
            }
          },
          {
            "type": "A",
            "props": {
              "href": "#contact",
              "text": "Contact"
            }
          }
        ]
      }
    ]
  },
  {
    "type": "El",
    "id": "hero",
    "props": {
      "tag": "section",
      "className": "rc-mb-3"
    },
    "children": [
      {
        "type": "H3",
        "props": {
          "text": "Software that runs your business"
        }
      },
      {
        "type": "El",
        "props": {
          "tag": "p",
          "className": "rc-text-secondary"
        },
        "children": [
          "This header, text and accordion would be ",
          {
            "type": "STRONG",
            "props": {
              "text": "drawn ahead of time"
            }
          },
          " (render \"server\"); the form below is drawn in the browser only."
        ]
      }
    ]
  },
  {
    "type": "Accordion",
    "id": "faq",
    "props": {
      "defaultActiveKey": "q1"
    },
    "items": [
      {
        "key": "q1",
        "title": "Where does the text live?",
        "children": [
          {
            "type": "P",
            "props": {
              "text": "In data files (RcubeSite.page({ … })), as schema — the HTML page is only a frame."
            }
          }
        ]
      },
      {
        "key": "q2",
        "title": "Do I need a server?",
        "children": [
          {
            "type": "P",
            "props": {
              "text": "No: static files on any host. rcube-html render runs on your computer or in CI before you upload."
            }
          }
        ]
      }
    ]
  },
  {
    "type": "ClientOnly",
    "id": "contact",
    "items": [
      {
        "key": "content",
        "children": [
          {
            "type": "El",
            "props": {
              "tag": "div",
              "className": "rc-border rc-rounded rc-p-3 rc-mt-3"
            },
            "children": [
              {
                "type": "H5",
                "props": {
                  "text": "Contact us (drawn in the browser only)"
                }
              },
              {
                "type": "InputField",
                "props": {
                  "name": "name",
                  "label": "Your name",
                  "required": true
                }
              },
              {
                "type": "InputField",
                "props": {
                  "name": "email",
                  "label": "Email",
                  "type": "email",
                  "required": true
                }
              },
              {
                "type": "ButtonField",
                "id": "send",
                "props": {
                  "text": "Send",
                  "variant": "primary",
                  "className": "rc-mt-2",
                  "onClick": "send()"
                }
              },
              {
                "type": "Message",
                "id": "msg",
                "props": {
                  "text": ""
                }
              }
            ]
          }
        ]
      },
      {
        "key": "placeholder",
        "children": [
          {
            "type": "P",
            "props": {
              "text": "Write to us at hello@example.com."
            }
          }
        ]
      }
    ]
  },
  {
    "type": "El",
    "id": "site-footer",
    "props": {
      "tag": "footer",
      "className": "rc-border-top rc-mt-3 rc-pt-2 rc-small rc-text-secondary"
    },
    "children": [
      "© My company — the footer would be render \"static\": plain HTML."
    ]
  }
];

// The actions: the schema names them in its props ("onClick": "fillDemo()"); `api` reads and changes the form
// (setFormData, setNodeProps, getFormData, ...).
export const actions = (api) => ({
  // send: run by ButtonField "send" (onClick)
  send: () => {
    const entries = api.runValidation();            // nothing when a field isn't valid (the errors show)
    if (entries) api.setNodeProps("msg", { text: "Thank you, " + entries[0].name + " — we'll write back soon.", ok: true });
  },
});
