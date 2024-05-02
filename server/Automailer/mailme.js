import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import schedule from 'node-schedule'
dotenv.config(); // Load environment variables from .env file

// Create a transporter object using SMTP transport
const createMail = () => {
    let transporter = nodemailer.createTransport({
        service: 'gmail', // Use lowercase 'gmail'
        auth: {
            user: process.env.GMAIL,
            pass: process.env.PASS
        },
        port: 465,
        host: 'smtp.gmail.com'
    });

    // Email content
    let mailOptions = {
        from: process.env.GMAIL,
        to: 'darshanpatel2923@gmail.com',
        subject: 'Test Email',
        text: 'Hello, this is a test email from Nodemailer!'
    };

    // Send email
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

schedule.scheduleJob('39 20 * * *', () => { // "0 22 * ​​* 5" runs every Friday at 22:00
    console.log('Weekly email sending scheduled.');
    createMail();
});