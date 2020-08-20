require('dotenv').config();
const Nodemailer = require('nodemailer');


function mail_otp(payload){

    let transporter = Nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD,
        }
    })
  
    let mailOptions = {
        from: 'iisparkplugiiog@gmail.com',
        to: payload.reciepient,
        cc: 'iisparkplugiiog@gmail.com',
        subject: 'OTP',
        text: `HERE IS YOUR OTP:${payload.otp}`
    }

    transporter.sendMail(mailOptions, function(err, data){
        if (err){
            console.log(err)
        } else {
            console.log('Email sent!')
        }
    })
}

module.exports = mail_otp