"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Institucion = void 0;
const mongoose_1 = require("mongoose");
const institucionSchema = new mongoose_1.Schema({
    nombre: {
        type: String,
        required: true,
    },
    pais: {
        type: String,
        required: true,
    },
    provincia: {
        type: String,
        required: true,
    },
    localidad: {
        type: String,
        required: true,
    },
    contacto: {
        nombre: { type: String, required: true },
        telefono: { type: String },
        email: { type: String },
    },
    escudoUrl: {
        type: String,
    },
    observaciones: {
        type: String,
    },
});
exports.Institucion = (0, mongoose_1.model)('Institucion', institucionSchema);
