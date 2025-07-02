"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReglaClasificacion = void 0;
const mongoose_1 = require("mongoose");
const reglaClasificacionSchema = new mongoose_1.Schema({
    orden: {
        type: Number,
        required: true
    },
    descripcion: {
        type: String
    },
    origen: {
        fase: {
            type: String,
            enum: ['grupos', 'faseFinal'],
            required: true
        },
        puestos: {
            type: [Number],
            required: true
        },
        cantidad: {
            type: Number
        },
        mejores: {
            puesto: Number,
            cantidad: Number
        }
    },
    destino: {
        copa: {
            type: String,
            enum: ['oro', 'plata', 'bronce'],
            required: true
        },
        etapa: {
            type: String,
            enum: ['octavos', 'cuartos', 'semifinal', 'final'],
            required: true
        }
    }
});
exports.ReglaClasificacion = (0, mongoose_1.model)('ReglaClasificacion', reglaClasificacionSchema);
