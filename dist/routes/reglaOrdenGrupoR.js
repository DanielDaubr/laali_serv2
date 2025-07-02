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
const reglaOrdenGrupo_model_1 = require("../models/reglaOrdenGrupo.model");
const autenticacion_1 = require("../middlewares/autenticacion");
const reglaOrdenRoutes = (0, express_1.Router)();
// Obtener todas las reglas de orden
reglaOrdenRoutes.get('/', (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const reglas = yield reglaOrdenGrupo_model_1.ReglaOrdenGrupo.find().sort({ orden: 1 });
        res.status(200).json({ ok: true, reglas });
    }
    catch (error) {
        res.status(500).json({ ok: false, message: 'Error al obtener reglas de orden', error });
    }
}));
// Obtener regla por ID
reglaOrdenRoutes.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const regla = yield reglaOrdenGrupo_model_1.ReglaOrdenGrupo.findById(req.params.id);
        if (!regla)
            return res.status(404).json({ ok: false, message: 'Regla no encontrada' });
        res.status(200).json({ ok: true, regla });
    }
    catch (error) {
        res.status(500).json({ ok: false, message: 'Error al obtener la regla', error });
    }
}));
// Crear nueva regla
reglaOrdenRoutes.post('/create', autenticacion_1.verificarTokenAdmin, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    try {
        const nueva = yield reglaOrdenGrupo_model_1.ReglaOrdenGrupo.create(data);
        res.status(201).json({ ok: true, regla: nueva });
    }
    catch (error) {
        res.status(400).json({ ok: false, message: 'Error al crear regla', error });
    }
}));
// Actualizar regla
reglaOrdenRoutes.put('/:id', autenticacion_1.verificarTokenAdmin, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const actualizada = yield reglaOrdenGrupo_model_1.ReglaOrdenGrupo.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!actualizada)
            return res.status(404).json({ ok: false, message: 'Regla no encontrada' });
        res.status(200).json({ ok: true, regla: actualizada });
    }
    catch (error) {
        res.status(500).json({ ok: false, message: 'Error al actualizar regla', error });
    }
}));
// Eliminar regla
reglaOrdenRoutes.delete('/:id', autenticacion_1.verificarTokenAdmin, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const eliminada = yield reglaOrdenGrupo_model_1.ReglaOrdenGrupo.findByIdAndDelete(req.params.id);
        if (!eliminada)
            return res.status(404).json({ ok: false, message: 'Regla no encontrada' });
        res.status(200).json({ ok: true, message: 'Regla eliminada' });
    }
    catch (error) {
        res.status(500).json({ ok: false, message: 'Error al eliminar regla', error });
    }
}));
exports.default = reglaOrdenRoutes;
