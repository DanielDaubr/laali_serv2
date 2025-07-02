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
const express_1 = require("express");
const cancha_model_1 = require("../models/cancha.model");
const autenticacion_1 = require("../middlewares/autenticacion");
const canchaRoutes = (0, express_1.Router)();
// Obtener todas las canchas
canchaRoutes.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const canchas = yield cancha_model_1.Cancha.find();
        res.status(200).json({ ok: true, canchas });
    }
    catch (error) {
        res.status(500).json({ ok: false, message: 'Error al obtener canchas', error });
    }
}));
// Buscar canchas por sede
canchaRoutes.get('/sede/:sedeId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { sedeId } = req.params;
    try {
        const canchas = yield cancha_model_1.Cancha.find({ sede: sedeId });
        res.status(200).json({ ok: true, canchas });
    }
    catch (error) {
        res.status(500).json({ ok: false, message: 'Error al buscar canchas por sede', error });
    }
}));
// Obtener una cancha por ID
canchaRoutes.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const cancha = yield cancha_model_1.Cancha.findById(id);
        if (!cancha)
            return res.status(404).json({ ok: false, message: 'Cancha no encontrada' });
        res.status(200).json({ ok: true, cancha });
    }
    catch (error) {
        res.status(500).json({ ok: false, message: 'Error al buscar cancha', error });
    }
}));
// Crear una cancha
canchaRoutes.post('/create', autenticacion_1.verificarTokenAdmin, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    try {
        const nuevaCancha = yield cancha_model_1.Cancha.create(data);
        res.status(201).json({ ok: true, cancha: nuevaCancha });
    }
    catch (error) {
        res.status(400).json({ ok: false, message: 'Error al crear cancha', error });
    }
}));
// Actualizar una cancha
canchaRoutes.put('/:id', autenticacion_1.verificarTokenAdmin, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const updateData = req.body;
    try {
        const canchaActualizada = yield cancha_model_1.Cancha.findByIdAndUpdate(id, updateData, { new: true });
        if (!canchaActualizada)
            return res.status(404).json({ ok: false, message: 'Cancha no encontrada' });
        res.status(200).json({ ok: true, cancha: canchaActualizada });
    }
    catch (error) {
        res.status(500).json({ ok: false, message: 'Error al actualizar cancha', error });
    }
}));
// Eliminar una cancha
canchaRoutes.delete('/:id', autenticacion_1.verificarTokenAdmin, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const canchaEliminada = yield cancha_model_1.Cancha.findByIdAndDelete(id);
        if (!canchaEliminada)
            return res.status(404).json({ ok: false, message: 'Cancha no encontrada' });
        res.status(200).json({ ok: true, message: 'Cancha eliminada' });
    }
    catch (error) {
        res.status(500).json({ ok: false, message: 'Error al eliminar cancha', error });
    }
}));
exports.default = canchaRoutes;
