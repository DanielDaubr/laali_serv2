"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FaseFinal = void 0;
const mongoose_1 = require("mongoose");
const faseFinalSchema = new mongoose_1.Schema({
    torneoId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Torneo',
        required: true
    },
    categoriaId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Categoria',
        required: true
    },
    copa: {
        type: String,
        enum: ['oro', 'plata', 'bronce'],
        required: true
    },
    etapa: {
        type: String,
        enum: ['octavos', 'cuartos', 'semifinal', 'final'],
        required: true
    },
    partidos: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Partido',
            required: true
        }
    ]
});
exports.FaseFinal = (0, mongoose_1.model)('FaseFinal', faseFinalSchema);
