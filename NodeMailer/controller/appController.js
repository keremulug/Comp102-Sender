const nodemailer = require("nodemailer");

const signup = async (req, res) => {
  try {
    let testAccount = await nodemailer.createTestAccount();

    let transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });

    let message = {
      from: '"Fred Foo 👻" <foo@example.com>',
      to: "bar@example.com, baz@example.com",
      subject: "Hello ✔",
      html: "<b>Hello world?</b>",
    };

    let info = await transporter.sendMail(message);

    return res.status(201).json({
      msg: "You should receive a mail",
      
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getBill = (req, res) => {
  res.status(201).json("getBill Successful");
};

module.exports = {
  signup,
  getBill,
};
