import { Router } from "express";
import { SendEmail, SendEmailMasive } from "../controllers/email";
import { storage } from '../midlewares/storage';
import multer from 'multer';

const router = Router();
const upload = multer({ storage });

router.post("/api/email/send", SendEmail)
router.post('/api/email/sendMasive', upload.single('image'), SendEmailMasive);

export default router