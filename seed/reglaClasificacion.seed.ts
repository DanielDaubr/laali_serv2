import { connect } from 'mongoose';
import { ReglaClasificacion, IReglaClasificacion } from '../models/reglaClasificacion.model';



const seedReglasClasificacion = async () => {
  await connect('mongodb://127.0.0.1:27017/lacai');

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

  await ReglaClasificacion.deleteMany({});
  await ReglaClasificacion.insertMany(reglas);

  console.log('✅ Seed de reglas de clasificación insertado correctamente');
  process.exit();
};

seedReglasClasificacion();
