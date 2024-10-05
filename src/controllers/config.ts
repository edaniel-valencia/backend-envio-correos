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

    try {
        Config.create({
            Chost: Chost,
            Cport: Cport,
            Csecure: Csecure,
            Cauth: Cauth,
            Cpass: Cpass,
            Cstatus: 1
        })
        res.status(200).json('Exitoso');

    } catch (error) {

        console.log("Error al enviar el mensaje", error);

    }

}


export const Delete = async (req: Request, res: Response) => {

    const { Cid } = req.params

    const config = await Config.findOne({ where: { Cid: Cid } })

    if (!config) {
        return res.status(404).json({
            msg: `No se ha encontrado registro con el Id ${Cid}`
        })
    }

    try {
        
        Config.destroy({where: { Cid: Cid }})

        return res.status(200).json({
            msg: `Elimado Exitosa con Id ${Cid}`
        })

    } catch (error) {

        return res.status(500).json({
            msg: `Erro al actualizar el registro con Id ${Cid}`
        })
        
    }

}


export const Update = async (req: Request, res: Response) => {

    const { Cid } = req.params
    const { Chost, Cport, Csecure, Cauth, Cpass } = req.body
    console.log(req.body);

    const config = await Config.findOne({ where: { Cid: Cid } })

    if (!config) {
        return res.status(404).json({
            msg: `No se ha encontrado registro con el Id ${Cid}`
        })
    }

    try {
        Config.update(
            {
                Chost: Chost,
                Cport: Cport,
                Csecure: Csecure,
                Cauth: Cauth,
                Cpass: Cpass,
                Cstatus: 1
            }, {
            where: { Cid: Cid }
        }
        )
        return res.status(200).json({
            msg: `Actualización Exitosa con Id ${Cid}`
        })
    } catch (error) {

        return res.status(500).json({
            msg: `Erro al actualizar el registro con Id ${Cid}`
        })
    }

}

