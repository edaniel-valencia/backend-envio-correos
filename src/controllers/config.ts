import { Request, Response } from "express";
import { Config } from "../models/config";




export const Read = async (req: Request, res: Response) => {

    const listConfig = await Config.findAll();
    res.json(
        listConfig
    );


}




export const Create = async (req: Request, res: Response) => {



    const { Chost, Cport, Csecure, Cauth, Cpass } = req.body
    console.log(req.body);

    try{
        Config.create({
            Chost: Chost,
            Cport: Cport,
            Csecure: Csecure,
            Cauth: Cauth,
            Cpass: Cpass,
            Cstatus: 1
        })
        res.status(200).json('Exitoso' );

    } catch (error) {

        console.log("Error al enviar el mensaje", error);

    }

}

