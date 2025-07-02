import { Schema, model, Document, Types } from 'mongoose';

const equipoSchema = new Schema({
  nombre: {
    type: String,
    required: [true, 'El nombre del equipo es obligatorio']
  },
  institucionId: {
    type: Types.ObjectId,
    ref: 'Institucion',
    required: [true, 'Debe indicar la institución']
  },
  categoria: {
    type: String,
    required: [true, 'Debe indicar la categoría']
  },
  escudoUrl: {
    type: String
  },
  jugadores: [{
    type: Types.ObjectId,
    ref: 'Jugador'
  }],
  responsable: {
    nombre: { type: String, required: false },
    telefono: { type: String, required: false },
    email: { type: String, required: false }
  }
});

export interface IEquipo extends Document {
  nombre: string;
  institucionId: Types.ObjectId;
  categoria: string;
  escudoUrl?: string;
  jugadores: Types.ObjectId[];
  responsable?: {
    nombre?: string;
    telefono?: string;
    email?: string;
  };
}

export const Equipo = model<IEquipo>('Equipo', equipoSchema);
