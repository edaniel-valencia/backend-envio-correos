"use strict";
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
exports.Create = exports.Read = void 0;
const config_1 = require("../models/config");
const Read = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const listConfig = yield config_1.Config.findAll();
    res.json(listConfig);
});
exports.Read = Read;
const Create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { Chost, Cport, Csecure, Cauth, Cpass } = req.body;
    console.log(req.body);
    try {
        config_1.Config.create({
            Chost: Chost,
            Cport: Cport,
            Csecure: Csecure,
            Cauth: Cauth,
            Cpass: Cpass,
            Cstatus: 1
        });
        res.status(200).json('Exitoso');
    }
    catch (error) {
        console.log("Error al enviar el mensaje", error);
    }
});
exports.Create = Create;
