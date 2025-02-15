import nodemailer from 'nodemailer';

// export const sendEmail = async (to: string, subject: string, text: string) => {
//     const transporter = nodemailer.createTransport({
//         host: 'smtp.gmail.com',
//         port: 465,
//         secure: true,
//         auth: {
//             user: process.env.GOOGLE_EMAIL,
//             pass: process.env.GOOGLE_PASS
//         }
//     });

//     await transporter.sendMail({
//         from: process.env.GOOGLE_EMAIL,
//         to,
//         subject,
//         text,
//     });


// };



async function sendingEmail(emailTemplate: nodemailer.SendMailOptions) {
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: process.env.GOOGLE_EMAIL,
            pass: process.env.GOOGLE_PASS
        }
    });
    const sendMail = transporter.sendMail.bind(transporter);

    if (!emailTemplate.to || !process.env.GOOGLE_EMAIL) {
        return;
    }

    const sent = await new Promise<boolean>(async function (resolve, reject) {
        return sendMail(emailTemplate, async (error, info) => {
            if (error) {
                console.log('Message sent: %s', error);
                return reject(false);
            }
            resolve(true);
        });
    })
    return sent;
}

export default sendingEmail