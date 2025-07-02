import { Schema, model, Document, Types } from 'mongoose';

const resultadoDetalleSchema = new Schema({
  tipo: {
    type: String,
    enum: ['normal', 'penales', 'tecnico'],
    required: true
  },
  golesA: {
    type: Number,
    required: true
  },
  golesB: {
    type: Number,
    required: true
  },
  observacion: {
    type: String
  }
}, { _id: false });

const partidoSchema = new Schema({
  equipoA: {
    type: Schema.Types.ObjectId,
    ref: 'Equipo',
    required: true
  },
  equipoB: {
    type: Schema.Types.ObjectId,
    ref: 'Equipo',
    required: true
  },
  resultadoDetalle: {
    type: [resultadoDetalleSchema],
    default: []
  },
  tarjetasRojasA: {
    type: Number,
    default: 0
  },
  tarjetasRojasB: {
    type: Number,
    default: 0
  },
  tarjetasAmarillasA: {
    type: Number,
    default: 0
  },
  tarjetasAmarillasB: {
    type: Number,
    default: 0
  },
  fecha: {
    type: Date,
    required: true
  },
  horario: {
    type: String, // formato "HH:mm"
    required: true
  },
  cancha: {
    type: Schema.Types.ObjectId,
    ref: 'Cancha',
    required: true
  },
  estado: {
    type: String,
    enum: ['pendiente', 'en_juego', 'finalizado', 'suspendido', 'cancelado'],
    default: 'pendiente'
  },
  categoriaId: {
    type: Schema.Types.ObjectId,
    ref: 'Categoria',
    required: true
  },
  grupoId: {
    type: Schema.Types.ObjectId,
    ref: 'Grupo'
  },
  numeroFecha: {
    type: Number
  },
  faseFinal: {
    type: Schema.Types.ObjectId,
    ref: 'FaseFinal'
  }
});

export interface ResultadoDetalle {
  tipo: 'normal' | 'penales' | 'tecnico';
  golesA: number;
  golesB: number;
  observacion?: string;
}

export interface IPartido extends Document {
  equipoA: Types.ObjectId;
  equipoB: Types.ObjectId;
  resultadoDetalle: ResultadoDetalle[];
  tarjetasRojasA: number;
  tarjetasRojasB: number;
  tarjetasAmarillasA: number;
  tarjetasAmarillasB: number;
  fecha: Date;
  horario: string;
  cancha: Types.ObjectId;
  estado: 'pendiente' | 'en_juego' | 'finalizado' | 'suspendido' | 'cancelado';
  categoriaId: Types.ObjectId;
  grupoId?: Types.ObjectId;
  numeroFecha?: number;
  faseFinal?: Types.ObjectId;
}

export const Partido = model<IPartido>('Partido', partidoSchema);
