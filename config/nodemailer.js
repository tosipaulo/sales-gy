const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');
const path = require('path');

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "e8ad5bc25b9581",
        pass: "d1f079afa7b9a9"
    }
});


transport.use('compile', hbs({
    viewEngine: 'handlebars',
    viewPath: path.resolve('./view'),
    extName: '.html'
}))

module.exports = transport