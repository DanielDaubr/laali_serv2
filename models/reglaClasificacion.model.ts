import { Schema, model, Document } from 'mongoose';

const reglaClasificacionSchema = new Schema({
  orden: {
    type: Number,
    required: true
  },
  descripcion: {
    type: String
  },
  origen: {
    fase: {
      type: String,
      enum: ['grupos', 'faseFinal'],
      required: true
    },
    puestos: {
      type: [Number],
      required: true
    },
    cantidad: {
      type: Number
    },
    mejores: {
      puesto: Number,
      cantidad: Number
    }
  },
  destino: {
    copa: {
      type: String,
      enum: ['oro', 'plata', 'bronce'],
      required: true
    },
    etapa: {
      type: String,
      enum: ['octavos', 'cuartos', 'semifinal', 'final'],
      required: true
    }
  }
});

export interface IReglaClasificacion extends Document {
  orden: number;
  descripcion?: string;
  origen: {
    fase: 'grupos' | 'faseFinal';
    puestos: number[];
    cantidad?: number;
    mejores?: {
      puesto: number;
      cantidad: number;
    };
  };
  destino: {
    copa: 'oro' | 'plata' | 'bronce';
    etapa: 'octavos' | 'cuartos' | 'semifinal' | 'final';
  };
}

export const ReglaClasificacion = model<IReglaClasificacion>('ReglaClasificacion', reglaClasificacionSchema);
