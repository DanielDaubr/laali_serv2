"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Admin = void 0;
const mongoose_1 = require("mongoose");
const bcrypt_1 = __importDefault(require("bcrypt"));
const adminSchema = new mongoose_1.Schema({
    nickname: {
        type: String,
        unique: true,
        required: [true, '']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'Ingresa un email válido']
    },
    celular: {
        type: String,
        unique: true,
        required: [true, 'El número de celular es obligatorio']
    },
    password: {
        type: String,
        required: [true, 'Ingresa una contraseña']
    },
    rol: {
        type: String,
        enum: ['superadmin', 'organizador', 'juez'],
        default: 'organizador',
        required: [true, 'El rol es obligatorio']
    }
});
adminSchema.methods.compararPassword = function (password) {
    return bcrypt_1.default.compareSync(password, this.password);
};
exports.Admin = (0, mongoose_1.model)('Admin', adminSchema);
