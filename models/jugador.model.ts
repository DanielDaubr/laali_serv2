import { Schema, model, Document, Types } from 'mongoose';

const jugadorSchema = new Schema({
  nombre: {
    type: String,
    required: [true, 'El nombre es obligatorio']
  },
  apellido: {
    type: String,
    required: [true, 'El apellido es obligatorio']
  },
  dni: {
    type: String,
    required: [true, 'El DNI es obligatorio'],
    unique: true
  },
  fechaNacimiento: {
    type: Date,
    required: [true, 'La fecha de nacimiento es obligatoria']
  },
  fotoUrl: {
    type: String
  },
  institucionId: {
    type: Types.ObjectId,
    ref: 'Institucion',
    required: true
  },
  equipos: [{
    type: Types.ObjectId,
    ref: 'Equipo'
  }],
  observaciones: {
    type: String
  }
});

export interface IJugador extends Document {
  nombre: string;
  apellido: string;
  dni: string;
  fechaNacimiento: Date;
  fotoUrl?: string;
  institucionId: Types.ObjectId;
  equipos: Types.ObjectId[]; // Relación con equipos
  observaciones?: string;
}

export const Jugador = model<IJugador>('Jugador', jugadorSchema);
