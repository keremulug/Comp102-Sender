const nodemailer = require("nodemailer");
const Mailgen = require("mailgen");

const { EMAIL, PASSWORD } = require('../env');

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
            name: "Mailgen",
            link: "https://mailgen.js/",
        },
    });
    let response = {
        body: {
            name:"kerem",
            intro: "Your bill is ready.",
            table: {
                data: [
                    {
                        item: "Apple",
                        description: "Fresh apples from the farm",
                        price: "$2.00",
                    },
                    {
                        item: "Banana",
                        description: "Organic bananas",
                        price: "$1.50",
                    },
                ],
            },
            outro: "Thank you for your business!",
        },
    };

    let mail = mailGenerator.generate(response)
    let message = {
        from: EMAIL,
        to: userEmail,
        subject: "Your Bill",
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
