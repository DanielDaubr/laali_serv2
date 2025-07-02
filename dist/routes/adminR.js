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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const admin_model_1 = require("../models/admin.model");
const bcrypt_1 = __importDefault(require("bcrypt"));
const token_1 = __importDefault(require("../classes/token"));
const autenticacion_1 = require("../middlewares/autenticacion");
const adminRoutes = (0, express_1.Router)();
// Ruta de prueba
adminRoutes.get('/prueba', (req, res) => {
    res.json({
        ok: true,
        mje: 'todo ok'
    });
});
// Crear nuevo admin
adminRoutes.post('/create', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const admin = req.body;
    admin.password = bcrypt_1.default.hashSync(req.body.password, 10);
    try {
        const adminDB = yield admin_model_1.Admin.create(admin);
        const tokenadmin = token_1.default.getJwtToken({
            _id: adminDB._id,
            nickname: adminDB.nickname,
            email: adminDB.email,
            celular: adminDB.celular,
        });
        res.status(201).json({ ok: true, token: tokenadmin });
    }
    catch (err) {
        res.status(500).json({ ok: false, message: 'Error al crear admin', err });
    }
}));
// Login de admin
adminRoutes.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nickname, password } = req.body;
    try {
        const adminDB = yield admin_model_1.Admin.findOne({ nickname });
        if (!adminDB) {
            return res.status(400).json({ ok: false, message: 'nickname no válido' });
        }
        const validPassword = bcrypt_1.default.compareSync(password, adminDB.password);
        if (!validPassword) {
            return res.status(400).json({ ok: false, message: 'Contraseña incorrecta' });
        }
        const tokenadmin = token_1.default.getJwtToken({
            _id: adminDB._id,
            nickname: adminDB.nickname,
            email: adminDB.email,
            celular: adminDB.celular,
        });
        res.status(200).json({ ok: true, token: tokenadmin });
    }
    catch (err) {
        res.status(500).json({ ok: false, message: 'Error en login', err });
    }
}));
// Obtener perfil
adminRoutes.get('/profile', autenticacion_1.verificarTokenAdmin, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const admin = yield admin_model_1.Admin.findById(req.admin._id).select('-password');
    res.status(200).json({ ok: true, admin });
}));
// Actualizar perfil
adminRoutes.put('/update', autenticacion_1.verificarTokenAdmin, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nickname, celular, password } = req.body;
    const updateData = {
        nickname,
        celular
    };
    if (password) {
        updateData.password = bcrypt_1.default.hashSync(password, 10);
    }
    try {
        const updatedAdmin = yield admin_model_1.Admin.findByIdAndUpdate(req.admin._id, updateData, { new: true });
        res.status(200).json({ ok: true, admin: updatedAdmin });
    }
    catch (err) {
        res.status(500).json({ ok: false, message: 'Error al actualizar', err });
    }
}));
// Eliminar cuenta
adminRoutes.delete('/delete', autenticacion_1.verificarTokenAdmin, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield admin_model_1.Admin.findByIdAndDelete(req.admin._id);
        res.status(200).json({ ok: true, message: 'Cuenta eliminada' });
    }
    catch (err) {
        res.status(500).json({ ok: false, message: 'Error al eliminar cuenta', err });
    }
}));
exports.default = adminRoutes;
