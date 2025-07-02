import { Router, Request, Response } from 'express';
import { ReglaClasificacion, IReglaClasificacion } from '../models/reglaClasificacion.model';
import { verificarTokenAdmin } from '../middlewares/autenticacion';

const reglaRoutes = Router();

// Obtener todas las reglas
reglaRoutes.get('/', async (_req: Request, res: Response) => {
  try {
    const reglas = await ReglaClasificacion.find();
    res.status(200).json({ ok: true, reglas });
  } catch (error) {
    res.status(500).json({ ok: false, message: 'Error al obtener reglas', error });
  }
});

// Obtener una regla por ID
reglaRoutes.get('/:id', async (req: Request, res: Response) => {
  try {
    const regla = await ReglaClasificacion.findById(req.params.id);
    if (!regla) return res.status(404).json({ ok: false, message: 'Regla no encontrada' });

    res.status(200).json({ ok: true, regla });
  } catch (error) {
    res.status(500).json({ ok: false, message: 'Error al obtener regla', error });
  }
});

// Crear nueva regla
reglaRoutes.post('/create', verificarTokenAdmin, async (req: Request, res: Response) => {
  const data: IReglaClasificacion = req.body;

  try {
    const nueva = await ReglaClasificacion.create(data);
    res.status(201).json({ ok: true, regla: nueva });
  } catch (error) {
    res.status(400).json({ ok: false, message: 'Error al crear regla', error });
  }
});

// Actualizar regla
reglaRoutes.put('/:id', verificarTokenAdmin, async (req: Request, res: Response) => {
  try {
    const actualizada = await ReglaClasificacion.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!actualizada) return res.status(404).json({ ok: false, message: 'Regla no encontrada' });

    res.status(200).json({ ok: true, regla: actualizada });
  } catch (error) {
    res.status(500).json({ ok: false, message: 'Error al actualizar regla', error });
  }
});

// Eliminar regla
reglaRoutes.delete('/:id', verificarTokenAdmin, async (req: Request, res: Response) => {
  try {
    const eliminada = await ReglaClasificacion.findByIdAndDelete(req.params.id);
    if (!eliminada) return res.status(404).json({ ok: false, message: 'Regla no encontrada' });

    res.status(200).json({ ok: true, message: 'Regla eliminada' });
  } catch (error) {
    res.status(500).json({ ok: false, message: 'Error al eliminar regla', error });
  }
});

export default reglaRoutes;
