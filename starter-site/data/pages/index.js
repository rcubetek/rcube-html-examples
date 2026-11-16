/* index.html — Home: this page's regions as rcube-html schema. */
RcubeSite.page({
  "regions": {
    "main": {
      "schema": [
        {
          "type": "El",
          "props": {
            "tag": "main",
            "id": "main",
            "className": "wrap"
          },
          "children": [
            {
              "type": "H1",
              "props": {
                "text": "Software that runs your business"
              }
            },
            {
              "type": "P",
              "props": {
                "text": "This page is drawn from data/pages/index.js. Run rcube-html render and it is written into index.html too, for search engines.",
                "className": "lead"
              }
            },
            {
              "type": "El",
              "props": {
                "tag": "div",
                "className": "cards"
              },
              "children": [
                {
                  "type": "El",
                  "props": {
                    "tag": "article",
                    "className": "card"
                  },
                  "children": [
                    {
                      "type": "H3",
                      "props": {
                        "text": "server"
                      }
                    },
                    {
                      "type": "P",
                      "props": {
                        "text": "The header and this text: drawn ahead of time, then taken over in the browser."
                      }
                    }
                  ]
                },
                {
                  "type": "El",
                  "props": {
                    "tag": "article",
                    "className": "card"
                  },
                  "children": [
                    {
                      "type": "H3",
                      "props": {
                        "text": "static"
                      }
                    },
                    {
                      "type": "P",
                      "props": {
                        "text": "The footer and the About page: plain HTML, no JavaScript."
                      }
                    }
                  ]
                },
                {
                  "type": "El",
                  "props": {
                    "tag": "article",
                    "className": "card"
                  },
                  "children": [
                    {
                      "type": "H3",
                      "props": {
                        "text": "client"
                      }
                    },
                    {
                      "type": "P",
                      "props": {
                        "text": "The news box below and the contact form: drawn in the browser only."
                      }
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    },
    "news": {
      "render": "client",
      "placeholder": [
        {
          "type": "P",
          "props": {
            "text": "Loading the latest news…",
            "className": "muted"
          }
        }
      ],
      "schema": [
        {
          "type": "El",
          "props": {
            "tag": "aside",
            "className": "wrap news"
          },
          "children": [
            {
              "type": "H2",
              "props": {
                "text": "News"
              }
            },
            {
              "type": "P",
              "props": {
                "text": "A \"client\" region: its text comes from the data file every time, so changes show without rendering again."
              }
            }
          ]
        }
      ]
    }
  }
});
