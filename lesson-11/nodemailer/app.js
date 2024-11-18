import nodemailer from "nodemailer";
import "dotenv/config";

const {UKR_NET_PASSWORD, UKR_NET_FROM} = process.env;

const nodemailerConfig = {
    host: "smtp.ukr.net",
    port: 465,
    secure: true,
    auth: {
        user: UKR_NET_FROM,
        pass: UKR_NET_PASSWORD
    }
};

const transport = nodemailer.createTransport(nodemailerConfig);

const email = {
    to: "ridata5701@exoular.com",
    from: UKR_NET_FROM,
    subject: "Test email",
    html: "<strong>Test email</strong>",
}

transport.sendMail(email)
    .then(()=> console.log("Email send successfully"))
    .catch(error => console.log(error.message));