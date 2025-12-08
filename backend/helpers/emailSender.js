
const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.API_KEY);


const sendEmail = async (email, verificationCode, subject, text) => {
    const message = {
        to: email,
        from: {
            name: "Verification Code, AmitShop",
            email: "edzaryan@gmail.com"
        },
        subject: subject,
        text: text,
        html: `<div>Your verification code is: <strong>${verificationCode}</strong></div>`
    };

    try {
        await sgMail.send(message);
        console.log(`Email sent to ${email}`);
        return true;
    } catch (error) {
        console.error("Error sending email:", error);
        return false;
    }
};


module.exports = sendEmail;
