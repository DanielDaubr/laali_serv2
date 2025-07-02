"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Equipo = void 0;
const mongoose_1 = require("mongoose");
const equipoSchema = new mongoose_1.Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre del equipo es obligatorio']
    },
    institucionId: {
        type: mongoose_1.Types.ObjectId,
        ref: 'Institucion',
        required: [true, 'Debe indicar la institución']
    },
    categoria: {
        type: String,
        required: [true, 'Debe indicar la categoría']
    },
    escudoUrl: {
        type: String
    },
    jugadores: [{
            type: mongoose_1.Types.ObjectId,
            ref: 'Jugador'
        }],
    responsable: {
        nombre: { type: String, required: false },
        telefono: { type: String, required: false },
        email: { type: String, required: false }
    }
});
exports.Equipo = (0, mongoose_1.model)('Equipo', equipoSchema);
