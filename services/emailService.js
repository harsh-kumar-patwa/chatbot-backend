const nodemailer = require('nodemailer');
const { google } = require('googleapis');
require('dotenv').config();

const OAuth2 = google.auth.OAuth2;

const oauth2Client = new OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    "https://developers.google.com/oauthplayground"
);

oauth2Client.setCredentials({
    refresh_token: process.env.REFRESH_TOKEN
});

const accessToken = oauth2Client.getAccessToken();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        type: 'OAuth2',
        user: process.env.EMAIL_USER,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN,
        accessToken: accessToken
    }
});

const sendConfirmationEmail = async (email, bookingDetails) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Booking Confirmation - Bot9 Reserve',
        text: `Dear ${bookingDetails.fullName},

Thank you for booking with Bot9 Reserve! Here are your booking details:

Booking ID: ${bookingDetails.bookingId}
Room: ${bookingDetails.roomName}
Number of Nights: ${bookingDetails.nights}
Total Price: ${bookingDetails.totalPrice}

We look forward to your stay!

Best regards,
Bot9 Reserve Team`
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully');
    } catch (error) {
        console.error('Error sending email:', error);
    }
};

module.exports = { sendConfirmationEmail };
