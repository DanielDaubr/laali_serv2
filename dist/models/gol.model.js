"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Gol = void 0;
const mongoose_1 = require("mongoose");
const golSchema = new mongoose_1.Schema({
    categoriaId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Categoria',
        required: true
    },
    jugador: {
        type: mongoose_1.Types.ObjectId,
        ref: 'Jugador',
        required: true
    },
    equipo: {
        type: mongoose_1.Types.ObjectId,
        ref: 'Equipo',
        required: true
    },
    partido: {
        type: mongoose_1.Types.ObjectId,
        ref: 'Partido',
        required: true
    },
    minuto: {
        type: Number
    },
    tipo: {
        type: String,
        enum: ['normal', 'penal', 'enContra'],
        default: 'normal'
    },
    esDefinicionPorPenales: {
        type: Boolean,
        default: false
    },
    creadoEn: {
        type: Date,
        default: Date.now
    }
});
exports.Gol = (0, mongoose_1.model)('Gol', golSchema);
