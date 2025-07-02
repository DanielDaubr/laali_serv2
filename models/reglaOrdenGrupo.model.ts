import { Schema, model, Document } from 'mongoose';

const reglaOrdenGrupoSchema = new Schema({
  orden: {
    type: Number,
    required: true,
  },
  criterio: {
    type: String,
    enum: [
      'puntos',
      'diferenciaGoles',
      'golesAFavor',
      'golesEnContra',
      'resultadoEntreAmbos',
      'tarjetasRojas',
      'tarjetasAmarillas',
      'sorteo'
    ],
    required: true,
  },
  descripcion: {
    type: String,
  },
});

export interface IReglaOrdenGrupo extends Document {
  orden: number;
  criterio:
    | 'puntos'
    | 'diferenciaGoles'
    | 'golesAFavor'
    | 'golesEnContra'
    | 'resultadoEntreAmbos'
    | 'tarjetasRojas'
    | 'tarjetasAmarillas'
    | 'sorteo';
  descripcion?: string;
}

export const ReglaOrdenGrupo = model<IReglaOrdenGrupo>('ReglaOrdenGrupo', reglaOrdenGrupoSchema);
