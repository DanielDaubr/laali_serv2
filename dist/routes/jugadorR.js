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
const jugador_model_1 = require("../models/jugador.model");
const autenticacion_1 = require("../middlewares/autenticacion");
const jugadorRoutes = (0, express_1.Router)();
// Obtener todos los jugadores
jugadorRoutes.get('/', (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const jugadores = yield jugador_model_1.Jugador.find()
            .populate('institucionId', 'nombre')
            .populate('equipos', 'nombre');
        res.status(200).json({ ok: true, jugadores });
    }
    catch (error) {
        res.status(500).json({ ok: false, message: 'Error al obtener jugadores', error });
    }
}));
// Obtener jugador por ID
jugadorRoutes.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const jugador = yield jugador_model_1.Jugador.findById(req.params.id)
            .populate('institucionId', 'nombre')
            .populate('equipos', 'nombre');
        if (!jugador)
            return res.status(404).json({ ok: false, message: 'Jugador no encontrado' });
        res.status(200).json({ ok: true, jugador });
    }
    catch (error) {
        res.status(500).json({ ok: false, message: 'Error al obtener jugador', error });
    }
}));
// Crear jugador
jugadorRoutes.post('/create', autenticacion_1.verificarTokenAdmin, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    try {
        const nuevoJugador = yield jugador_model_1.Jugador.create(data);
        res.status(201).json({ ok: true, jugador: nuevoJugador });
    }
    catch (error) {
        res.status(400).json({ ok: false, message: 'Error al crear jugador', error });
    }
}));
// Actualizar jugador
jugadorRoutes.put('/:id', autenticacion_1.verificarTokenAdmin, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const jugador = yield jugador_model_1.Jugador.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!jugador)
            return res.status(404).json({ ok: false, message: 'Jugador no encontrado' });
        res.status(200).json({ ok: true, jugador });
    }
    catch (error) {
        res.status(500).json({ ok: false, message: 'Error al actualizar jugador', error });
    }
}));
// Eliminar jugador
jugadorRoutes.delete('/:id', autenticacion_1.verificarTokenAdmin, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const eliminado = yield jugador_model_1.Jugador.findByIdAndDelete(req.params.id);
        if (!eliminado)
            return res.status(404).json({ ok: false, message: 'Jugador no encontrado' });
        res.status(200).json({ ok: true, message: 'Jugador eliminado' });
    }
    catch (error) {
        res.status(500).json({ ok: false, message: 'Error al eliminar jugador', error });
    }
}));
// Buscar por DNI
jugadorRoutes.get('/dni/:dni', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const jugador = yield jugador_model_1.Jugador.findOne({ dni: req.params.dni })
            .populate('institucionId', 'nombre')
            .populate('equipos', 'nombre');
        if (!jugador)
            return res.status(404).json({ ok: false, message: 'Jugador no encontrado' });
        res.status(200).json({ ok: true, jugador });
    }
    catch (error) {
        res.status(500).json({ ok: false, message: 'Error al buscar por DNI', error });
    }
}));
// Buscar por institución
jugadorRoutes.get('/institucion/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const jugadores = yield jugador_model_1.Jugador.find({ institucionId: req.params.id })
            .populate('equipos', 'nombre');
        res.status(200).json({ ok: true, jugadores });
    }
    catch (error) {
        res.status(500).json({ ok: false, message: 'Error al buscar por institución', error });
    }
}));
// Buscar por equipo
jugadorRoutes.get('/equipo/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const jugadores = yield jugador_model_1.Jugador.find({ equipos: req.params.id })
            .populate('institucionId', 'nombre');
        res.status(200).json({ ok: true, jugadores });
    }
    catch (error) {
        res.status(500).json({ ok: false, message: 'Error al buscar por equipo', error });
    }
}));
exports.default = jugadorRoutes;
