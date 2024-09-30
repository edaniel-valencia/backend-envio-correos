import { Router } from "express";
import { ReadUserAll, ReadUserAllId,  } from "../controllers/user";
import multer from "multer";
import { storage } from '../midlewares/storage';
import { ReadCategoryAll } from "../controllers/category";


const router = Router();
const upload = multer({ storage });

router.get("/api/category/readAll/", ReadCategoryAll)




export default router