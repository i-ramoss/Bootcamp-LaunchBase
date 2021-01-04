const nodemailer = require("nodemailer")

module.exports = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "2da3d046e33719",
    pass: "77beb37c2a3c54"
  }
});
