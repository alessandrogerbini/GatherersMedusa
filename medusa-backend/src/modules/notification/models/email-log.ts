import { model } from "@medusajs/framework/utils"

const EmailLog = model.define("email_log", {
  id: model.id().primaryKey(),
  to: model.text(),
  from: model.text(),
  subject: model.text(),
  type: model.text(), // order_confirmation, contact_form, newsletter_signup
  status: model.text(), // sent, failed
  error_message: model.text().nullable(),
  metadata: model.json().nullable(),
})

export default EmailLog
















