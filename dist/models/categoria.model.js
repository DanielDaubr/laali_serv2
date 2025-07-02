"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Categoria = void 0;
const mongoose_1 = require("mongoose");
const categoriaSchema = new mongoose_1.Schema({
    torneo: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Torneo',
        required: true
    },
    nombre: {
        type: String,
        required: [true, 'El nombre de la categoría es obligatorio']
    },
    tipoCancha: {
        type: String,
        enum: ['entera', 'media', 'cuarto'],
        required: true
    },
    cantidadTiempos: {
        type: Number,
        required: true
    },
    duracionTiempoMinutos: {
        type: Number,
        required: true
    },
    entretiempoMinutos: {
        type: Number,
        default: 0
    },
    grupos: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Grupo',
            required: false
        }
    ],
    fasesFinales: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'FaseFinal',
            required: false
        }
    ],
    reglasClasificacion: [{
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'ReglaClasificacion',
        }]
});
exports.Categoria = (0, mongoose_1.model)('Categoria', categoriaSchema);
