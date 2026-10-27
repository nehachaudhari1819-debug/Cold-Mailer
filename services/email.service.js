import nodemailer from "nodemailer";

export const getTransporter = () => {
    const port = Number(process.env.SMTP_PORT) || 587;
    return nodemailer.createTransport({
        host: process.env.SMTP_HOST || "smtp.gmail.com",
        port,
        secure: port === 465,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS
        }
    });
};

export const sendEmail = async (to, subject, body, resumeUrl = null) => {
    const transporter = getTransporter();
    return await transporter.sendMail({
        from: process.env.SMTP_USER,
        to,
        subject,
        text: body,
        attachments: resumeUrl ? [{ filename: "Resume.pdf", path: resumeUrl }] : []
    });
};