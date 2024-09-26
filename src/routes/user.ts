import { Router } from "express";
import { CargarDatosOfExcel, ReadUserAll, ReadUserAllId,  } from "../controllers/user";
import multer from "multer";
import { storage } from '../midlewares/storage';


const router = Router();
const upload = multer({ storage });

router.get("/api/user/readAll/", ReadUserAll)
router.get("/api/user/readAllId/:categoryId", ReadUserAllId)


router.post('/api/user/create', upload.single('excel'), CargarDatosOfExcel);


export default router