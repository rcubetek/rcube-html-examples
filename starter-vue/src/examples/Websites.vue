<!-- Websites & pre-rendering — https://rcube-html.com/websites -->
<script setup>
import { RcubeForm } from "rcube-html/vue";

const schema = [
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

// the actions the schema names, e.g. "onClick": "save()"
const actions = (api) => ({
  send: () => {
    const entries = api.runValidation();            // nothing when a field isn't valid (the errors show)
    if (entries) api.setNodeProps("msg", { text: "Thank you, " + entries[0].name + " — we'll write back soon.", ok: true });
  },
});
</script>

<template>
  <RcubeForm :schema="schema" :actions="actions" />
</template>
