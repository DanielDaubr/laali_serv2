import { Schema, model, Document, Types } from 'mongoose';

const grupoSchema = new Schema({
  nombre: {
    type: String,
    required: [true, 'El nombre del grupo es obligatorio']
  },
  equipos: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Equipo',
      required: true
    }
  ],
  partidos: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Partido'
    }
  ],
  categoria: {
    type: Schema.Types.ObjectId,
    ref: 'Categoria',
    required: true
  },
  torneo: {
    type: Schema.Types.ObjectId,
    ref: 'Torneo',
    required: true
  }
});

export interface IGrupo extends Document {
  nombre: string;
  equipos: Types.ObjectId[];
  partidos: Types.ObjectId[];
  categoria: Types.ObjectId;
  torneo: Types.ObjectId;
}

export const Grupo = model<IGrupo>('Grupo', grupoSchema);
