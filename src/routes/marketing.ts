import { Router } from "express";
import { Read } from "../controllers/marketing";

const router = Router();

router.get("/api/marketing/readAll/", Read)




export default router