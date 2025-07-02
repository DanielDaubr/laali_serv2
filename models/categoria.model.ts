import { Schema, model, Document, Types } from 'mongoose';

const categoriaSchema = new Schema({
  torneo: {
    type: Schema.Types.ObjectId,
    ref: 'Torneo',
    required: true
  },
  nombre: {
    type: String,
    required: [true, 'El nombre de la categoría es obligatorio']
  },
  tipoCancha: {
    type: String,
    enum: ['entera', 'media', 'cuarto'],
    required: true
  },
  cantidadTiempos: {
    type: Number,
    required: true
  },
  duracionTiempoMinutos: {
    type: Number,
    required: true
  },
  entretiempoMinutos: {
    type: Number,
    default: 0
  },
  grupos: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Grupo',
      required: false
    }
  ],
  fasesFinales: [
    {
      type: Schema.Types.ObjectId,
      ref: 'FaseFinal',
      required: false
    }
  ],
  reglasClasificacion: [{
    type: Schema.Types.ObjectId,
    ref: 'ReglaClasificacion',
  }]
});

export interface ICategoria extends Document {
  torneo: Types.ObjectId;
  nombre: string;
  tipoCancha: 'entera' | 'media' | 'cuarto';
  cantidadTiempos: number;
  duracionTiempoMinutos: number;
  entretiempoMinutos?: number;
  grupos: Types.ObjectId[];
  fasesFinales: Types.ObjectId[];
  reglasClasificacion: Types.ObjectId[];
}

export const Categoria = model<ICategoria>('Categoria', categoriaSchema);
