/* about.html — About us: this page's regions as rcube-html schema. */
RcubeSite.page({
  "regions": {
    "main": {
      "render": "static",
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
                "text": "About us"
              }
            },
            {
              "type": "P",
              "props": {
                "text": "This page's main region is render \"static\": rcube-html render writes it as plain HTML and the browser leaves it alone.",
                "className": "lead"
              }
            },
            {
              "type": "Accordion",
              "props": {
                "defaultActiveKey": "q1"
              },
              "items": [
                {
                  "key": "q1",
                  "title": "Can a static region open and close an accordion?",
                  "children": [
                    {
                      "type": "P",
                      "props": {
                        "text": "Not once it's rendered: it's plain HTML then. Make the region \"server\" when it needs to respond, as the header is."
                      }
                    }
                  ]
                },
                {
                  "key": "q2",
                  "title": "How do I change this page?",
                  "children": [
                    {
                      "type": "P",
                      "props": {
                        "text": "Edit data/pages/about.js, then run rcube-html render again."
                      }
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  }
});
