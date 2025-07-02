import { Router, Request, Response } from 'express';
import { Partido, IPartido } from '../models/partido.model';
import { verificarTokenAdmin } from '../middlewares/autenticacion';

const partidoRoutes = Router();

// Obtener todos los partidos
partidoRoutes.get('/', async (_req: Request, res: Response) => {
  try {
    const partidos = await Partido.find()
      .populate('equipoA', 'nombre')
      .populate('equipoB', 'nombre')
      .populate('cancha', 'nombre')
      .populate('categoriaId', 'nombre')
      .populate('grupoId', 'nombre')
      .populate('faseFinal');
    res.status(200).json({ ok: true, partidos });
  } catch (error) {
    res.status(500).json({ ok: false, message: 'Error al obtener partidos', error });
  }
});

// Obtener partido por ID
partidoRoutes.get('/:id', async (req: Request, res: Response) => {
  try {
    const partido = await Partido.findById(req.params.id)
      .populate('equipoA', 'nombre')
      .populate('equipoB', 'nombre')
      .populate('cancha', 'nombre')
      .populate('categoriaId', 'nombre')
      .populate('grupoId', 'nombre')
      .populate('faseFinal');

    if (!partido) return res.status(404).json({ ok: false, message: 'Partido no encontrado' });

    res.status(200).json({ ok: true, partido });
  } catch (error) {
    res.status(500).json({ ok: false, message: 'Error al obtener partido', error });
  }
});

// Crear partido
partidoRoutes.post('/create', verificarTokenAdmin, async (req: Request, res: Response) => {
  const data: IPartido = req.body;

  try {
    const nuevoPartido = await Partido.create(data);
    res.status(201).json({ ok: true, partido: nuevoPartido });
  } catch (error) {
    res.status(400).json({ ok: false, message: 'Error al crear partido', error });
  }
});

// Actualizar partido
partidoRoutes.put('/:id', verificarTokenAdmin, async (req: Request, res: Response) => {
  try {
    const partido = await Partido.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!partido) return res.status(404).json({ ok: false, message: 'Partido no encontrado' });

    res.status(200).json({ ok: true, partido });
  } catch (error) {
    res.status(500).json({ ok: false, message: 'Error al actualizar partido', error });
  }
});

// Eliminar partido
partidoRoutes.delete('/:id', verificarTokenAdmin, async (req: Request, res: Response) => {
  try {
    const partido = await Partido.findByIdAndDelete(req.params.id);
    if (!partido) return res.status(404).json({ ok: false, message: 'Partido no encontrado' });

    res.status(200).json({ ok: true, message: 'Partido eliminado' });
  } catch (error) {
    res.status(500).json({ ok: false, message: 'Error al eliminar partido', error });
  }
});

// Buscar partidos por grupo
partidoRoutes.get('/grupo/:grupoId', async (req: Request, res: Response) => {
  try {
    const partidos = await Partido.find({ grupoId: req.params.grupoId });
    res.status(200).json({ ok: true, partidos });
  } catch (error) {
    res.status(500).json({ ok: false, message: 'Error al buscar partidos por grupo', error });
  }
});

// Buscar partidos por categoría
partidoRoutes.get('/categoria/:categoriaId', async (req: Request, res: Response) => {
  try {
    const partidos = await Partido.find({ categoriaId: req.params.categoriaId });
    res.status(200).json({ ok: true, partidos });
  } catch (error) {
    res.status(500).json({ ok: false, message: 'Error al buscar partidos por categoría', error });
  }
});

// Buscar partidos por fase final
partidoRoutes.get('/fase/:faseFinalId', async (req: Request, res: Response) => {
  try {
    const partidos = await Partido.find({ faseFinal: req.params.faseFinalId });
    res.status(200).json({ ok: true, partidos });
  } catch (error) {
    res.status(500).json({ ok: false, message: 'Error al buscar partidos por fase final', error });
  }
});

// Buscar partidos donde juega un equipo
partidoRoutes.get('/equipo/:equipoId', async (req: Request, res: Response) => {
  try {
    const partidos = await Partido.find({
      $or: [
        { equipoA: req.params.equipoId },
        { equipoB: req.params.equipoId }
      ]
    });
    res.status(200).json({ ok: true, partidos });
  } catch (error) {
    res.status(500).json({ ok: false, message: 'Error al buscar partidos por equipo', error });
  }
});

export default partidoRoutes;
