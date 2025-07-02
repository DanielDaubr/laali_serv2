import { Router, Request, Response } from 'express';
import { ReglaOrdenGrupo, IReglaOrdenGrupo } from '../models/reglaOrdenGrupo.model';
import { verificarTokenAdmin } from '../middlewares/autenticacion';

const reglaOrdenRoutes = Router();

// Obtener todas las reglas de orden
reglaOrdenRoutes.get('/', async (_req: Request, res: Response) => {
  try {
    const reglas = await ReglaOrdenGrupo.find().sort({ orden: 1 });
    res.status(200).json({ ok: true, reglas });
  } catch (error) {
    res.status(500).json({ ok: false, message: 'Error al obtener reglas de orden', error });
  }
});

// Obtener regla por ID
reglaOrdenRoutes.get('/:id', async (req: Request, res: Response) => {
  try {
    const regla = await ReglaOrdenGrupo.findById(req.params.id);
    if (!regla) return res.status(404).json({ ok: false, message: 'Regla no encontrada' });

    res.status(200).json({ ok: true, regla });
  } catch (error) {
    res.status(500).json({ ok: false, message: 'Error al obtener la regla', error });
  }
});

// Crear nueva regla
reglaOrdenRoutes.post('/create', verificarTokenAdmin, async (req: Request, res: Response) => {
  const data: IReglaOrdenGrupo = req.body;

  try {
    const nueva = await ReglaOrdenGrupo.create(data);
    res.status(201).json({ ok: true, regla: nueva });
  } catch (error) {
    res.status(400).json({ ok: false, message: 'Error al crear regla', error });
  }
});

// Actualizar regla
reglaOrdenRoutes.put('/:id', verificarTokenAdmin, async (req: Request, res: Response) => {
  try {
    const actualizada = await ReglaOrdenGrupo.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!actualizada) return res.status(404).json({ ok: false, message: 'Regla no encontrada' });

    res.status(200).json({ ok: true, regla: actualizada });
  } catch (error) {
    res.status(500).json({ ok: false, message: 'Error al actualizar regla', error });
  }
});

// Eliminar regla
reglaOrdenRoutes.delete('/:id', verificarTokenAdmin, async (req: Request, res: Response) => {
  try {
    const eliminada = await ReglaOrdenGrupo.findByIdAndDelete(req.params.id);
    if (!eliminada) return res.status(404).json({ ok: false, message: 'Regla no encontrada' });

    res.status(200).json({ ok: true, message: 'Regla eliminada' });
  } catch (error) {
    res.status(500).json({ ok: false, message: 'Error al eliminar regla', error });
  }
});

export default reglaOrdenRoutes;
