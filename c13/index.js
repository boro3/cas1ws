const mailer = require ('./pkg/mailer');


mailer.send(
    ['boro.7597@gmail.com'],
    "WELCOME",
    {
        name:"NewUser"
    }
);

mailer.send(
    ['boro.7597@gmail.com'],
    "RESET_PASSWORD",
    {
        name:"NewUserReset"
    }
)

mailer.send(
    ['boro.7597@gmail.com'],
    "NOTIFICATION",
    {
        name:"UserNotification"
    }
)



