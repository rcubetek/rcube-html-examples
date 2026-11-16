/* contact.html — Contact us: this page's regions as rcube-html schema. */
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
                "text": "Contact us"
              }
            },
            {
              "type": "P",
              "props": {
                "text": "The page is drawn ahead of time; the form's fields are \"render\": \"client\", drawn in the browser only.",
                "className": "lead"
              }
            },
            {
              "type": "El",
              "props": {
                "tag": "div",
                "className": "card"
              },
              "id": "contact-form",
              "render": "client",
              "placeholder": [
                {
                  "type": "El",
                  "props": {
                    "tag": "p"
                  },
                  "children": [
                    "Write to us at ",
                    {
                      "type": "A",
                      "props": {
                        "href": "mailto:hello@example.com",
                        "text": "hello@example.com"
                      }
                    },
                    "."
                  ]
                }
              ],
              "children": [
                {
                  "type": "InputField",
                  "props": {
                    "name": "name",
                    "label": "Your name",
                    "required": true,
                    "requiredMessage": "Please enter your name."
                  }
                },
                {
                  "type": "InputField",
                  "props": {
                    "name": "email",
                    "type": "email",
                    "label": "Email",
                    "required": true
                  }
                },
                {
                  "type": "SelectField",
                  "props": {
                    "name": "topic",
                    "label": "Topic",
                    "placeholder": "Choose one",
                    "options": [
                      "A new website",
                      "Support",
                      "Something else"
                    ]
                  }
                },
                {
                  "type": "TextareaField",
                  "props": {
                    "name": "message",
                    "label": "Message",
                    "required": true,
                    "rows": 4
                  }
                },
                {
                  "type": "ButtonField",
                  "props": {
                    "text": "Send",
                    "variant": "primary",
                    "onClick": "runValidation()"
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
        }
      ]
    }
  },
  "fromUrl": {
    "topic": {
      "website": "A new website",
      "support": "Support"
    }
  }
});
