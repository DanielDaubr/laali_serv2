"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// seed/admin.seed.ts
const mongoose_1 = __importDefault(require("mongoose"));
const admin_model_1 = require("../models/admin.model");
const bcrypt_1 = __importDefault(require("bcrypt"));
const db = 'mongodb://127.0.0.1:27017/lacai'; // misma que usás en index.ts
mongoose_1.default.connect(db)
    .then(() => __awaiter(void 0, void 0, void 0, function* () {
    const existe = yield admin_model_1.Admin.findOne({ email: 'xeneizepoke@gmail.com' });
    if (existe) {
        console.log('⚠️  El usuario ya existe');
        return mongoose_1.default.disconnect();
    }
    const hashedPassword = bcrypt_1.default.hashSync('labombonera', 10);
    const nuevoAdmin = new admin_model_1.Admin({
        nickname: 'xeneize',
        email: 'xeneizepoke@gmail.com',
        celular: '3885777369',
        password: hashedPassword,
        rol: 'superadmin'
    });
    yield nuevoAdmin.save();
    console.log('✅ Superadmin creado con éxito');
    mongoose_1.default.disconnect();
}))
    .catch(err => console.error('❌ Error al conectar:', err));
