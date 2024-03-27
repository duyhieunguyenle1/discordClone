import nodemailer from 'nodemailer';
import config from '../config';

interface sendEmailProps {
  email: string;
  title: string;
  body: string;
}

const sendEmail = async ({ email, title, body }: sendEmailProps) => {
  try {
    const transporter = nodemailer.createTransport({
      host: config.nodemailer.smtp_host,
      auth: {
        user: config.nodemailer.smtp_user,
        pass: config.nodemailer.smtp_password,
      },
    });

    const info = await transporter.sendMail({
      from: `${config.nodemailer.smtp_name} <${config.nodemailer.smtp_email}>`,
      to: email,
      subject: title,
      html: body,
    });

    return info;
  } catch (error) {
    console.log(error);
    return 'Cant send email';
  }
};

export default sendEmail;
