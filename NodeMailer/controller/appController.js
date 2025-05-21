const nodemailer = require("nodemailer");
const Mailgen = require("mailgen");

const { EMAIL, PASSWORD } = require('../env');
const { text } = require("express");

    /**Testing Account */
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

    
    transporter.sendMail(message).then((info)  => {
     return res.status(201).json({
        msg: "You should receive a mail",
        info:info.messageId,
        prewiew: nodemailer.getTestMessageUrl(info)

        })
    })
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

    /**Gmail Account */
const getBill = (req, res) => {

    const {userEmail}= req.body;

    let config = {
        service: "gmail",
        auth: {
            user: EMAIL,
            pass: PASSWORD
        }
    }
        
    let transporter = nodemailer.createTransport(config);
    let mailGenerator = new Mailgen({
        theme: "default",
        product: {
            name: "MENTCARE",
            link: "https://MentCare.com/",
            
        },
    });
    let response = {
        body: {
            name: "User",
            intro: [
                "Thank you for signing up! We're so glad to have you with us.",
                "Your mental wellness journey starts now! Explore our features and resources to enhance your well-being.",
                "If you have any questions or feedback, feel free to reach out. You're not alone—our AI chatbot is here to support your mental well-being every step of the way."
              ],
              
            action: {
                instructions: 'Start exploring your AI mental wellness companion here:',
                button: {
                  color: '#22BC66', // Optional styling
                  text: 'Get Started',
                  link: '', // Link to your app or dashboard
                },
              },
            
        },
    };

    let mail = mailGenerator.generate(response)
    let message = {
        from: EMAIL,
        to: userEmail,
        subject: "Welcome to MentCare!",
        html: mail,
    }
    
    transporter.sendMail(message).then(() => {
        return res.status(201).json({
            msg: "You should receive a mail",
            
        })
    }).catch((error) => {
        return res.status(500).json({error})
    })

    

};

module.exports = {
  signup,
  getBill,
};
