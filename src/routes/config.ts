import { Router } from "express";
import { Create, Delete, Read, Update } from "../controllers/config";

const router = Router();

router.post("/api/config/create", Create)
router.get("/api/config/read", Read)
router.patch("/api/config/update/:Cid", Update)
router.delete("/api/config/delete/:Cid", Delete)

export default router