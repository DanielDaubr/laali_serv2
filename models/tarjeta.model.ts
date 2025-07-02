import { Schema, model, Document, Types } from 'mongoose';

const tarjetaSchema = new Schema({
   categoriaId: {
    type: Schema.Types.ObjectId,
    ref: 'Categoria',
    required: true
  },
  partidoId: {
    type: Types.ObjectId,
    ref: 'Partido',
    required: true,
  },
  jugadorId: {
    type: Types.ObjectId,
    ref: 'Jugador',
    required: true,
  },
  equipoId: {
    type: Types.ObjectId,
    ref: 'Equipo',
    required: true,
  },
  tipo: {
    type: String,
    enum: ['amarilla', 'roja'],
    required: true,
  },
  minuto: {
    type: Number,
  },
  observaciones: {
    type: String,
  }
}, {
  timestamps: true,
});

export interface ITarjeta extends Document {
  categoriaId: Types.ObjectId;
  partidoId: Types.ObjectId;
  jugadorId: Types.ObjectId;
  equipoId: Types.ObjectId;
  tipo: 'amarilla' | 'roja';
  minuto?: number;
  observaciones?: string;
}

export const Tarjeta = model<ITarjeta>('Tarjeta', tarjetaSchema);
