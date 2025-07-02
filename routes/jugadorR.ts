import { Router, Request, Response } from 'express';
import { Jugador, IJugador } from '../models/jugador.model';
import { verificarTokenAdmin } from '../middlewares/autenticacion';

const jugadorRoutes = Router();

// Obtener todos los jugadores
jugadorRoutes.get('/', async (_req: Request, res: Response) => {
  try {
    const jugadores = await Jugador.find()
      .populate('institucionId', 'nombre')
      .populate('equipos', 'nombre');
    res.status(200).json({ ok: true, jugadores });
  } catch (error) {
    res.status(500).json({ ok: false, message: 'Error al obtener jugadores', error });
  }
});

// Obtener jugador por ID
jugadorRoutes.get('/:id', async (req: Request, res: Response) => {
  try {
    const jugador = await Jugador.findById(req.params.id)
      .populate('institucionId', 'nombre')
      .populate('equipos', 'nombre');
    if (!jugador) return res.status(404).json({ ok: false, message: 'Jugador no encontrado' });

    res.status(200).json({ ok: true, jugador });
  } catch (error) {
    res.status(500).json({ ok: false, message: 'Error al obtener jugador', error });
  }
});

// Crear jugador
jugadorRoutes.post('/create', verificarTokenAdmin, async (req: Request, res: Response) => {
  const data: IJugador = req.body;

  try {
    const nuevoJugador = await Jugador.create(data);
    res.status(201).json({ ok: true, jugador: nuevoJugador });
  } catch (error) {
    res.status(400).json({ ok: false, message: 'Error al crear jugador', error });
  }
});

// Actualizar jugador
jugadorRoutes.put('/:id', verificarTokenAdmin, async (req: Request, res: Response) => {
  try {
    const jugador = await Jugador.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!jugador) return res.status(404).json({ ok: false, message: 'Jugador no encontrado' });

    res.status(200).json({ ok: true, jugador });
  } catch (error) {
    res.status(500).json({ ok: false, message: 'Error al actualizar jugador', error });
  }
});

// Eliminar jugador
jugadorRoutes.delete('/:id', verificarTokenAdmin, async (req: Request, res: Response) => {
  try {
    const eliminado = await Jugador.findByIdAndDelete(req.params.id);
    if (!eliminado) return res.status(404).json({ ok: false, message: 'Jugador no encontrado' });

    res.status(200).json({ ok: true, message: 'Jugador eliminado' });
  } catch (error) {
    res.status(500).json({ ok: false, message: 'Error al eliminar jugador', error });
  }
});

// Buscar por DNI
jugadorRoutes.get('/dni/:dni', async (req: Request, res: Response) => {
  try {
    const jugador = await Jugador.findOne({ dni: req.params.dni })
      .populate('institucionId', 'nombre')
      .populate('equipos', 'nombre');

    if (!jugador) return res.status(404).json({ ok: false, message: 'Jugador no encontrado' });

    res.status(200).json({ ok: true, jugador });
  } catch (error) {
    res.status(500).json({ ok: false, message: 'Error al buscar por DNI', error });
  }
});

// Buscar por institución
jugadorRoutes.get('/institucion/:id', async (req: Request, res: Response) => {
  try {
    const jugadores = await Jugador.find({ institucionId: req.params.id })
      .populate('equipos', 'nombre');

    res.status(200).json({ ok: true, jugadores });
  } catch (error) {
    res.status(500).json({ ok: false, message: 'Error al buscar por institución', error });
  }
});

// Buscar por equipo
jugadorRoutes.get('/equipo/:id', async (req: Request, res: Response) => {
  try {
    const jugadores = await Jugador.find({ equipos: req.params.id })
      .populate('institucionId', 'nombre');

    res.status(200).json({ ok: true, jugadores });
  } catch (error) {
    res.status(500).json({ ok: false, message: 'Error al buscar por equipo', error });
  }
});

export default jugadorRoutes;
