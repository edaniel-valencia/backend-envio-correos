"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_1 = require("../controllers/user");
const storage_1 = require("../midlewares/storage");
const multer_1 = __importDefault(require("multer"));
const upload = (0, multer_1.default)({ storage: storage_1.storage });
const router = (0, express_1.Router)();
router.get("/api/user/read", upload.single('uploadFile'), user_1.ReadUser);
exports.default = router;
