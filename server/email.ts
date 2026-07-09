import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

interface MailOptions {
    to: string;
    subject: string;
    html: string;
}

const isEmailConfigured = process.env.EMAIL_HOST && process.env.EMAIL_HOST !== 'smtp.example.com' && process.env.EMAIL_PORT && process.env.EMAIL_USER && process.env.EMAIL_PASS && process.env.EMAIL_FROM;

if (!isEmailConfigured) {
    console.warn('Email service is not configured. Missing one or more of: EMAIL_HOST, EMAIL_PORT, EMAIL_USER, EMAIL_PASS, EMAIL_FROM. Password reset emails will not be sent.');
}

const transporter = isEmailConfigured ? nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: parseInt(process.env.EMAIL_PORT!, 10),
    secure: parseInt(process.env.EMAIL_PORT!, 10) === 465, // true for 465, false for other ports
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
}) : null;

export async function sendEmail(options: MailOptions): Promise<void> {
    if (!transporter) {
        console.error('Email not sent: Email service is not configured in .env file.');
        // In development, you might want to log the email content instead of sending it
        console.log('--- DEV EMAIL (NOT SENT) ---');
        console.log(`To: ${options.to}`);
        console.log(`Subject: ${options.subject}`);
        console.log('----------------------------');
        return;
    }

    await transporter.sendMail({
        from: process.env.EMAIL_FROM,
        ...options,
    });
}