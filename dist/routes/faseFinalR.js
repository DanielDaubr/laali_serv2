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
const faseFinal_model_1 = require("../models/faseFinal.model");
const autenticacion_1 = require("../middlewares/autenticacion");
const faseFinalRoutes = (0, express_1.Router)();
// Obtener todas las fases finales
faseFinalRoutes.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const fases = yield faseFinal_model_1.FaseFinal.find()
            .populate('torneoId', 'nombre')
            .populate('categoriaId', 'nombre')
            .populate('partidos');
        res.status(200).json({ ok: true, fases });
    }
    catch (error) {
        res.status(500).json({ ok: false, message: 'Error al obtener fases finales', error });
    }
}));
// Obtener una por ID
faseFinalRoutes.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const fase = yield faseFinal_model_1.FaseFinal.findById(req.params.id)
            .populate('torneoId')
            .populate('categoriaId')
            .populate('partidos');
        if (!fase)
            return res.status(404).json({ ok: false, message: 'Fase final no encontrada' });
        res.status(200).json({ ok: true, fase });
    }
    catch (error) {
        res.status(500).json({ ok: false, message: 'Error al obtener fase final', error });
    }
}));
// Crear una nueva fase final
faseFinalRoutes.post('/create', autenticacion_1.verificarTokenAdmin, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    try {
        const nuevaFase = yield faseFinal_model_1.FaseFinal.create(data);
        res.status(201).json({ ok: true, fase: nuevaFase });
    }
    catch (error) {
        res.status(400).json({ ok: false, message: 'Error al crear fase final', error });
    }
}));
// Actualizar fase final
faseFinalRoutes.put('/:id', autenticacion_1.verificarTokenAdmin, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const fase = yield faseFinal_model_1.FaseFinal.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!fase)
            return res.status(404).json({ ok: false, message: 'Fase final no encontrada' });
        res.status(200).json({ ok: true, fase });
    }
    catch (error) {
        res.status(500).json({ ok: false, message: 'Error al actualizar fase final', error });
    }
}));
// Eliminar fase final
faseFinalRoutes.delete('/:id', autenticacion_1.verificarTokenAdmin, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const fase = yield faseFinal_model_1.FaseFinal.findByIdAndDelete(req.params.id);
        if (!fase)
            return res.status(404).json({ ok: false, message: 'Fase final no encontrada' });
        res.status(200).json({ ok: true, message: 'Fase final eliminada' });
    }
    catch (error) {
        res.status(500).json({ ok: false, message: 'Error al eliminar fase final', error });
    }
}));
// Buscar por torneo
faseFinalRoutes.get('/torneo/:torneoId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const fases = yield faseFinal_model_1.FaseFinal.find({ torneoId: req.params.torneoId })
            .populate('categoriaId', 'nombre')
            .populate('partidos');
        res.status(200).json({ ok: true, fases });
    }
    catch (error) {
        res.status(500).json({ ok: false, message: 'Error al buscar por torneo', error });
    }
}));
// Buscar por torneo y categoría
faseFinalRoutes.get('/torneo/:torneoId/categoria/:categoriaId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { torneoId, categoriaId } = req.params;
    try {
        const fases = yield faseFinal_model_1.FaseFinal.find({ torneoId, categoriaId })
            .populate('partidos');
        res.status(200).json({ ok: true, fases });
    }
    catch (error) {
        res.status(500).json({ ok: false, message: 'Error al buscar por torneo y categoría', error });
    }
}));
exports.default = faseFinalRoutes;
