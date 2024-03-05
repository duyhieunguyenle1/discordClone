import nodemailer from 'nodemailer';

interface sendEmailProps {
  email: string;
  title: string;
  body: string;
}

const sendEmail = async ({ email, title, body }: sendEmailProps) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    const info = await transporter.sendMail({
      from: `${process.env.SMTP_FROM_NAME} <${process.env.SMTP_FROM_EMAIL}>`,
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
