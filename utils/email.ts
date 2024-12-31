import nodemailer from 'nodemailer';

export const sendEmail = async (to: string, subject: string, text: string) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.GOOGLE_EMAIL,
            pass: process.env.GOOGLE_PASS,
        },
    });

    await transporter.sendMail({
        from: process.env.GOOGLE_EMAIL,
        to,
        subject,
        text,
    });
};