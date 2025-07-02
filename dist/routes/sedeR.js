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
const sede_model_1 = require("../models/sede.model");
const autenticacion_1 = require("../middlewares/autenticacion");
const sedeRoutes = (0, express_1.Router)();
// Obtener todas las sedes
sedeRoutes.get('/', (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sedes = yield sede_model_1.Sede.find().populate('canchas');
        res.status(200).json({ ok: true, sedes });
    }
    catch (error) {
        res.status(500).json({ ok: false, message: 'Error al obtener sedes', error });
    }
}));
// Obtener sede por ID
sedeRoutes.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sede = yield sede_model_1.Sede.findById(req.params.id).populate('canchas');
        if (!sede)
            return res.status(404).json({ ok: false, message: 'Sede no encontrada' });
        res.status(200).json({ ok: true, sede });
    }
    catch (error) {
        res.status(500).json({ ok: false, message: 'Error al obtener sede', error });
    }
}));
// Crear sede
sedeRoutes.post('/create', autenticacion_1.verificarTokenAdmin, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        const nueva = yield sede_model_1.Sede.create(data);
        res.status(201).json({ ok: true, sede: nueva });
    }
    catch (error) {
        res.status(400).json({ ok: false, message: 'Error al crear sede', error });
    }
}));
// Actualizar sede
sedeRoutes.put('/:id', autenticacion_1.verificarTokenAdmin, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const actualizada = yield sede_model_1.Sede.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!actualizada)
            return res.status(404).json({ ok: false, message: 'Sede no encontrada' });
        res.status(200).json({ ok: true, sede: actualizada });
    }
    catch (error) {
        res.status(500).json({ ok: false, message: 'Error al actualizar sede', error });
    }
}));
// Eliminar sede
sedeRoutes.delete('/:id', autenticacion_1.verificarTokenAdmin, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const eliminada = yield sede_model_1.Sede.findByIdAndDelete(req.params.id);
        if (!eliminada)
            return res.status(404).json({ ok: false, message: 'Sede no encontrada' });
        res.status(200).json({ ok: true, message: 'Sede eliminada correctamente' });
    }
    catch (error) {
        res.status(500).json({ ok: false, message: 'Error al eliminar sede', error });
    }
}));
exports.default = sedeRoutes;
