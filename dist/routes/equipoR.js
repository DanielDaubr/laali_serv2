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
const equipo_model_1 = require("../models/equipo.model");
const autenticacion_1 = require("../middlewares/autenticacion");
const equipoRoutes = (0, express_1.Router)();
// Obtener todos los equipos
equipoRoutes.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const equipos = yield equipo_model_1.Equipo.find().populate('jugadores').populate('institucionId', 'nombre');
        res.status(200).json({ ok: true, equipos });
    }
    catch (error) {
        res.status(500).json({ ok: false, message: 'Error al obtener equipos', error });
    }
}));
// Obtener un equipo por ID
equipoRoutes.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const equipo = yield equipo_model_1.Equipo.findById(req.params.id).populate('jugadores').populate('institucionId', 'nombre');
        if (!equipo)
            return res.status(404).json({ ok: false, message: 'Equipo no encontrado' });
        res.status(200).json({ ok: true, equipo });
    }
    catch (error) {
        res.status(500).json({ ok: false, message: 'Error al obtener equipo', error });
    }
}));
// Crear un equipo
equipoRoutes.post('/create', autenticacion_1.verificarTokenAdmin, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    try {
        const equipo = yield equipo_model_1.Equipo.create(data);
        res.status(201).json({ ok: true, equipo });
    }
    catch (error) {
        res.status(400).json({ ok: false, message: 'Error al crear equipo', error });
    }
}));
// Actualizar equipo
equipoRoutes.put('/:id', autenticacion_1.verificarTokenAdmin, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const equipo = yield equipo_model_1.Equipo.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!equipo)
            return res.status(404).json({ ok: false, message: 'Equipo no encontrado' });
        res.status(200).json({ ok: true, equipo });
    }
    catch (error) {
        res.status(500).json({ ok: false, message: 'Error al actualizar equipo', error });
    }
}));
// Eliminar equipo
equipoRoutes.delete('/:id', autenticacion_1.verificarTokenAdmin, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const equipo = yield equipo_model_1.Equipo.findByIdAndDelete(req.params.id);
        if (!equipo)
            return res.status(404).json({ ok: false, message: 'Equipo no encontrado' });
        res.status(200).json({ ok: true, message: 'Equipo eliminado' });
    }
    catch (error) {
        res.status(500).json({ ok: false, message: 'Error al eliminar equipo', error });
    }
}));
// Buscar equipos por institución
equipoRoutes.get('/institucion/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const equipos = yield equipo_model_1.Equipo.find({ institucionId: req.params.id }).populate('jugadores');
        res.status(200).json({ ok: true, equipos });
    }
    catch (error) {
        res.status(500).json({ ok: false, message: 'Error al buscar equipos por institución', error });
    }
}));
// Buscar equipos por categoría
equipoRoutes.get('/categoria/:nombre', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const equipos = yield equipo_model_1.Equipo.find({ categoria: req.params.nombre }).populate('jugadores');
        res.status(200).json({ ok: true, equipos });
    }
    catch (error) {
        res.status(500).json({ ok: false, message: 'Error al buscar equipos por categoría', error });
    }
}));
exports.default = equipoRoutes;
