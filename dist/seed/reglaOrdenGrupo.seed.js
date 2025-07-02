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
const mongoose_1 = __importDefault(require("mongoose"));
const reglaOrdenGrupo_model_1 = require("../models/reglaOrdenGrupo.model");
const db = 'mongodb://127.0.0.1:27017/lacai';
const reglas = [
    {
        orden: 1,
        criterio: 'puntos',
        descripcion: 'MAYOR PUNTAJE OBTENIDO'
    },
    {
        orden: 2,
        criterio: 'diferenciaGoles',
        descripcion: 'MEJOR DIFERENCIA DE GOLES'
    },
    {
        orden: 3,
        criterio: 'golesAFavor',
        descripcion: 'MEJOR CANTIDAD DE GOLES A FAVOR'
    },
    {
        orden: 4,
        criterio: 'golesEnContra',
        descripcion: 'MENOR CANTIDAD DE GOLES EN CONTRA'
    },
    {
        orden: 5,
        criterio: 'resultadoEntreAmbos',
        descripcion: 'MEJOR RESULTADO ENTRE AMBOS EQUIPOS'
    },
    {
        orden: 6,
        criterio: 'tarjetasRojas',
        descripcion: 'MENOR CANTIDAD DE TARJETAS ROJAS'
    },
    {
        orden: 7,
        criterio: 'tarjetasAmarillas',
        descripcion: 'MENOR CANTIDAD DE TARJETA AMARILLA'
    },
    {
        orden: 8,
        criterio: 'sorteo',
        descripcion: 'SORTEO'
    }
];
mongoose_1.default.connect(db)
    .then(() => __awaiter(void 0, void 0, void 0, function* () {
    const existentes = yield reglaOrdenGrupo_model_1.ReglaOrdenGrupo.countDocuments();
    if (existentes > 0) {
        console.log('⚠️ Ya hay reglas de orden de grupo en la base. Cancelado.');
        return mongoose_1.default.disconnect();
    }
    yield reglaOrdenGrupo_model_1.ReglaOrdenGrupo.insertMany(reglas);
    console.log('✅ Reglas de orden de grupo insertadas correctamente.');
    mongoose_1.default.disconnect();
}))
    .catch(err => {
    console.error('❌ Error al conectar o insertar:', err);
});
