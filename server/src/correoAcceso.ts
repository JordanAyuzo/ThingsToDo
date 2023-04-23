import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
var email = require("emailjs/email");
console.log("hola");

module.exports = (formulario: any) => {
    const token : string = jwt.sign(formulario.correo, process.env.TOKEN_SECRET || 'prueba');
    console.log(formulario)
var server = email.server.connect(
    {
        user: "recuperacioncrr@gmail.com",
        password: "xlkjbdwkxwfydala",
        host: "smtp.gmail.com",
        ssl: true,
    });
var message: any = {};
message = {
    from: "noreply@example.com",
    to: formulario.correo,
    bcc: "",
    subject: "Recuperación De Contraseña",
    attachment: [
        {
            data: `
                <!DOCTYPE html>
                <html>
                <head>
                    <title>Correo de recuperación</title>
                    <style>
                        /* Agrega aquí tus estilos CSS personalizados */
                        body {
                            margin: 0;
                            padding: 0;
                            font-family: Arial, Helvetica, sans-serif;
                            font-size: 14px;
                            line-height: 1.5;
                            background-color: #f7f7f7;
                            color: #444444;
                        }
                        .container {
                            max-width: 600px;
                            margin: 0 auto;
                        }
                        .header {
                            background-color: #fbad18;
                            padding: 10px;
                            text-align: center;
                        }
                        .header img {
                            max-width: 200px;
                            height: auto;
                        }
                        .content {
                            background-color: #fff;
                            padding: 20px;
                            text-align: center;
                        }
                        h1 {
                            font-size: 24px;
                            font-weight: bold;
                            margin-top: 0;
                            margin-bottom: 20px;
                        }
                        p {
                            margin-bottom: 20px;
                        }
                        .button {
                            display: inline-block;
                            padding: 10px 20px;
                            background-color: #9c9c9c;
                            color: #fff;
                            text-decoration: none;
                            border-radius: 5px;
                        }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <div class="header">
                            <img src="https://cdn-icons-png.flaticon.com/512/980/980496.png" alt="Things To Do" style="max-width: 100px;">
                        </div>
                        <div class="content">
                            <h1>Recuperación de contraseña</h1>
                            <p>¡Hola!</p>
                            <p>Recibimos una solicitud para recuperar la contraseña asociada a esta dirección de correo electrónico. Si no realizaste esta solicitud, puedes ignorar este correo electrónico.</p>
                            <p>Si realizaste esta solicitud, haz clic en el botón de abajo para continuar con el proceso de recuperación de contraseña.</p>
                            <p><a href="http://localhost:4200/recuperar/${token}" class="button">Recuperar contraseña</a></p>
                            <p>Este es un correo electrónico automático. Por favor, no responda a este correo electrónico. Si necesita ayuda, comuníquese con nosotros a través de nuestro sitio web.</p>
                        </div>
                    </div>
                </body>
                </html>
            `,
            alternative: true
        }
    ]
};



server.send(message, function (err: any, message: any) { console.log(err); });
}
