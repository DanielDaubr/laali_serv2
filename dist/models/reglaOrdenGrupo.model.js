"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReglaOrdenGrupo = void 0;
const mongoose_1 = require("mongoose");
const reglaOrdenGrupoSchema = new mongoose_1.Schema({
    orden: {
        type: Number,
        required: true,
    },
    criterio: {
        type: String,
        enum: [
            'puntos',
            'diferenciaGoles',
            'golesAFavor',
            'golesEnContra',
            'resultadoEntreAmbos',
            'tarjetasRojas',
            'tarjetasAmarillas',
            'sorteo'
        ],
        required: true,
    },
    descripcion: {
        type: String,
    },
});
exports.ReglaOrdenGrupo = (0, mongoose_1.model)('ReglaOrdenGrupo', reglaOrdenGrupoSchema);
