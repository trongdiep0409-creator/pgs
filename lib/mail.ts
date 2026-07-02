import nodemailer from 'nodemailer';

interface ContactData {
  name: string;
  email: string; // email of the person who filled the form
  phone: string;
  message: string;
}

/**
 * Send email notification to the site admin and an acknowledgment copy to the submitter.
 * Ensure the following environment variables are defined in .env.local:
 *   EMAIL_HOST, EMAIL_PORT, EMAIL_USER, EMAIL_PASS, EMAIL_TO
 * If using Gmail, set EMAIL_HOST=smtp.gmail.com, EMAIL_PORT=465, and generate an App Password.
 */
export async function sendContactEmail(data: ContactData) {
  const {
    EMAIL_HOST,
    EMAIL_PORT,
    EMAIL_USER,
    EMAIL_PASS,
    EMAIL_TO,
    EMAIL_FROM,
  } = process.env;

  if (!EMAIL_HOST || !EMAIL_PORT || !EMAIL_USER || !EMAIL_PASS || !EMAIL_TO) {
    console.warn('Missing email environment variables; email not sent.');
    return;
  }

  const transporter = nodemailer.createTransport({
    host: EMAIL_HOST,
    port: Number(EMAIL_PORT),
    secure: Number(EMAIL_PORT) === 465, // true for 465, false for other ports
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASS,
    },
  });

  const fromAddress = EMAIL_FROM || EMAIL_USER;

  const adminMail = {
    from: fromAddress,
    to: EMAIL_TO,
    subject: '📝 Thông tin liên hệ mới từ website',
    html: `<p><strong>Họ và tên:</strong> ${data.name}</p>
           <p><strong>Email:</strong> ${data.email}</p>
           <p><strong>Số điện thoại:</strong> ${data.phone}</p>
           <p><strong>Nội dung:</strong><br/>${data.message.replace(/\n/g, '<br/>')}</p>`,
  };

  const userMail = {
    from: fromAddress,
    to: data.email,
    subject: '✅ Chúng tôi đã nhận được yêu cầu của bạn',
    html: `<p>Chào ${data.name},</p>
           <p>Cảm ơn bạn đã liên hệ với chúng tôi. Chúng tôi sẽ phản hồi sớm nhất có thể.</p>
           <p><strong>Chi tiết bạn đã gửi:</strong></p>
           <ul>
             <li><strong>Email:</strong> ${data.email}</li>
             <li><strong>Số điện thoại:</strong> ${data.phone}</li>
             <li><strong>Nội dung:</strong> ${data.message.replace(/\n/g, '<br/>')}</li>
           </ul>
           <p>Trân trọng,<br/>PGS Agency</p>`,
  };

  try {
    await Promise.all([
      transporter.sendMail(adminMail),
      transporter.sendMail(userMail),
    ]);
    console.log('✅ Emails sent successfully');
  } catch (err) {
    console.error('❌ Error sending email:', err);
  }
}
