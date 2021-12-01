const nodemailer = require("nodemailer");

exports.sendEmail = async (email) => {
    // let {email}=req.body;
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.HOST,
      service: process.env.SERVICE,
      port: 587,
      secure: true,
      auth: {
        user: process.env.USER,
        pass: process.env.PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.USER,
      to: email,
      subject: "No need to wait!",
      text: "The restaurant you are waiting for is open now!",
    });
    return {message:"email sent sucessfully"};
  } catch (error) {
    return {message:error};
  }
};
