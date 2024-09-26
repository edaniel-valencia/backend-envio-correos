import { Request, Response } from "express";
import nodemailer from 'nodemailer'
import { User } from "../models/user";
import fs from 'fs';
import path from 'path';
import { Category } from "../models/category";

const transporter = nodemailer.createTransport({
    host: 'smtp.office365.com' || 'smtp.live.com',
    port: 587,
    secure: false,
    auth: {
        user: 'daniblack10.00@hotmail.com',
        pass: '3dxuy3lvxl398@HM'
    }
})



export const SendEmail = async (req: Request, res: Response) => {

    console.log("Estoy aca");

    const { name, lastname, whatsapp, email, subject, message } = req.body
    console.log(req.body);


    const from = 'daniblack10.00@hotmail.com';
    const to =  'tsoftwareecuador@gmail.com';
    try {

        const mailOptions = {
            to: to,
            from: from,
            subject: subject + ' CORREO DESDE LA WEB',
            // text:  'Hola desde Tsoftware Ecuador, Envio de Correo con Angular y TypeScript!'
            html: `
            <div style="font-family: Arial, sans-serif; color: #333;">
                <img src="https://www.software.com.ec/assets/logo.f8e0acb1.png" width="25%">
                <h1 style="color: #007bff;">¡MENSAJE DESDE EL SITIO WEB!</h1>
                <p>Te ha enviado este correo ${name} ${lastname}, y esto son los contactos mas comunicarse:
                <br><b>Correo: </b> ${email}
                <br><b>Whatssap: </b> ${whatsapp}
                <br><b>Mensaje: </b>${message}</p>
                <img src="https://img.freepik.com/vector-premium/conjunto-ilustraciones-3d-gestion-tiempo-caracter-usando-recordatorio-notificacion-seguimiento-tiempo_808510-1476.jpg" width="25%">
                <p style="font-size: 14px; color: #555;">Saludos,<br>El equipo de soporte</p>
            </div>
        `,
        }


        const info = await transporter.sendMail(mailOptions);
        console.log("Mensaje enviado exitosamente", info.response);
        res.status(200).json({ msg: 'Mensaje enviado exitosamente', info: info.response, to: to, from: from });
        User.create({
            Uname: name,
            Ulastname: lastname,
            Uemail: email,
            Uwhatsapp: whatsapp,
            CategoryId: 1,
            Ustatus: 1
        })

    } catch (error) {

        console.log("Error al enviar el mensaje", error);
        res.status(500).json({ error: 'Error al enviar el mensaje' });

    }

}


const getUser = async () => {
    const users = await User.findAll()
    return users
}

export const SendEmailMasive = async (req: Request, res: Response) => {

    const { title, message } = req.body

    const file = req.file;

    console.log("Estoy aca", req.body);
    
    if (!file) {
        return res.status(400).json({
            msg: "No se subió ninguna imagen"
        });
    }

  
  
    const uploadPath = path.join('./assets/marketing');

    if (!fs.existsSync(uploadPath)) {
        fs.mkdirSync(uploadPath, { recursive: true });
    }

    const fileName = `image-marketing-TSE-${Date.now()}.${file.mimetype.split('/')[1]}`;
    const filePath = path.join(uploadPath, fileName);

    fs.writeFileSync(filePath, file.buffer);

    const imageURL = `http://localhost:3001/assets/marketing/${fileName}`
    const from = 'daniblack10.00@hotmail.com';

    try {

        const listEmail = await getUser()

        if(listEmail.length === 0){
            res.status(404).json({ msg: 'No se han encontrado datos' });
        }

        for (const user of listEmail) {

            const email = user.get('Uemail') as string
            const name = user.get('Uname') as string
            const lastname = user.get('Ulastname') as string

            const mailOptions = {
                to: email,
                from: from,
                subject: 'Edaniel Valencia te invita a '+title,
                // text:  'Hola desde Tsoftware Ecuador, Envio de Correo con Angular y TypeScript!'
                html: `
            <div style="font-family: Arial, sans-serif; color: #333;">
                <img src="https://www.software.com.ec/assets/logo.f8e0acb1.png" width="25%">
                <h1 style="color: #007bff;">¡MENSAJE DESDE EL SITIO WEB!</h1>
                <p>Te ha enviado este correo ${name} ${lastname}, y esto son los contactos mas comunicarse:
                <br><b>Correo: </b> ${email}
                <br><b>Mensaje: </b>${message}</p>                
                <img src="${imageURL}" width="50%">
                <img src="https://img.freepik.com/vector-premium/conjunto-ilustraciones-3d-gestion-tiempo-caracter-usando-recordatorio-notificacion-seguimiento-tiempo_808510-1476.jpg" width="25%">
                <p style="font-size: 14px; color: #555;">Saludos,<br>El equipo de soporte</p>
            </div>
        `,
            }


            const info = await transporter.sendMail(mailOptions);
            console.log("Mensaje enviado exitosamente", info.response);
        }

        res.status(200).json({ msg: 'Mensajes enviados exitosamente'});

    } catch (error) {

        console.log("Error al enviar el mensaje", error);
        res.status(500).json({ error: 'Error al enviar el mensaje' });

    }

}

