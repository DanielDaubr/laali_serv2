import { Router, Response, Request } from 'express';
import { Admin, IAdmin } from '../models/admin.model';
import bcrypt from 'bcrypt';
import TokenAdmin from '../classes/token';
import { verificarTokenAdmin } from '../middlewares/autenticacion';

const adminRoutes = Router();

// Ruta de prueba
adminRoutes.get('/prueba', (req: Request, res: Response) => {
    res.json({
        ok: true,
        mje: 'todo ok'
    });
});

// Crear nuevo admin
adminRoutes.post('/create', async (req: Request, res: Response) => {
    const admin: IAdmin = req.body;
    admin.password = bcrypt.hashSync(req.body.password, 10);

    try {
        const adminDB = await Admin.create(admin);
        const tokenadmin = TokenAdmin.getJwtToken({
            _id: adminDB._id,
            nickname: adminDB.nickname,
            email: adminDB.email,
            celular: adminDB.celular,
        });
        res.status(201).json({ ok: true, token: tokenadmin });
    } catch (err) {
        res.status(500).json({ ok: false, message: 'Error al crear admin', err });
    }
});

// Login de admin
adminRoutes.post('/login', async (req: Request, res: Response) => {
    const { nickname, password } = req.body;

    try {
        const adminDB = await Admin.findOne({ nickname });

        if (!adminDB) {
            return res.status(400).json({ ok: false, message: 'nickname no válido' });
        }

        const validPassword = bcrypt.compareSync(password, adminDB.password);

        if (!validPassword) {
            return res.status(400).json({ ok: false, message: 'Contraseña incorrecta' });
        }

        const tokenadmin = TokenAdmin.getJwtToken({
            _id: adminDB._id,
            nickname: adminDB.nickname,
            email: adminDB.email,
            celular: adminDB.celular,
        });

        res.status(200).json({ ok: true, token: tokenadmin });

    } catch (err) {
        res.status(500).json({ ok: false, message: 'Error en login', err });
    }
});

// Obtener perfil
adminRoutes.get('/profile', verificarTokenAdmin, async (req: any, res: Response) => {
    const admin = await Admin.findById(req.admin._id).select('-password');
    res.status(200).json({ ok: true, admin });
});

// Actualizar perfil
adminRoutes.put('/update', verificarTokenAdmin, async (req: any, res: Response) => {
    const { nickname, celular, password } = req.body;
    const updateData: Partial<IAdmin> = {
        nickname,
        celular
    };

    if (password) {
        updateData.password = bcrypt.hashSync(password, 10);
    }

    try {
        const updatedAdmin = await Admin.findByIdAndUpdate(req.admin._id, updateData, { new: true });
        res.status(200).json({ ok: true, admin: updatedAdmin });
    } catch (err) {
        res.status(500).json({ ok: false, message: 'Error al actualizar', err });
    }
});

// Eliminar cuenta
adminRoutes.delete('/delete', verificarTokenAdmin, async (req: any, res: Response) => {
    try {
        await Admin.findByIdAndDelete(req.admin._id);
        res.status(200).json({ ok: true, message: 'Cuenta eliminada' });
    } catch (err) {
        res.status(500).json({ ok: false, message: 'Error al eliminar cuenta', err });
    }
});

export default adminRoutes;
