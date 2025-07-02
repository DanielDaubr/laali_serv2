import { Router, Request, Response } from 'express';
import { Sede, ISede } from '../models/sede.model';
import { verificarTokenAdmin } from '../middlewares/autenticacion';

const sedeRoutes = Router();

// Obtener todas las sedes
sedeRoutes.get('/', async (_req: Request, res: Response) => {
  try {
    const sedes = await Sede.find().populate('canchas');
    res.status(200).json({ ok: true, sedes });
  } catch (error) {
    res.status(500).json({ ok: false, message: 'Error al obtener sedes', error });
  }
});

// Obtener sede por ID
sedeRoutes.get('/:id', async (req: Request, res: Response) => {
  try {
    const sede = await Sede.findById(req.params.id).populate('canchas');
    if (!sede) return res.status(404).json({ ok: false, message: 'Sede no encontrada' });

    res.status(200).json({ ok: true, sede });
  } catch (error) {
    res.status(500).json({ ok: false, message: 'Error al obtener sede', error });
  }
});

// Crear sede
sedeRoutes.post('/create', verificarTokenAdmin, async (req: Request, res: Response) => {
  try {
    const data: ISede = req.body;
    const nueva = await Sede.create(data);
    res.status(201).json({ ok: true, sede: nueva });
  } catch (error) {
    res.status(400).json({ ok: false, message: 'Error al crear sede', error });
  }
});

// Actualizar sede
sedeRoutes.put('/:id', verificarTokenAdmin, async (req: Request, res: Response) => {
  try {
    const actualizada = await Sede.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!actualizada) return res.status(404).json({ ok: false, message: 'Sede no encontrada' });

    res.status(200).json({ ok: true, sede: actualizada });
  } catch (error) {
    res.status(500).json({ ok: false, message: 'Error al actualizar sede', error });
  }
});

// Eliminar sede
sedeRoutes.delete('/:id', verificarTokenAdmin, async (req: Request, res: Response) => {
  try {
    const eliminada = await Sede.findByIdAndDelete(req.params.id);
    if (!eliminada) return res.status(404).json({ ok: false, message: 'Sede no encontrada' });

    res.status(200).json({ ok: true, message: 'Sede eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ ok: false, message: 'Error al eliminar sede', error });
  }
});

export default sedeRoutes;
