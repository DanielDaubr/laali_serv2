import { Schema, model, Document } from 'mongoose';

const institucionSchema = new Schema({
  nombre: {
    type: String,
    required: true,
  },
  pais: {
    type: String,
    required: true,
  },
  provincia: {
    type: String,
    required: true,
  },
  localidad: {
    type: String,
    required: true,
  },
  contacto: {
    nombre: { type: String, required: true },
    telefono: { type: String },
    email: { type: String },
  },
  escudoUrl: {
    type: String,
  },
  observaciones: {
    type: String,
  },
});

export interface IInstitucion extends Document {
  nombre: string;
  pais: string;
  provincia: string;
  localidad: string;
  contacto?: {
    nombre: string;
    telefono?: string;
    email?: string;
  };
  escudoUrl?: string;
  observaciones?: string;
}

export const Institucion = model<IInstitucion>('Institucion', institucionSchema);
