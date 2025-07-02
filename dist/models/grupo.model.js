"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Grupo = void 0;
const mongoose_1 = require("mongoose");
const grupoSchema = new mongoose_1.Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre del grupo es obligatorio']
    },
    equipos: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Equipo',
            required: true
        }
    ],
    partidos: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Partido'
        }
    ],
    categoria: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Categoria',
        required: true
    },
    torneo: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Torneo',
        required: true
    }
});
exports.Grupo = (0, mongoose_1.model)('Grupo', grupoSchema);
