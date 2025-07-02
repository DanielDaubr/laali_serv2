"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Partido = void 0;
const mongoose_1 = require("mongoose");
const resultadoDetalleSchema = new mongoose_1.Schema({
    tipo: {
        type: String,
        enum: ['normal', 'penales', 'tecnico'],
        required: true
    },
    golesA: {
        type: Number,
        required: true
    },
    golesB: {
        type: Number,
        required: true
    },
    observacion: {
        type: String
    }
}, { _id: false });
const partidoSchema = new mongoose_1.Schema({
    equipoA: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Equipo',
        required: true
    },
    equipoB: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Equipo',
        required: true
    },
    resultadoDetalle: {
        type: [resultadoDetalleSchema],
        default: []
    },
    tarjetasRojasA: {
        type: Number,
        default: 0
    },
    tarjetasRojasB: {
        type: Number,
        default: 0
    },
    tarjetasAmarillasA: {
        type: Number,
        default: 0
    },
    tarjetasAmarillasB: {
        type: Number,
        default: 0
    },
    fecha: {
        type: Date,
        required: true
    },
    horario: {
        type: String,
        required: true
    },
    cancha: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Cancha',
        required: true
    },
    estado: {
        type: String,
        enum: ['pendiente', 'en_juego', 'finalizado', 'suspendido', 'cancelado'],
        default: 'pendiente'
    },
    categoriaId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Categoria',
        required: true
    },
    grupoId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Grupo'
    },
    numeroFecha: {
        type: Number
    },
    faseFinal: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'FaseFinal'
    }
});
exports.Partido = (0, mongoose_1.model)('Partido', partidoSchema);
