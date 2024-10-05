import { Request, Response } from "express";
import { Marketing } from "../models/marketing";



export const Read = async (req: Request, res: Response) => {


   try {

    const listMarketing = await Marketing.findAll({});


    if(listMarketing.length === 0){
        return res.status(404).json({msg: "No se han encontrado mensaje"})
    }
    res.json(listMarketing);


   } catch (error) {
    return res.status(500).json({msg: "Error al encontrado usuarios", error})

   }
}



