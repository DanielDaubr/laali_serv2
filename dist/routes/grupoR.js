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
const grupo_model_1 = require("../models/grupo.model");
const autenticacion_1 = require("../middlewares/autenticacion");
const grupoRoutes = (0, express_1.Router)();
// Obtener todos los grupos
grupoRoutes.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const grupos = yield grupo_model_1.Grupo.find()
            .populate('equipos', 'nombre')
            .populate('partidos')
            .populate('categoria', 'nombre')
            .populate('torneo', 'nombre');
        res.status(200).json({ ok: true, grupos });
    }
    catch (error) {
        res.status(500).json({ ok: false, message: 'Error al obtener grupos', error });
    }
}));
// Obtener grupo por ID
grupoRoutes.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const grupo = yield grupo_model_1.Grupo.findById(req.params.id)
            .populate('equipos', 'nombre')
            .populate('partidos')
            .populate('categoria', 'nombre')
            .populate('torneo', 'nombre');
        if (!grupo)
            return res.status(404).json({ ok: false, message: 'Grupo no encontrado' });
        res.status(200).json({ ok: true, grupo });
    }
    catch (error) {
        res.status(500).json({ ok: false, message: 'Error al obtener grupo', error });
    }
}));
// Crear grupo
grupoRoutes.post('/create', autenticacion_1.verificarTokenAdmin, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    try {
        const nuevoGrupo = yield grupo_model_1.Grupo.create(data);
        res.status(201).json({ ok: true, grupo: nuevoGrupo });
    }
    catch (error) {
        res.status(400).json({ ok: false, message: 'Error al crear grupo', error });
    }
}));
// Actualizar grupo
grupoRoutes.put('/:id', autenticacion_1.verificarTokenAdmin, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const grupo = yield grupo_model_1.Grupo.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!grupo)
            return res.status(404).json({ ok: false, message: 'Grupo no encontrado' });
        res.status(200).json({ ok: true, grupo });
    }
    catch (error) {
        res.status(500).json({ ok: false, message: 'Error al actualizar grupo', error });
    }
}));
// Eliminar grupo
grupoRoutes.delete('/:id', autenticacion_1.verificarTokenAdmin, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const eliminado = yield grupo_model_1.Grupo.findByIdAndDelete(req.params.id);
        if (!eliminado)
            return res.status(404).json({ ok: false, message: 'Grupo no encontrado' });
        res.status(200).json({ ok: true, message: 'Grupo eliminado' });
    }
    catch (error) {
        res.status(500).json({ ok: false, message: 'Error al eliminar grupo', error });
    }
}));
// Buscar grupos por torneo
grupoRoutes.get('/torneo/:torneoId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const grupos = yield grupo_model_1.Grupo.find({ torneo: req.params.torneoId })
            .populate('equipos', 'nombre')
            .populate('partidos')
            .populate('categoria', 'nombre');
        res.status(200).json({ ok: true, grupos });
    }
    catch (error) {
        res.status(500).json({ ok: false, message: 'Error al buscar grupos por torneo', error });
    }
}));
// Buscar grupos por categoría
grupoRoutes.get('/categoria/:categoriaId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const grupos = yield grupo_model_1.Grupo.find({ categoria: req.params.categoriaId })
            .populate('equipos', 'nombre')
            .populate('partidos')
            .populate('torneo', 'nombre');
        res.status(200).json({ ok: true, grupos });
    }
    catch (error) {
        res.status(500).json({ ok: false, message: 'Error al buscar grupos por categoría', error });
    }
}));
exports.default = grupoRoutes;
