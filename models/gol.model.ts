import { Schema, model, Document, Types } from 'mongoose';

const golSchema = new Schema({
  categoriaId: {
    type: Schema.Types.ObjectId,
    ref: 'Categoria',
    required: true
  },
  jugador: {
    type: Types.ObjectId,
    ref: 'Jugador',
    required: true
  },
  equipo: {
    type: Types.ObjectId,
    ref: 'Equipo',
    required: true
  },
  partido: {
    type: Types.ObjectId,
    ref: 'Partido',
    required: true
  },
  minuto: {
    type: Number
  },
  tipo: {
    type: String,
    enum: ['normal', 'penal', 'enContra'],
    default: 'normal'
  },
  esDefinicionPorPenales: {
    type: Boolean,
    default: false
  },
  creadoEn: {
    type: Date,
    default: Date.now
  }
});

export interface IGol extends Document {
  categoriaId: Types.ObjectId;
  jugador: Types.ObjectId;
  equipo: Types.ObjectId;
  partido: Types.ObjectId;
  minuto?: number;
  tipo: 'normal' | 'penal' | 'enContra';
  esDefinicionPorPenales?: boolean;
  creadoEn: Date;
}

export const Gol = model<IGol>('Gol', golSchema);
