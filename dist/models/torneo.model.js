"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Torneo = void 0;
const mongoose_1 = require("mongoose");
const torneoSchema = new mongoose_1.Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre del torneo es obligatorio']
    },
    fechaInicio: {
        type: Date,
        required: [true, 'La fecha de inicio es obligatoria']
    },
    fechaFin: {
        type: Date,
        required: [true, 'La fecha de fin es obligatoria']
    },
    categorias: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Categoria',
            required: true
        }
    ],
    sedes: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Sede',
            required: true
        }
    ],
    reglaOrdenGrupo: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'reglaOrdenGrupo',
        required: true
    },
    estado: {
        type: String,
        enum: ['pendiente', 'activo', 'finalizado'],
        default: 'pendiente'
    },
    creadoPor: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Admin',
        required: true
    }
});
exports.Torneo = (0, mongoose_1.model)('Torneo', torneoSchema);
