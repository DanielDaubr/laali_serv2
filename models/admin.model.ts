import { Schema, model, Document } from 'mongoose';
import bcrypt from 'bcrypt';

const adminSchema = new Schema({
  nickname: {
    type: String,
    unique: true,
    required: [true, '']
  },
  email: {
    type: String,
    unique: true,
    required: [true, 'Ingresa un email válido']
  },
  celular: {  
    type: String,
    unique: true,
    required: [true, 'El número de celular es obligatorio']
  },
  password: {
    type: String,
    required: [true, 'Ingresa una contraseña']
  },
  rol: {
    type: String,
    enum: ['superadmin', 'organizador', 'juez'], // Podés agregar los que necesites
    default: 'organizador',
    required: [true, 'El rol es obligatorio']
  }
});

adminSchema.methods.compararPassword = function(password: string): boolean {
  return bcrypt.compareSync(password, this.password);
};

export interface IAdmin extends Document {
  nickname: string;
  email: string;
  password: string;
  celular: string;
  rol: 'superadmin' | 'organizador' | 'juez';
  compararPassword(password: string): boolean;
}

export const Admin = model<IAdmin>('Admin', adminSchema);
