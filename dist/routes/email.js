"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const email_1 = require("../controllers/email");
const storage_1 = require("../midlewares/storage");
const multer_1 = __importDefault(require("multer"));
const router = (0, express_1.Router)();
const upload = (0, multer_1.default)({ storage: storage_1.storage });
router.post("/api/email/send", email_1.SendEmail);
router.post('/api/email/sendMasive', upload.single('image'), email_1.SendEmailMasive);
exports.default = router;
