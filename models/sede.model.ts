import { Schema, model, Document, Types } from 'mongoose';

const disponibilidadPorDiaSchema = new Schema({
  fecha: {
    type: String,
    required: true // formato ISO: "YYYY-MM-DD"
  },
  horarioInicio: {
    type: String,
    required: true // formato "HH:mm"
  },
  horarioFin: {
    type: String,
    required: true // formato "HH:mm"
  }
}, { _id: false });

const sedeSchema = new Schema({
  nombre: {
    type: String,
    required: [true, 'El nombre de la sede es obligatorio']
  },
  direccion: {
    type: String
  },
  latitud: {
    type: Number
  },
  longitud: {
    type: Number
  },
  canchas: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Cancha',
      required: true
    }
  ],
  disponibilidad: [disponibilidadPorDiaSchema]
});

export interface DisponibilidadPorDia {
  fecha: string;
  horarioInicio: string;
  horarioFin: string;
}

export interface ISede extends Document {
  nombre: string;
  direccion?: string;
  latitud?: number;
  longitud?: number;
  canchas: Types.ObjectId[];
  disponibilidad: DisponibilidadPorDia[];
}

export const Sede = model<ISede>('Sede', sedeSchema);
