import { Router, Request, Response } from 'express';
import { FaseFinal, IFaseFinal } from '../models/faseFinal.model';
import { verificarTokenAdmin } from '../middlewares/autenticacion';

const faseFinalRoutes = Router();

// Obtener todas las fases finales
faseFinalRoutes.get('/', async (req: Request, res: Response) => {
  try {
    const fases = await FaseFinal.find()
      .populate('torneoId', 'nombre')
      .populate('categoriaId', 'nombre')
      .populate('partidos');
    res.status(200).json({ ok: true, fases });
  } catch (error) {
    res.status(500).json({ ok: false, message: 'Error al obtener fases finales', error });
  }
});

// Obtener una por ID
faseFinalRoutes.get('/:id', async (req: Request, res: Response) => {
  try {
    const fase = await FaseFinal.findById(req.params.id)
      .populate('torneoId')
      .populate('categoriaId')
      .populate('partidos');
    if (!fase) return res.status(404).json({ ok: false, message: 'Fase final no encontrada' });

    res.status(200).json({ ok: true, fase });
  } catch (error) {
    res.status(500).json({ ok: false, message: 'Error al obtener fase final', error });
  }
});

// Crear una nueva fase final
faseFinalRoutes.post('/create', verificarTokenAdmin, async (req: Request, res: Response) => {
  const data: IFaseFinal = req.body;

  try {
    const nuevaFase = await FaseFinal.create(data);
    res.status(201).json({ ok: true, fase: nuevaFase });
  } catch (error) {
    res.status(400).json({ ok: false, message: 'Error al crear fase final', error });
  }
});

// Actualizar fase final
faseFinalRoutes.put('/:id', verificarTokenAdmin, async (req: Request, res: Response) => {
  try {
    const fase = await FaseFinal.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!fase) return res.status(404).json({ ok: false, message: 'Fase final no encontrada' });

    res.status(200).json({ ok: true, fase });
  } catch (error) {
    res.status(500).json({ ok: false, message: 'Error al actualizar fase final', error });
  }
});

// Eliminar fase final
faseFinalRoutes.delete('/:id', verificarTokenAdmin, async (req: Request, res: Response) => {
  try {
    const fase = await FaseFinal.findByIdAndDelete(req.params.id);
    if (!fase) return res.status(404).json({ ok: false, message: 'Fase final no encontrada' });

    res.status(200).json({ ok: true, message: 'Fase final eliminada' });
  } catch (error) {
    res.status(500).json({ ok: false, message: 'Error al eliminar fase final', error });
  }
});

// Buscar por torneo
faseFinalRoutes.get('/torneo/:torneoId', async (req: Request, res: Response) => {
  try {
    const fases = await FaseFinal.find({ torneoId: req.params.torneoId })
      .populate('categoriaId', 'nombre')
      .populate('partidos');
    res.status(200).json({ ok: true, fases });
  } catch (error) {
    res.status(500).json({ ok: false, message: 'Error al buscar por torneo', error });
  }
});

// Buscar por torneo y categoría
faseFinalRoutes.get('/torneo/:torneoId/categoria/:categoriaId', async (req: Request, res: Response) => {
  const { torneoId, categoriaId } = req.params;

  try {
    const fases = await FaseFinal.find({ torneoId, categoriaId })
      .populate('partidos');
    res.status(200).json({ ok: true, fases });
  } catch (error) {
    res.status(500).json({ ok: false, message: 'Error al buscar por torneo y categoría', error });
  }
});

export default faseFinalRoutes;
