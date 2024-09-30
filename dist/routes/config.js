"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const config_1 = require("../controllers/config");
const router = (0, express_1.Router)();
router.post("/api/config/create", config_1.Create);
router.get("/api/config/read", config_1.Read);
exports.default = router;
