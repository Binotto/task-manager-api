const sgMail = require('@sendgrid/mail')
const sendgridAPIKey = ""

sgMail.setApiKey(sendgridAPIKey)

sgMail.send({
    to: 'matheus.binotto@hotmail.com',
    from: 'matheus.binotto@hotmail.com',
    subject: 'This is my first creation!',
    text: 'I hope this one actually get to you. Att. Matheus'
})