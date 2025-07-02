"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Jugador = void 0;
const mongoose_1 = require("mongoose");
const jugadorSchema = new mongoose_1.Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    apellido: {
        type: String,
        required: [true, 'El apellido es obligatorio']
    },
    dni: {
        type: String,
        required: [true, 'El DNI es obligatorio'],
        unique: true
    },
    fechaNacimiento: {
        type: Date,
        required: [true, 'La fecha de nacimiento es obligatoria']
    },
    fotoUrl: {
        type: String
    },
    institucionId: {
        type: mongoose_1.Types.ObjectId,
        ref: 'Institucion',
        required: true
    },
    equipos: [{
            type: mongoose_1.Types.ObjectId,
            ref: 'Equipo'
        }],
    observaciones: {
        type: String
    }
});
exports.Jugador = (0, mongoose_1.model)('Jugador', jugadorSchema);
