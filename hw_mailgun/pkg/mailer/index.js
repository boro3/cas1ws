var mailgun = require('mailgun.js');
const cfg = require('./../config');
const fs = require('fs');

const send = (to, type, data) => {

    var mg = mailgun.client({
        username: 'api',
        key: cfg.get('mailer').key
    });

    let content = mailContent(type, data);

    let msg = {
        from: `My App Email <mailgun@${cfg.get('mailer').domain}>`,
        to: to,
        subject: content.subject,
        text: content.text,
        html: content.html
    };
    console.log(msg);
    // mg.messages.create(cfg.get('mailer').domain, msg)
    //     .then(msg => console.log(msg)) // logs response data
    //     .catch(err => console.log(err)); // logs any error
};

const mailContent = (type, data) => {
    let types = {
        "WELCOME": {
            subject: "Welcome to My App",
            text: "Welcome to my App. Please open this Email in a better client!"
        },
        "RESET_PASSWORD": {
            subject: "My App Password Reset!",
            text: "Welcome to my App. Please open this Email in a better client!"
        },
        "NOTIFICATION": {
            subject: "My App Password Reset!",
            text: "Welcome to my App. Please open this Email in a better client!"
        }
    };

    let filepath = `${__dirname}/../mail_templates/${type}.html`;
    let tpl = fs.readFileSync(filepath, 'utf8');

    for (let i in data) {
        let re = new RegExp(`\{${i}\}`, 'g');
        tpl = tpl.replace(re, data[i]);
    }
    return {
        subject: types[type].subject,
        text: types[type].text,
        html: tpl
    };
};

module.exports = {
    send
};

