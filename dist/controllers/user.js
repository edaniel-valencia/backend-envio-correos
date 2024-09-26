"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CargarDatosOfExcel = exports.ReadUserAllId = exports.ReadUserAll = exports.ReadUserPublic = void 0;
const user_1 = require("../models/user");
const category_1 = require("../models/category");
const XLSX = __importStar(require("xlsx"));
const ReadUserPublic = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const listUser = yield user_1.User.findAll();
    res.json(listUser);
});
exports.ReadUserPublic = ReadUserPublic;
const ReadUserAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { categoryId } = req.params;
    try {
        const listUser = yield user_1.User.findAll({
            include: [{
                    model: category_1.Category,
                    as: 'categories'
                }]
        });
        if (listUser.length === 0) {
            return res.status(404).json({ msg: "No se han encontrado usuarios" });
        }
        res.json(listUser);
    }
    catch (error) {
        return res.status(500).json({ msg: "Error al encontrado usuarios", error });
    }
});
exports.ReadUserAll = ReadUserAll;
const ReadUserAllId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { categoryId } = req.params;
    try {
        const listUser = yield user_1.User.findAll({
            where: { CategoryId: categoryId },
            include: [{
                    model: category_1.Category,
                    as: 'categories'
                }]
        });
        if (listUser.length === 0) {
            return res.status(404).json({ msg: "No se han encontrado usuarios" });
        }
        res.json(listUser);
    }
    catch (error) {
        return res.status(500).json({ msg: "Error al encontrado usuarios", error });
    }
});
exports.ReadUserAllId = ReadUserAllId;
const CargarDatosOfExcel = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No se ha subido ningun archivo' });
        }
        const fileBuffer = req.file.buffer;
        const workBook = XLSX.read(fileBuffer, { type: "buffer" });
        const workSheet = workBook.Sheets[workBook.SheetNames[0]];
        const data = XLSX.utils.sheet_to_json(workSheet, { header: 1 });
        const users = data.slice(1).map((row) => ({
            Uname: row[0],
            Ulastname: row[1],
            Uemail: row[2],
            Uwhatsapp: row[3],
            CategoryId: row[4],
            Ustatus: 1
        }));
        yield user_1.User.bulkCreate(users);
        res.status(200).json({ msg: 'Mensaje enviado exitosamente' });
    }
    catch (error) {
        console.log("Error al enviar el mensaje", error);
        res.status(500).json({ error: 'Error al enviar el mensaje' });
    }
});
exports.CargarDatosOfExcel = CargarDatosOfExcel;
