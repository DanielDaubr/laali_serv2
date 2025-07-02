"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tarjeta = void 0;
const mongoose_1 = require("mongoose");
const tarjetaSchema = new mongoose_1.Schema({
    categoriaId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Categoria',
        required: true
    },
    partidoId: {
        type: mongoose_1.Types.ObjectId,
        ref: 'Partido',
        required: true,
    },
    jugadorId: {
        type: mongoose_1.Types.ObjectId,
        ref: 'Jugador',
        required: true,
    },
    equipoId: {
        type: mongoose_1.Types.ObjectId,
        ref: 'Equipo',
        required: true,
    },
    tipo: {
        type: String,
        enum: ['amarilla', 'roja'],
        required: true,
    },
    minuto: {
        type: Number,
    },
    observaciones: {
        type: String,
    }
}, {
    timestamps: true,
});
exports.Tarjeta = (0, mongoose_1.model)('Tarjeta', tarjetaSchema);
