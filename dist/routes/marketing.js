"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const marketing_1 = require("../controllers/marketing");
const router = (0, express_1.Router)();
router.get("/api/marketing/readAll/", marketing_1.Read);
exports.default = router;
