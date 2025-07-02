import { Schema, model, Document, Types } from 'mongoose';

const faseFinalSchema = new Schema({
  torneoId: {
    type: Schema.Types.ObjectId,
    ref: 'Torneo',
    required: true
  },
  categoriaId: {
    type: Schema.Types.ObjectId,
    ref: 'Categoria',
    required: true
  },
  copa: {
    type: String,
    enum: ['oro', 'plata', 'bronce'],
    required: true
  },
  etapa: {
    type: String,
    enum: ['octavos', 'cuartos', 'semifinal', 'final'],
    required: true
  },
  partidos: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Partido',
      required: true
    }
  ]
});

export interface IFaseFinal extends Document {
  torneoId: Types.ObjectId;
  categoriaId: Types.ObjectId;
  copa: 'oro' | 'plata' | 'bronce';
  etapa: 'octavos' | 'cuartos' | 'semifinal' | 'final';
  partidos: Types.ObjectId[];
}

export const FaseFinal = model<IFaseFinal>('FaseFinal', faseFinalSchema);
