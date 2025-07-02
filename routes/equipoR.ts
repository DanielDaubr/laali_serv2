import { Router, Request, Response } from 'express';
import { Equipo, IEquipo } from '../models/equipo.model';
import { verificarTokenAdmin } from '../middlewares/autenticacion';

const equipoRoutes = Router();

// Obtener todos los equipos
equipoRoutes.get('/', async (req: Request, res: Response) => {
  try {
    const equipos = await Equipo.find().populate('jugadores').populate('institucionId', 'nombre');
    res.status(200).json({ ok: true, equipos });
  } catch (error) {
    res.status(500).json({ ok: false, message: 'Error al obtener equipos', error });
  }
});

// Obtener un equipo por ID
equipoRoutes.get('/:id', async (req: Request, res: Response) => {
  try {
    const equipo = await Equipo.findById(req.params.id).populate('jugadores').populate('institucionId', 'nombre');
    if (!equipo) return res.status(404).json({ ok: false, message: 'Equipo no encontrado' });

    res.status(200).json({ ok: true, equipo });
  } catch (error) {
    res.status(500).json({ ok: false, message: 'Error al obtener equipo', error });
  }
});

// Crear un equipo
equipoRoutes.post('/create', verificarTokenAdmin, async (req: Request, res: Response) => {
  const data: IEquipo = req.body;

  try {
    const equipo = await Equipo.create(data);
    res.status(201).json({ ok: true, equipo });
  } catch (error) {
    res.status(400).json({ ok: false, message: 'Error al crear equipo', error });
  }
});

// Actualizar equipo
equipoRoutes.put('/:id', verificarTokenAdmin, async (req: Request, res: Response) => {
  try {
    const equipo = await Equipo.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!equipo) return res.status(404).json({ ok: false, message: 'Equipo no encontrado' });

    res.status(200).json({ ok: true, equipo });
  } catch (error) {
    res.status(500).json({ ok: false, message: 'Error al actualizar equipo', error });
  }
});

// Eliminar equipo
equipoRoutes.delete('/:id', verificarTokenAdmin, async (req: Request, res: Response) => {
  try {
    const equipo = await Equipo.findByIdAndDelete(req.params.id);
    if (!equipo) return res.status(404).json({ ok: false, message: 'Equipo no encontrado' });

    res.status(200).json({ ok: true, message: 'Equipo eliminado' });
  } catch (error) {
    res.status(500).json({ ok: false, message: 'Error al eliminar equipo', error });
  }
});

// Buscar equipos por institución
equipoRoutes.get('/institucion/:id', async (req: Request, res: Response) => {
  try {
    const equipos = await Equipo.find({ institucionId: req.params.id }).populate('jugadores');
    res.status(200).json({ ok: true, equipos });
  } catch (error) {
    res.status(500).json({ ok: false, message: 'Error al buscar equipos por institución', error });
  }
});

// Buscar equipos por categoría
equipoRoutes.get('/categoria/:nombre', async (req: Request, res: Response) => {
  try {
    const equipos = await Equipo.find({ categoria: req.params.nombre }).populate('jugadores');
    res.status(200).json({ ok: true, equipos });
  } catch (error) {
    res.status(500).json({ ok: false, message: 'Error al buscar equipos por categoría', error });
  }
});

export default equipoRoutes;
