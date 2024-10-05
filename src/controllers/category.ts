import { Request, Response } from "express";
import { User } from "../models/user";
import { Category } from "../models/category";
import * as XLSX from "xlsx";



export const ReadCategoryAll = async (req: Request, res: Response) => {


   try {

    const listCategory = await Category.findAll({});


    if(listCategory.length === 0){
        return res.status(404).json({msg: "No se han encontrado usuarios"})
    }
    res.json(listCategory);


   } catch (error) {
    return res.status(500).json({msg: "Error al encontrado usuarios", error})

   }
}



