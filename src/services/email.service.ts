import config from 'config';
import { logger } from 'config/logger';
import { getEmailForgotPassword } from 'email-templates/forgot-password';
import { getEmailVerifyAccount } from 'email-templates/verify-email';
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

export const sendEmail = async (
  to: string,
  subject: string,
  content: string,
) => {
  try {
    logger.info(`Send mail to ${to}`);
    const mailOptions = {
      from: `ThBE <${config.email.from}>`,
      to: to,
      subject: subject,
      html: content,
    };
    await transport.sendMail(mailOptions);
    logger.info(`Send mail to ${to} success`);
  } catch (error) {
    logger.error(`Send mail to ${to} failed ${error}`);
  }
};

export const sendResetPasswordEmail = async (to: string, token: string) => {
  const subject = 'Yêu cầu đặt lại mật khẩu';
  const resetPasswordUrl = `${config.webAppUrl}/auth/reset-password?token=${token}`;
  const text = getEmailForgotPassword(resetPasswordUrl);
  await sendEmail(to, subject, text);
};

export const sendVerificationEmail = async (to: string, token: string) => {
  const subject = 'Xác thực tài khoản';
  const verificationEmailUrl = `${config.webAppUrl}/auth/verify-email?token=${token}`;
  const text = getEmailVerifyAccount(verificationEmailUrl);
  await sendEmail(to, subject, text);
};
