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
const torneo_model_1 = require("../models/torneo.model");
const router = (0, express_1.Router)();
// Obtener todos los torneos
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const torneos = yield torneo_model_1.Torneo.find()
            .populate('categorias')
            .populate('sedes')
            .populate('reglaOrdenGrupo')
            .populate('creadoPor');
        res.json({ ok: true, torneos });
    }
    catch (err) {
        res.status(500).json({ ok: false, error: err });
    }
}));
// Obtener un torneo por ID
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const torneo = yield torneo_model_1.Torneo.findById(req.params.id)
            .populate('categorias')
            .populate('sedes')
            .populate('reglaOrdenGrupo')
            .populate('creadoPor');
        if (!torneo)
            return res.status(404).json({ ok: false, msg: 'Torneo no encontrado' });
        res.json({ ok: true, torneo });
    }
    catch (err) {
        res.status(500).json({ ok: false, error: err });
    }
}));
// Crear torneo
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const nuevoTorneo = new torneo_model_1.Torneo(req.body);
        yield nuevoTorneo.save();
        res.status(201).json({ ok: true, torneo: nuevoTorneo });
    }
    catch (err) {
        res.status(400).json({ ok: false, error: err });
    }
}));
// Actualizar torneo
router.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const torneo = yield torneo_model_1.Torneo.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!torneo)
            return res.status(404).json({ ok: false, msg: 'Torneo no encontrado' });
        res.json({ ok: true, torneo });
    }
    catch (err) {
        res.status(400).json({ ok: false, error: err });
    }
}));
// Eliminar torneo
router.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const torneo = yield torneo_model_1.Torneo.findByIdAndDelete(req.params.id);
        if (!torneo)
            return res.status(404).json({ ok: false, msg: 'Torneo no encontrado' });
        res.json({ ok: true, msg: 'Torneo eliminado' });
    }
    catch (err) {
        res.status(500).json({ ok: false, error: err });
    }
}));
// Obtener categorías de un torneo
router.get('/:id/categorias', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const torneo = yield torneo_model_1.Torneo.findById(req.params.id).populate('categorias');
        if (!torneo)
            return res.status(404).json({ ok: false, msg: 'Torneo no encontrado' });
        res.json({ ok: true, categorias: torneo.categorias });
    }
    catch (err) {
        res.status(500).json({ ok: false, error: err });
    }
}));
// Obtener sedes de un torneo
router.get('/:id/sedes', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const torneo = yield torneo_model_1.Torneo.findById(req.params.id).populate('sedes');
        if (!torneo)
            return res.status(404).json({ ok: false, msg: 'Torneo no encontrado' });
        res.json({ ok: true, sedes: torneo.sedes });
    }
    catch (err) {
        res.status(500).json({ ok: false, error: err });
    }
}));
exports.default = router;
