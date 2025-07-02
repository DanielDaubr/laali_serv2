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
const tarjeta_model_1 = require("../models/tarjeta.model");
const autenticacion_1 = require("../middlewares/autenticacion");
const tarjetaRoutes = (0, express_1.Router)();
// Crear tarjeta
tarjetaRoutes.post('/create', autenticacion_1.verificarTokenAdmin, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tarjeta = yield tarjeta_model_1.Tarjeta.create(req.body);
        res.status(201).json({ ok: true, tarjeta });
    }
    catch (error) {
        res.status(400).json({ ok: false, error });
    }
}));
// Obtener todas las tarjetas
tarjetaRoutes.get('/', (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tarjetas = yield tarjeta_model_1.Tarjeta.find()
            .populate('jugadorId', 'nombre apellido')
            .populate('equipoId', 'nombre')
            .populate('partidoId');
        res.status(200).json({ ok: true, tarjetas });
    }
    catch (error) {
        res.status(500).json({ ok: false, error });
    }
}));
tarjetaRoutes.get('/categoria/:categoriaId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tarjetas = yield tarjeta_model_1.Tarjeta.find({ categoriaId: req.params.categoriaId })
            .populate('jugadorId', 'nombre apellido')
            .populate('equipoId', 'nombre')
            .populate('partidoId', 'fecha combinado') // útil para mostrar si fue combinado
            .populate('categoriaId', 'nombre');
        res.status(200).json({ ok: true, tarjetas });
    }
    catch (error) {
        res.status(500).json({ ok: false, error });
    }
}));
// Obtener tarjeta por ID
tarjetaRoutes.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tarjeta = yield tarjeta_model_1.Tarjeta.findById(req.params.id)
            .populate('jugadorId', 'nombre apellido')
            .populate('equipoId', 'nombre')
            .populate('partidoId');
        if (!tarjeta)
            return res.status(404).json({ ok: false, message: 'Tarjeta no encontrada' });
        res.status(200).json({ ok: true, tarjeta });
    }
    catch (error) {
        res.status(500).json({ ok: false, error });
    }
}));
// Obtener tarjetas por partido
tarjetaRoutes.get('/partido/:partidoId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tarjetas = yield tarjeta_model_1.Tarjeta.find({ partidoId: req.params.partidoId })
            .populate('jugadorId', 'nombre apellido')
            .populate('equipoId', 'nombre');
        res.status(200).json({ ok: true, tarjetas });
    }
    catch (error) {
        res.status(500).json({ ok: false, error });
    }
}));
// Obtener tarjetas por jugador
tarjetaRoutes.get('/jugador/:jugadorId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tarjetas = yield tarjeta_model_1.Tarjeta.find({ jugadorId: req.params.jugadorId })
            .populate('partidoId')
            .populate('equipoId', 'nombre');
        res.status(200).json({ ok: true, tarjetas });
    }
    catch (error) {
        res.status(500).json({ ok: false, error });
    }
}));
// Eliminar tarjeta
tarjetaRoutes.delete('/:id', autenticacion_1.verificarTokenAdmin, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tarjeta = yield tarjeta_model_1.Tarjeta.findByIdAndDelete(req.params.id);
        if (!tarjeta)
            return res.status(404).json({ ok: false, message: 'Tarjeta no encontrada' });
        res.status(200).json({ ok: true, message: 'Tarjeta eliminada' });
    }
    catch (error) {
        res.status(500).json({ ok: false, error });
    }
}));
exports.default = tarjetaRoutes;
