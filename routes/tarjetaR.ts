import { Router, Request, Response } from 'express';
import { Tarjeta } from '../models/tarjeta.model';
import { verificarTokenAdmin } from '../middlewares/autenticacion';

const tarjetaRoutes = Router();

// Crear tarjeta
tarjetaRoutes.post('/create', verificarTokenAdmin, async (req: Request, res: Response) => {
  try {
    const tarjeta = await Tarjeta.create(req.body);
    res.status(201).json({ ok: true, tarjeta });
  } catch (error) {
    res.status(400).json({ ok: false, error });
  }
});

// Obtener todas las tarjetas
tarjetaRoutes.get('/', async (_req: Request, res: Response) => {
  try {
    const tarjetas = await Tarjeta.find()
      .populate('jugadorId', 'nombre apellido')
      .populate('equipoId', 'nombre')
      .populate('partidoId');
    res.status(200).json({ ok: true, tarjetas });
  } catch (error) {
    res.status(500).json({ ok: false, error });
  }
});
tarjetaRoutes.get('/categoria/:categoriaId', async (req: Request, res: Response) => {
  try {
    const tarjetas = await Tarjeta.find({ categoriaId: req.params.categoriaId })
      .populate('jugadorId', 'nombre apellido')
      .populate('equipoId', 'nombre')
      .populate('partidoId', 'fecha combinado') // útil para mostrar si fue combinado
      .populate('categoriaId', 'nombre');

    res.status(200).json({ ok: true, tarjetas });
  } catch (error) {
    res.status(500).json({ ok: false, error });
  }
});


// Obtener tarjeta por ID
tarjetaRoutes.get('/:id', async (req: Request, res: Response) => {
  try {
    const tarjeta = await Tarjeta.findById(req.params.id)
      .populate('jugadorId', 'nombre apellido')
      .populate('equipoId', 'nombre')
      .populate('partidoId');

    if (!tarjeta) return res.status(404).json({ ok: false, message: 'Tarjeta no encontrada' });

    res.status(200).json({ ok: true, tarjeta });
  } catch (error) {
    res.status(500).json({ ok: false, error });
  }
});

// Obtener tarjetas por partido
tarjetaRoutes.get('/partido/:partidoId', async (req: Request, res: Response) => {
  try {
    const tarjetas = await Tarjeta.find({ partidoId: req.params.partidoId })
      .populate('jugadorId', 'nombre apellido')
      .populate('equipoId', 'nombre');

    res.status(200).json({ ok: true, tarjetas });
  } catch (error) {
    res.status(500).json({ ok: false, error });
  }
});

// Obtener tarjetas por jugador
tarjetaRoutes.get('/jugador/:jugadorId', async (req: Request, res: Response) => {
  try {
    const tarjetas = await Tarjeta.find({ jugadorId: req.params.jugadorId })
      .populate('partidoId')
      .populate('equipoId', 'nombre');

    res.status(200).json({ ok: true, tarjetas });
  } catch (error) {
    res.status(500).json({ ok: false, error });
  }
});

// Eliminar tarjeta
tarjetaRoutes.delete('/:id', verificarTokenAdmin, async (req: Request, res: Response) => {
  try {
    const tarjeta = await Tarjeta.findByIdAndDelete(req.params.id);
    if (!tarjeta) return res.status(404).json({ ok: false, message: 'Tarjeta no encontrada' });

    res.status(200).json({ ok: true, message: 'Tarjeta eliminada' });
  } catch (error) {
    res.status(500).json({ ok: false, error });
  }
});

export default tarjetaRoutes;
