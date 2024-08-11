const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");
const handlebars = require("handlebars");

const transporter = nodemailer.createTransport({
  service: process.env.MAIL_SERVICE,
  secure: true,
  port: 465,
  auth: {
    user: process.env.USER_EMAIL,
    pass: process.env.USER_PASSWORD,
  },
});

const sendMail = async ({ to, subject, templateName, context }) => {
  const templatePath = path.resolve(
    __dirname,
    "../templates",
    `${templateName}.html`
  );

  const source = fs.readFileSync(templatePath, "utf-8").toString();
  const template = handlebars.compile(source);
  const htmlToSend = template(context);

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject,
    html: htmlToSend,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (err) {
    throw new Error("Could not send email.");
  }
};

module.exports = { sendMail };
