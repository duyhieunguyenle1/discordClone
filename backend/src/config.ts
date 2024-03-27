import dotenv from 'dotenv';
dotenv.config();

const config = {
  database: {
    database_url: process.env.DATABASE_URL,
  },
  jwt_config: {
    access_secret_token: process.env.ACCESS_SECRET_TOKEN,
    access_expires_time: process.env.ACCESS_EXPIRES_TIME,
    refresh_secret_token: process.env.REFRESH_SECRET_TOKEN,
    refresh_expires_time: process.env.REFRESH_EXPIRES_TIME,
  },
  cookies: {
    cookie_expires_time: process.env.COOKIE_EXPIRES_TIME,
  },
  cloudinary: {
    cloudinary_name: process.env.CLOUDINARY_CLOUD_NAME,
    cloudinary_key: process.env.CLOUDINARY_API_KEY,
    cloudinary_secret: process.env.CLOUDINARY_API_SECRET,
  },
  nodemailer: {
    smtp_host: process.env.SMTP_HOST,
    smtp_user: process.env.SMTP_USER,
    smtp_password: process.env.SMTP_PASSWORD,
    smtp_name: process.env.SMTP_FROM_NAME,
    smtp_email: process.env.SMTP_FROM_EMAIL,
  },
  development: {
    api_port: process.env.API_PORT || 5001,
  },
};

export default config;
