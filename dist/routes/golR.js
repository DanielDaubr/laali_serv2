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
const gol_model_1 = require("../models/gol.model");
const autenticacion_1 = require("../middlewares/autenticacion");
const golRoutes = (0, express_1.Router)();
// Obtener todos los goles
golRoutes.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const goles = yield gol_model_1.Gol.find()
            .populate('jugador', 'nombre')
            .populate('equipo', 'nombre')
            .populate('partido');
        res.status(200).json({ ok: true, goles });
    }
    catch (error) {
        res.status(500).json({ ok: false, message: 'Error al obtener goles', error });
    }
}));
// Crear un gol
golRoutes.post('/create', autenticacion_1.verificarTokenAdmin, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    try {
        const nuevoGol = yield gol_model_1.Gol.create(data);
        res.status(201).json({ ok: true, gol: nuevoGol });
    }
    catch (error) {
        res.status(400).json({ ok: false, message: 'Error al registrar gol', error });
    }
}));
// Obtener goles por partido
golRoutes.get('/partido/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const goles = yield gol_model_1.Gol.find({ partido: req.params.id })
            .populate('jugador', 'nombre')
            .populate('equipo', 'nombre');
        res.status(200).json({ ok: true, goles });
    }
    catch (error) {
        res.status(500).json({ ok: false, message: 'Error al obtener goles del partido', error });
    }
}));
// Obtener goles por jugador
golRoutes.get('/jugador/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const goles = yield gol_model_1.Gol.find({ jugador: req.params.id })
            .populate('partido')
            .populate('equipo', 'nombre');
        res.status(200).json({ ok: true, goles });
    }
    catch (error) {
        res.status(500).json({ ok: false, message: 'Error al obtener goles del jugador', error });
    }
}));
// Obtener goles por equipo
golRoutes.get('/equipo/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const goles = yield gol_model_1.Gol.find({ equipo: req.params.id })
            .populate('jugador', 'nombre')
            .populate('partido');
        res.status(200).json({ ok: true, goles });
    }
    catch (error) {
        res.status(500).json({ ok: false, message: 'Error al obtener goles del equipo', error });
    }
}));
// Eliminar un gol
golRoutes.delete('/:id', autenticacion_1.verificarTokenAdmin, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const eliminado = yield gol_model_1.Gol.findByIdAndDelete(req.params.id);
        if (!eliminado)
            return res.status(404).json({ ok: false, message: 'Gol no encontrado' });
        res.status(200).json({ ok: true, message: 'Gol eliminado' });
    }
    catch (error) {
        res.status(500).json({ ok: false, message: 'Error al eliminar gol', error });
    }
}));
// Buscar goles por categoría
golRoutes.get('/categoria/:categoriaId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { categoriaId } = req.params;
    try {
        const goles = yield gol_model_1.Gol.find()
            .populate({
            path: 'partido',
            match: { categoriaId }, // Esto depende de que Partido tenga categoriaId
        })
            .populate('jugador', 'nombre')
            .populate('equipo', 'nombre');
        // Filtrar goles donde el partido coincida (porque los que no coinciden serán null)
        const golesFiltrados = goles.filter(g => g.partido);
        res.status(200).json({ ok: true, goles: golesFiltrados });
    }
    catch (error) {
        res.status(500).json({ ok: false, message: 'Error al buscar goles por categoría', error });
    }
}));
// Buscar goles que sean definición por penales (fuera de tiempo reglamentario)
golRoutes.get('/definicion/:partidoId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { partidoId } = req.params;
    try {
        const goles = yield gol_model_1.Gol.find({
            partido: partidoId,
            esDefinicionPorPenales: true
        })
            .populate('jugador', 'nombre')
            .populate('equipo', 'nombre');
        res.status(200).json({ ok: true, goles });
    }
    catch (error) {
        res.status(500).json({ ok: false, message: 'Error al buscar goles por definición', error });
    }
}));
exports.default = golRoutes;
