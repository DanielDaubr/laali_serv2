"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sede = void 0;
const mongoose_1 = require("mongoose");
const disponibilidadPorDiaSchema = new mongoose_1.Schema({
    fecha: {
        type: String,
        required: true // formato ISO: "YYYY-MM-DD"
    },
    horarioInicio: {
        type: String,
        required: true // formato "HH:mm"
    },
    horarioFin: {
        type: String,
        required: true // formato "HH:mm"
    }
}, { _id: false });
const sedeSchema = new mongoose_1.Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre de la sede es obligatorio']
    },
    direccion: {
        type: String
    },
    latitud: {
        type: Number
    },
    longitud: {
        type: Number
    },
    canchas: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Cancha',
            required: true
        }
    ],
    disponibilidad: [disponibilidadPorDiaSchema]
});
exports.Sede = (0, mongoose_1.model)('Sede', sedeSchema);
