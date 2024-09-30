import { Router } from "express";
import { Create, Read } from "../controllers/config";

const router = Router();

router.post("/api/config/create", Create)
router.get("/api/config/read", Read)

export default router