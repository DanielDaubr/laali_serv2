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
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const reglaClasificacion_model_1 = require("../models/reglaClasificacion.model");
const seedReglasClasificacion = () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, mongoose_1.connect)('mongodb://127.0.0.1:27017/lacai');
    const reglas = [
        {
            orden: 1,
            descripcion: 'Los 4 mejores primeros pasan a cuartos de final de la copa oro',
            origen: {
                fase: 'grupos',
                puestos: [1],
                mejores: {
                    puesto: 1,
                    cantidad: 4,
                },
            },
            destino: {
                copa: 'oro',
                etapa: 'cuartos',
            },
        },
        {
            orden: 2,
            descripcion: 'El resto de los primeros y todos los segundos juegan octavos de final de la copa oro',
            origen: {
                fase: 'grupos',
                puestos: [1, 2],
            },
            destino: {
                copa: 'oro',
                etapa: 'octavos',
            },
        },
        {
            orden: 3,
            descripcion: 'Los 4 mejores terceros pasan a cuartos de final de la copa plata',
            origen: {
                fase: 'grupos',
                puestos: [3],
                mejores: {
                    puesto: 3,
                    cantidad: 4,
                },
            },
            destino: {
                copa: 'plata',
                etapa: 'cuartos',
            },
        },
        {
            orden: 4,
            descripcion: 'El resto de los terceros y todos los cuartos juegan octavos de final de la copa plata',
            origen: {
                fase: 'grupos',
                puestos: [3, 4],
            },
            destino: {
                copa: 'plata',
                etapa: 'octavos',
            },
        },
    ];
    yield reglaClasificacion_model_1.ReglaClasificacion.deleteMany({});
    yield reglaClasificacion_model_1.ReglaClasificacion.insertMany(reglas);
    console.log('✅ Seed de reglas de clasificación insertado correctamente');
    process.exit();
});
seedReglasClasificacion();
