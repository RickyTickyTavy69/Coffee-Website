let nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,          
    secure: 'ssl',          
    auth: {
      user: "bakirovartem69@gmail.com",
      pass: "wgkrmgyxxbfuheqw",
    }
});


let mailer = message => {
  transporter.sendMail(message, (err, info) => {
     if(err) return console.log(err);
      console.log('Email sent: ', info);
    })
}

module.exports = mailer;