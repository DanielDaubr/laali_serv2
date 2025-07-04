"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class TokenAdmin {
    constructor() { }
    static getJwtToken(payload) {
        return jsonwebtoken_1.default.sign({
            admin: payload
        }, this.seed, { expiresIn: this.caducidad });
    }
    static comprobarToken(adminToken) {
        return new Promise((resolve, reject) => {
            jsonwebtoken_1.default.verify(adminToken, this.seed, (err, decoded) => {
                if (err) {
                    reject();
                }
                else {
                    resolve(decoded);
                }
            });
        });
    }
}
TokenAdmin.seed = 'Aqui-termina-la-anecdota-pero-el-te-mato-Da-via-da-Para-Mas';
TokenAdmin.caducidad = '30d';
exports.default = TokenAdmin;
