require('dotenv').config();
const path = require('path');
const express = require('express');
const rateLimit = require('express-rate-limit');
const nodemailer = require('nodemailer');

const app = express();
app.set('trust proxy', 1);
app.use(express.json({ limit: '10kb' }));
app.use(express.static(path.join(__dirname, 'public')));

const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 5 });

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS }
});

app.post('/api/contact', limiter, async (req, res) => {
  const { name, email, message, website } = req.body || {};
  if (website) return res.json({ ok: true }); // honeypot: bots fill this
  if (!name || !email || !message || !/^\S+@\S+\.\S+$/.test(email) || message.length > 3000) {
    return res.status(400).json({ ok: false });
  }
  try {
    await transporter.sendMail({
      from: `"Portfolio" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_TO || process.env.EMAIL_USER,
      replyTo: email,
      subject: `Portfolio message from ${name}`,
      text: `${message}\n\nFrom: ${name} <${email}>`
    });
    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Running at http://localhost:${port}`));
