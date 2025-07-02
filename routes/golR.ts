import { Router, Request, Response } from 'express';
import { Gol, IGol } from '../models/gol.model';
import { verificarTokenAdmin } from '../middlewares/autenticacion';

const golRoutes = Router();

// Obtener todos los goles
golRoutes.get('/', async (req: Request, res: Response) => {
  try {
    const goles = await Gol.find()
      .populate('jugador', 'nombre')
      .populate('equipo', 'nombre')
      .populate('partido');
    res.status(200).json({ ok: true, goles });
  } catch (error) {
    res.status(500).json({ ok: false, message: 'Error al obtener goles', error });
  }
});

// Crear un gol
golRoutes.post('/create', verificarTokenAdmin, async (req: Request, res: Response) => {
  const data: IGol = req.body;

  try {
    const nuevoGol = await Gol.create(data);
    res.status(201).json({ ok: true, gol: nuevoGol });
  } catch (error) {
    res.status(400).json({ ok: false, message: 'Error al registrar gol', error });
  }
});

// Obtener goles por partido
golRoutes.get('/partido/:id', async (req: Request, res: Response) => {
  try {
    const goles = await Gol.find({ partido: req.params.id })
      .populate('jugador', 'nombre')
      .populate('equipo', 'nombre');
    res.status(200).json({ ok: true, goles });
  } catch (error) {
    res.status(500).json({ ok: false, message: 'Error al obtener goles del partido', error });
  }
});

// Obtener goles por jugador
golRoutes.get('/jugador/:id', async (req: Request, res: Response) => {
  try {
    const goles = await Gol.find({ jugador: req.params.id })
      .populate('partido')
      .populate('equipo', 'nombre');
    res.status(200).json({ ok: true, goles });
  } catch (error) {
    res.status(500).json({ ok: false, message: 'Error al obtener goles del jugador', error });
  }
});

// Obtener goles por equipo
golRoutes.get('/equipo/:id', async (req: Request, res: Response) => {
  try {
    const goles = await Gol.find({ equipo: req.params.id })
      .populate('jugador', 'nombre')
      .populate('partido');
    res.status(200).json({ ok: true, goles });
  } catch (error) {
    res.status(500).json({ ok: false, message: 'Error al obtener goles del equipo', error });
  }
});

// Eliminar un gol
golRoutes.delete('/:id', verificarTokenAdmin, async (req: Request, res: Response) => {
  try {
    const eliminado = await Gol.findByIdAndDelete(req.params.id);
    if (!eliminado) return res.status(404).json({ ok: false, message: 'Gol no encontrado' });

    res.status(200).json({ ok: true, message: 'Gol eliminado' });
  } catch (error) {
    res.status(500).json({ ok: false, message: 'Error al eliminar gol', error });
  }
});

// Buscar goles por categoría
golRoutes.get('/categoria/:categoriaId', async (req: Request, res: Response) => {
    const { categoriaId } = req.params;
  
    try {
      const goles = await Gol.find()
        .populate({
          path: 'partido',
          match: { categoriaId }, // Esto depende de que Partido tenga categoriaId
        })
        .populate('jugador', 'nombre')
        .populate('equipo', 'nombre');
  
      // Filtrar goles donde el partido coincida (porque los que no coinciden serán null)
      const golesFiltrados = goles.filter(g => g.partido);
  
      res.status(200).json({ ok: true, goles: golesFiltrados });
    } catch (error) {
      res.status(500).json({ ok: false, message: 'Error al buscar goles por categoría', error });
    }
  });
  
  // Buscar goles que sean definición por penales (fuera de tiempo reglamentario)
  golRoutes.get('/definicion/:partidoId', async (req: Request, res: Response) => {
    const { partidoId } = req.params;
  
    try {
      const goles = await Gol.find({
        partido: partidoId,
        esDefinicionPorPenales: true
      })
        .populate('jugador', 'nombre')
        .populate('equipo', 'nombre');
  
      res.status(200).json({ ok: true, goles });
    } catch (error) {
      res.status(500).json({ ok: false, message: 'Error al buscar goles por definición', error });
    }
  });
  

export default golRoutes;
