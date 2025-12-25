import nodemailer from 'nodemailer';

export const sendVerificationEmail = async (toEmail, token) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  const verifyLink = `${process.env.BASE_URL}/api/auth/verify-email/${token}`;

  await transporter.sendMail({
    from: `"E-Commerce App" <${process.env.EMAIL_USER}>`,
    to: toEmail,
    subject: 'Verify your email',
    html: `
      <h3>Email Verification</h3>
      <p>Click the link below to verify your email:</p>
      <a href="${verifyLink}">Verify Email</a>
    `
  });
};
