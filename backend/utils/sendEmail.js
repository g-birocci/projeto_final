const nodemailer = require("nodemailer");

const sendEmail = async (to, subject, text) => {
  // ⚙️ Cria o transporte do e-mail
  const transporter = nodemailer.createTransport({
    service: "gmail", // pode usar outro: outlook, yahoo, etc.
    auth: {
      user: process.env.EMAIL_USER, // teu e-mail
      pass: process.env.EMAIL_PASS, // senha do app
    },
  });

  const mailOptions = {
    from: `"EcoDoa" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    text,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Email enviado para ${to}`);
  } catch (error) {
    console.error("Erro ao enviar email:", error);
    throw new Error("Falha ao enviar o e-mail");
  }
};

module.exports = sendEmail;
