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
const institucion_model_1 = require("../models/institucion.model");
const autenticacion_1 = require("../middlewares/autenticacion");
const institucionRoutes = (0, express_1.Router)();
// Obtener todas las instituciones
institucionRoutes.get('/', (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const instituciones = yield institucion_model_1.Institucion.find();
        res.status(200).json({ ok: true, instituciones });
    }
    catch (error) {
        res.status(500).json({ ok: false, message: 'Error al obtener instituciones', error });
    }
}));
// Obtener una institución por ID
institucionRoutes.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const institucion = yield institucion_model_1.Institucion.findById(req.params.id);
        if (!institucion)
            return res.status(404).json({ ok: false, message: 'Institución no encontrada' });
        res.status(200).json({ ok: true, institucion });
    }
    catch (error) {
        res.status(500).json({ ok: false, message: 'Error al obtener institución', error });
    }
}));
// Crear nueva institución
institucionRoutes.post('/create', autenticacion_1.verificarTokenAdmin, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    try {
        const nueva = yield institucion_model_1.Institucion.create(data);
        res.status(201).json({ ok: true, institucion: nueva });
    }
    catch (error) {
        res.status(400).json({ ok: false, message: 'Error al crear institución', error });
    }
}));
// Actualizar institución
institucionRoutes.put('/:id', autenticacion_1.verificarTokenAdmin, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const actualizada = yield institucion_model_1.Institucion.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!actualizada)
            return res.status(404).json({ ok: false, message: 'Institución no encontrada' });
        res.status(200).json({ ok: true, institucion: actualizada });
    }
    catch (error) {
        res.status(500).json({ ok: false, message: 'Error al actualizar institución', error });
    }
}));
// Eliminar institución
institucionRoutes.delete('/:id', autenticacion_1.verificarTokenAdmin, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const eliminada = yield institucion_model_1.Institucion.findByIdAndDelete(req.params.id);
        if (!eliminada)
            return res.status(404).json({ ok: false, message: 'Institución no encontrada' });
        res.status(200).json({ ok: true, message: 'Institución eliminada' });
    }
    catch (error) {
        res.status(500).json({ ok: false, message: 'Error al eliminar institución', error });
    }
}));
// Buscar por provincia
institucionRoutes.get('/provincia/:provincia', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const instituciones = yield institucion_model_1.Institucion.find({ provincia: req.params.provincia });
        res.status(200).json({ ok: true, instituciones });
    }
    catch (error) {
        res.status(500).json({ ok: false, message: 'Error al buscar por provincia', error });
    }
}));
// Buscar por localidad
institucionRoutes.get('/localidad/:localidad', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const instituciones = yield institucion_model_1.Institucion.find({ localidad: req.params.localidad });
        res.status(200).json({ ok: true, instituciones });
    }
    catch (error) {
        res.status(500).json({ ok: false, message: 'Error al buscar por localidad', error });
    }
}));
exports.default = institucionRoutes;
