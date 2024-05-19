import nodemailer from "nodemailer";

// Function to send Email
export default async function sendMail(
  fromMail: string,
  toMail: string,
  sub: string,
  textBody: string
) {
  try {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: fromMail, // sender address
      replyTo: fromMail, // Sender's Email
      to: toMail, // list of receivers
      subject: sub, // Subject line
      text: textBody, // plain text body
    });

    console.log("Message sent: %s", info.messageId);
    return info.messageId;
  } catch (error) {
    console.log(error);
    return new Error(String(error));
  }
}

export async function sendHtmlMail(
  fromMail: string,
  toMail: string,
  sub: string,
  emailHtml: any
) {
  try {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: fromMail, // sender address
      replyTo: fromMail, // Sender's Email
      to: toMail, // list of receivers
      subject: sub, // Subject line
      html: emailHtml, // plain text body
    });

    console.log("Message sent: %s", info.messageId);
    return info.messageId;
  } catch (error) {
    console.log(error);
    return new Error(String(error));
  }
}
