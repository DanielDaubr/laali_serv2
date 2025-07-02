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
const categoria_model_1 = require("../models/categoria.model");
const autenticacion_1 = require("../middlewares/autenticacion");
const categoriaRoutes = (0, express_1.Router)();
// Obtener todas las categorías
categoriaRoutes.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categorias = yield categoria_model_1.Categoria.find()
            .populate('grupos', 'nombre')
            .populate('fasesFinales', 'nombre')
            .populate('reglasClasificacion', 'nombre');
        res.status(200).json({ ok: true, categorias });
    }
    catch (error) {
        res.status(500).json({ ok: false, message: 'Error al obtener categorías', error });
    }
}));
// Buscar categorías por torneo
categoriaRoutes.get('/torneo/:torneoId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { torneoId } = req.params;
    try {
        const categorias = yield categoria_model_1.Categoria.find({ torneo: torneoId })
            .populate('grupos')
            .populate('fasesFinales')
            .populate('reglasClasificacion');
        res.status(200).json({ ok: true, categorias });
    }
    catch (error) {
        res.status(500).json({ ok: false, message: 'Error al buscar categorías por torneo', error });
    }
}));
// Obtener una categoría por ID
categoriaRoutes.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const categoria = yield categoria_model_1.Categoria.findById(id)
            .populate('grupos', 'nombre')
            .populate('fasesFinales', 'nombre')
            .populate('reglasClasificacion', 'nombre');
        if (!categoria) {
            return res.status(404).json({ ok: false, message: 'Categoría no encontrada' });
        }
        res.status(200).json({ ok: true, categoria });
    }
    catch (error) {
        res.status(500).json({ ok: false, message: 'Error al buscar categoría', error });
    }
}));
// Crear una categoría
categoriaRoutes.post('/create', autenticacion_1.verificarTokenAdmin, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    try {
        const nuevaCategoria = yield categoria_model_1.Categoria.create(data);
        res.status(201).json({ ok: true, categoria: nuevaCategoria });
    }
    catch (error) {
        res.status(400).json({ ok: false, message: 'Error al crear categoría', error });
    }
}));
// Actualizar una categoría
categoriaRoutes.put('/:id', autenticacion_1.verificarTokenAdmin, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const updateData = req.body;
    try {
        const categoriaActualizada = yield categoria_model_1.Categoria.findByIdAndUpdate(id, updateData, { new: true });
        if (!categoriaActualizada) {
            return res.status(404).json({ ok: false, message: 'Categoría no encontrada' });
        }
        res.status(200).json({ ok: true, categoria: categoriaActualizada });
    }
    catch (error) {
        res.status(500).json({ ok: false, message: 'Error al actualizar categoría', error });
    }
}));
// Eliminar una categoría
categoriaRoutes.delete('/:id', autenticacion_1.verificarTokenAdmin, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const categoriaEliminada = yield categoria_model_1.Categoria.findByIdAndDelete(id);
        if (!categoriaEliminada) {
            return res.status(404).json({ ok: false, message: 'Categoría no encontrada' });
        }
        res.status(200).json({ ok: true, message: 'Categoría eliminada' });
    }
    catch (error) {
        res.status(500).json({ ok: false, message: 'Error al eliminar categoría', error });
    }
}));
exports.default = categoriaRoutes;
