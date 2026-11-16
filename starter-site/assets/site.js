/* What only this site does: the contact form's Send. (The pages are drawn by rcube-html/rcube-site.js from data/.) */
RcubeSite.onSubmit(function (values, form) {
  // send it to your server here, e.g. fetch("/api/contact", { method: "POST", body: JSON.stringify(values) })
  form.api.setNodeProps("msg", { text: "Thank you, " + values.name + " — we'll write back soon.", ok: true });
});
