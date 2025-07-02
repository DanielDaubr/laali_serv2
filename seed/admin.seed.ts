// seed/admin.seed.ts
import mongoose from 'mongoose';
import { Admin } from '../models/admin.model';
import bcrypt from 'bcrypt';

const db = 'mongodb://127.0.0.1:27017/lacai'; // misma que usás en index.ts

mongoose.connect(db)
  .then(async () => {
    const existe = await Admin.findOne({ email: 'xeneizepoke@gmail.com' });
    if (existe) {
      console.log('⚠️  El usuario ya existe');
      return mongoose.disconnect();
    }

    const hashedPassword =  bcrypt.hashSync('labombonera', 10);

    const nuevoAdmin = new Admin({
      nickname: 'xeneize',
      email: 'xeneizepoke@gmail.com',
      celular: '3885777369',
      password: hashedPassword,
      rol: 'superadmin'
    });

    await nuevoAdmin.save();
    console.log('✅ Superadmin creado con éxito');
    mongoose.disconnect();
  })
  .catch(err => console.error('❌ Error al conectar:', err));
