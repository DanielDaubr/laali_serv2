"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cancha = void 0;
const mongoose_1 = require("mongoose");
const canchaSchema = new mongoose_1.Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre de la cancha es obligatorio']
    },
    tipo: {
        type: String,
        enum: ['entera', 'media', 'cuarto'],
        required: [true, 'El tipo de cancha es obligatorio']
    },
    puedeDividirse: {
        type: Boolean,
        required: true
    },
    disponible: {
        type: Boolean,
        required: true
    }
});
exports.Cancha = (0, mongoose_1.model)('Cancha', canchaSchema);
