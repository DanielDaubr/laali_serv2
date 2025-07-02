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
const partido_model_1 = require("../models/partido.model");
const autenticacion_1 = require("../middlewares/autenticacion");
const partidoRoutes = (0, express_1.Router)();
// Obtener todos los partidos
partidoRoutes.get('/', (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const partidos = yield partido_model_1.Partido.find()
            .populate('equipoA', 'nombre')
            .populate('equipoB', 'nombre')
            .populate('cancha', 'nombre')
            .populate('categoriaId', 'nombre')
            .populate('grupoId', 'nombre')
            .populate('faseFinal');
        res.status(200).json({ ok: true, partidos });
    }
    catch (error) {
        res.status(500).json({ ok: false, message: 'Error al obtener partidos', error });
    }
}));
// Obtener partido por ID
partidoRoutes.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const partido = yield partido_model_1.Partido.findById(req.params.id)
            .populate('equipoA', 'nombre')
            .populate('equipoB', 'nombre')
            .populate('cancha', 'nombre')
            .populate('categoriaId', 'nombre')
            .populate('grupoId', 'nombre')
            .populate('faseFinal');
        if (!partido)
            return res.status(404).json({ ok: false, message: 'Partido no encontrado' });
        res.status(200).json({ ok: true, partido });
    }
    catch (error) {
        res.status(500).json({ ok: false, message: 'Error al obtener partido', error });
    }
}));
// Crear partido
partidoRoutes.post('/create', autenticacion_1.verificarTokenAdmin, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    try {
        const nuevoPartido = yield partido_model_1.Partido.create(data);
        res.status(201).json({ ok: true, partido: nuevoPartido });
    }
    catch (error) {
        res.status(400).json({ ok: false, message: 'Error al crear partido', error });
    }
}));
// Actualizar partido
partidoRoutes.put('/:id', autenticacion_1.verificarTokenAdmin, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const partido = yield partido_model_1.Partido.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!partido)
            return res.status(404).json({ ok: false, message: 'Partido no encontrado' });
        res.status(200).json({ ok: true, partido });
    }
    catch (error) {
        res.status(500).json({ ok: false, message: 'Error al actualizar partido', error });
    }
}));
// Eliminar partido
partidoRoutes.delete('/:id', autenticacion_1.verificarTokenAdmin, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const partido = yield partido_model_1.Partido.findByIdAndDelete(req.params.id);
        if (!partido)
            return res.status(404).json({ ok: false, message: 'Partido no encontrado' });
        res.status(200).json({ ok: true, message: 'Partido eliminado' });
    }
    catch (error) {
        res.status(500).json({ ok: false, message: 'Error al eliminar partido', error });
    }
}));
// Buscar partidos por grupo
partidoRoutes.get('/grupo/:grupoId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const partidos = yield partido_model_1.Partido.find({ grupoId: req.params.grupoId });
        res.status(200).json({ ok: true, partidos });
    }
    catch (error) {
        res.status(500).json({ ok: false, message: 'Error al buscar partidos por grupo', error });
    }
}));
// Buscar partidos por categoría
partidoRoutes.get('/categoria/:categoriaId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const partidos = yield partido_model_1.Partido.find({ categoriaId: req.params.categoriaId });
        res.status(200).json({ ok: true, partidos });
    }
    catch (error) {
        res.status(500).json({ ok: false, message: 'Error al buscar partidos por categoría', error });
    }
}));
// Buscar partidos por fase final
partidoRoutes.get('/fase/:faseFinalId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const partidos = yield partido_model_1.Partido.find({ faseFinal: req.params.faseFinalId });
        res.status(200).json({ ok: true, partidos });
    }
    catch (error) {
        res.status(500).json({ ok: false, message: 'Error al buscar partidos por fase final', error });
    }
}));
// Buscar partidos donde juega un equipo
partidoRoutes.get('/equipo/:equipoId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const partidos = yield partido_model_1.Partido.find({
            $or: [
                { equipoA: req.params.equipoId },
                { equipoB: req.params.equipoId }
            ]
        });
        res.status(200).json({ ok: true, partidos });
    }
    catch (error) {
        res.status(500).json({ ok: false, message: 'Error al buscar partidos por equipo', error });
    }
}));
exports.default = partidoRoutes;
