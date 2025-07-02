import { Router, Request, Response } from 'express';
import { Institucion, IInstitucion } from '../models/institucion.model';
import { verificarTokenAdmin } from '../middlewares/autenticacion';

const institucionRoutes = Router();

// Obtener todas las instituciones
institucionRoutes.get('/', async (_req: Request, res: Response) => {
  try {
    const instituciones = await Institucion.find();
    res.status(200).json({ ok: true, instituciones });
  } catch (error) {
    res.status(500).json({ ok: false, message: 'Error al obtener instituciones', error });
  }
});

// Obtener una institución por ID
institucionRoutes.get('/:id', async (req: Request, res: Response) => {
  try {
    const institucion = await Institucion.findById(req.params.id);
    if (!institucion) return res.status(404).json({ ok: false, message: 'Institución no encontrada' });

    res.status(200).json({ ok: true, institucion });
  } catch (error) {
    res.status(500).json({ ok: false, message: 'Error al obtener institución', error });
  }
});

// Crear nueva institución
institucionRoutes.post('/create', verificarTokenAdmin, async (req: Request, res: Response) => {
  const data: IInstitucion = req.body;

  try {
    const nueva = await Institucion.create(data);
    res.status(201).json({ ok: true, institucion: nueva });
  } catch (error) {
    res.status(400).json({ ok: false, message: 'Error al crear institución', error });
  }
});

// Actualizar institución
institucionRoutes.put('/:id', verificarTokenAdmin, async (req: Request, res: Response) => {
  try {
    const actualizada = await Institucion.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!actualizada) return res.status(404).json({ ok: false, message: 'Institución no encontrada' });

    res.status(200).json({ ok: true, institucion: actualizada });
  } catch (error) {
    res.status(500).json({ ok: false, message: 'Error al actualizar institución', error });
  }
});

// Eliminar institución
institucionRoutes.delete('/:id', verificarTokenAdmin, async (req: Request, res: Response) => {
  try {
    const eliminada = await Institucion.findByIdAndDelete(req.params.id);
    if (!eliminada) return res.status(404).json({ ok: false, message: 'Institución no encontrada' });

    res.status(200).json({ ok: true, message: 'Institución eliminada' });
  } catch (error) {
    res.status(500).json({ ok: false, message: 'Error al eliminar institución', error });
  }
});

// Buscar por provincia
institucionRoutes.get('/provincia/:provincia', async (req: Request, res: Response) => {
  try {
    const instituciones = await Institucion.find({ provincia: req.params.provincia });
    res.status(200).json({ ok: true, instituciones });
  } catch (error) {
    res.status(500).json({ ok: false, message: 'Error al buscar por provincia', error });
  }
});

// Buscar por localidad
institucionRoutes.get('/localidad/:localidad', async (req: Request, res: Response) => {
  try {
    const instituciones = await Institucion.find({ localidad: req.params.localidad });
    res.status(200).json({ ok: true, instituciones });
  } catch (error) {
    res.status(500).json({ ok: false, message: 'Error al buscar por localidad', error });
  }
});

export default institucionRoutes;
