"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verificarTokenAdmin = void 0;
const token_1 = __importDefault(require("../classes/token"));
const verificarTokenAdmin = (req, res, next) => {
    const adminToken = req.get('x-tokenadmin') || '';
    token_1.default.comprobarToken(adminToken)
        .then((decoded) => {
        console.log('Decoded', decoded);
        req.admin = decoded.admin;
        next();
    }).catch(err => {
        res.json({
            ok: false,
            mensaje: 'token no es correcto'
        });
    });
};
exports.verificarTokenAdmin = verificarTokenAdmin;
