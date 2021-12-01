const nodemailer = require("nodemailer");

exports.sendEmail = async (email,restaurant) => {
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
      subject: ` ${restaurant}: No need to wait!`,
      text: `Quick! Right now, there isn't a long wait for ${restaurant}, so we say go now and eat up!`,
    });
    return {message:"email sent sucessfully"};
  } catch (error) {
    return {message:error};
  }
};
