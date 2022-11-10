import env from '@configs/env';
import config from '@configs/env';
import { logger } from '@configs/logger';
import nodemailer from 'nodemailer';

export const transport = nodemailer.createTransport(config.email.smtp);
if (config.env !== 'test') {
  transport
    .verify()
    .then(() => logger.info('Connected to email server'))
    .catch(() =>
      logger.warn(
        'Unable to connect to email server. Make sure you have configured the SMTP options in .env',
      ),
    );
}

export const sendEmail = async (to: string, subject: string, text: string) => {
  const msg = { from: config.email.from, to, subject, text };
  await transport.sendMail(msg);
};

export const sendResetPasswordEmail = async (to: string, token: string) => {
  const subject = 'Reset password';
  // replace this url with the link to the reset password page of your front-end app
  const resetPasswordUrl = `${env.web_app_url}/auth/reset-password?token=${token}`;
  const text = `Dear user,
To reset your password, click on this link: ${resetPasswordUrl}
If you did not request any password resets, then ignore this email.`;
  await sendEmail(to, subject, text);
};

export const sendVerificationEmail = async (to: string, token: string) => {
  const subject = 'Email Verification';
  // replace this url with the link to the email verification page of your front-end app
  const verificationEmailUrl = `${env.web_app_url}/auth/verify-email?token=${token}`;
  const text = `Dear user,
To verify your email, click on this link: ${verificationEmailUrl}
If you did not create an account, then ignore this email.`;
  await sendEmail(to, subject, text);
};
