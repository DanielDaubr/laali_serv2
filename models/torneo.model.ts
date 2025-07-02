import { Schema, model, Document, Types } from 'mongoose';

const torneoSchema = new Schema({
  nombre: {
    type: String,
    required: [true, 'El nombre del torneo es obligatorio']
  },
  fechaInicio: {
    type: Date,
    required: [true, 'La fecha de inicio es obligatoria']
  },
  fechaFin: {
    type: Date,
    required: [true, 'La fecha de fin es obligatoria']
  },
  categorias: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Categoria',
      required: true
    }
  ],
  sedes: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Sede',
      required: true
    }
  ],
  reglaOrdenGrupo: {
    type: Schema.Types.ObjectId,
    ref: 'reglaOrdenGrupo',
    required: true
  },
  estado: {
    type: String,
    enum: ['pendiente', 'activo', 'finalizado'],
    default: 'pendiente'
  },
  creadoPor: {
    type: Schema.Types.ObjectId,
    ref: 'Admin',
    required: true
  }
});

export interface ITorneo extends Document {
  nombre: string;
  fechaInicio: Date;
  fechaFin: Date;
  categorias: Types.ObjectId[];
  sedes: Types.ObjectId[];
  reglaOrdenGrupo: Types.ObjectId[];
  estado: 'pendiente' | 'activo' | 'finalizado';
  creadoPor: Types.ObjectId;
}

export const Torneo = model<ITorneo>('Torneo', torneoSchema);
