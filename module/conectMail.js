const { request, response } = require('express');
const nodemailer = require('nodemailer');

function conectToMail() {
    // Crea el transportador con la configuración requerida para Gmail
    // cambia el usuario y pasa!
    return transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true, // use SSL
        auth: {
            user: 'cdmtores33@gmail.com',
            pass: 'svtsyiiqaxehzppb'
        }
    });
}


// }
function sendMail(req = request, res = response) {
    let body = req.body;
    // configurar datos de correo electrónico
    var mailOptions = {
        from: '"Tiempo restante" <cdmtores33@gmail.com>', // dirección del remitente (quién envía)
        to: body.mail, // lista de receptores (quién recibe)
        subject: body.asunto, // Línea de asunto
        text: body.text, //cuerpo de texto plano
        html: body.html // cuerpo html
    };
    // carlosalcuadrado2@gmail.com
    // enviar correo con objeto de transporte definido

    conectToMail().sendMail(mailOptions, function (error, info) {
        if (error) {
            return res.json({
                ok: false,
                message: error.message
            });
        }
        return res.json({
            ok: true,
            message: info
        });
    });

}

module.exports = {
    sendMail
}