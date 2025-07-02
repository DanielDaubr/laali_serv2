import { Schema, model, Document } from 'mongoose';

const canchaSchema = new Schema({
  nombre: {
    type: String,
    required: [true, 'El nombre de la cancha es obligatorio']
  },
  tipo: {
    type: String,
    enum: ['entera', 'media', 'cuarto'],
    required: [true, 'El tipo de cancha es obligatorio']
  },
  puedeDividirse: {
    type: Boolean,
    required: true
  },
  disponible: {
    type: Boolean,
    required: true
  }
});

export interface ICancha extends Document {
  nombre: string;
  tipo: 'entera' | 'media' | 'cuarto';
  puedeDividirse: boolean;
  disponible: boolean;
}

export const Cancha = model<ICancha>('Cancha', canchaSchema);
