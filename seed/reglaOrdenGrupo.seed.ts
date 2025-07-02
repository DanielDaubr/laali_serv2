import mongoose from 'mongoose';
import { ReglaOrdenGrupo } from '../models/reglaOrdenGrupo.model';

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

mongoose.connect(db)
  .then(async () => {
    const existentes = await ReglaOrdenGrupo.countDocuments();
    if (existentes > 0) {
      console.log('⚠️ Ya hay reglas de orden de grupo en la base. Cancelado.');
      return mongoose.disconnect();
    }

    await ReglaOrdenGrupo.insertMany(reglas);
    console.log('✅ Reglas de orden de grupo insertadas correctamente.');
    mongoose.disconnect();
  })
  .catch(err => {
    console.error('❌ Error al conectar o insertar:', err);
  });
