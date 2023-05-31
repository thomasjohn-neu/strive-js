// import  nodemailer from 'nodemailer';

// // create reusable transporter object using the default SMTP transport
// export let transporter = nodemailer.createTransport({
//     host: 'smtp.gmail.com',
//     port: 465,
//     secure: true, // use SSL
//     auth: {
//         user: 'strive6150@gmail.com',
//         pass: 'strive6150admin'
//     }
// });

// // setup email data
// export let mailOptions = {
//     from: 'strive6150@gmail.com',
//     to: 'thomasjohn9294@gmail.com.com',
//     subject: 'Invitation to join Strive', 
//     text: 'Hi, you have been invited to join our app!', 
//     html: '<b>Hi,</b><br><p>You have been invited to join our app!</p>' // html body
// };

// // send mail with defined transport object
// transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {
//         console.log(error);
//     } else {
//         console.log('Email sent: ' + info.response);
//     }
// });

