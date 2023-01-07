import dotenv from 'dotenv';
dotenv.config();
const MAIL_SETTINGS = {
    service: 'gmail',
    auth: {
        user: process.env.MAIL_EMAIL,
        pass: process.env.MAIL_PASSWORD,
    }
}

import nodemailer from 'nodemailer';
const transporter = nodemailer.createTransport(MAIL_SETTINGS);

export default {
    async sendMail(params) {
        try {
            let info = await transporter.sendMail({
                from: MAIL_SETTINGS.auth.user,
                to: params.to,
                subject: '5Horses Online Academy Registering Verification',
                html: `
      <div
        class="container"
        style="max-width: 90%; margin: auto; padding-top: 20px"
      >
        <h2>5Horses Online Academy,</h2>
        <h4>You have registered an account with this email</h4>
        <p style="margin-bottom: 30px;">Please enter the OTP in our website to confirm this is your email</p>
        <h1 style="font-size: 40px; letter-spacing: 2px; text-align:center;">${params.otp}</h1>
   </div>
    `,
            });
            return info;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
}


