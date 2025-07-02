import { Router, Request, Response } from 'express';
import { Cancha, ICancha } from '../models/cancha.model';
import { verificarTokenAdmin } from '../middlewares/autenticacion';

const canchaRoutes = Router();

// Obtener todas las canchas
canchaRoutes.get('/', async (req: Request, res: Response) => {
  try {
    const canchas = await Cancha.find();
    res.status(200).json({ ok: true, canchas });
  } catch (error) {
    res.status(500).json({ ok: false, message: 'Error al obtener canchas', error });
  }
});
// Buscar canchas por sede
canchaRoutes.get('/sede/:sedeId', async (req: Request, res: Response) => {
    const { sedeId } = req.params;
  
    try {
      const canchas = await Cancha.find({ sede: sedeId });
      res.status(200).json({ ok: true, canchas });
    } catch (error) {
      res.status(500).json({ ok: false, message: 'Error al buscar canchas por sede', error });
    }
  });
  

// Obtener una cancha por ID
canchaRoutes.get('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const cancha = await Cancha.findById(id);
    if (!cancha) return res.status(404).json({ ok: false, message: 'Cancha no encontrada' });
    res.status(200).json({ ok: true, cancha });
  } catch (error) {
    res.status(500).json({ ok: false, message: 'Error al buscar cancha', error });
  }
});

// Crear una cancha
canchaRoutes.post('/create', verificarTokenAdmin, async (req: Request, res: Response) => {
  const data: ICancha = req.body;

  try {
    const nuevaCancha = await Cancha.create(data);
    res.status(201).json({ ok: true, cancha: nuevaCancha });
  } catch (error) {
    res.status(400).json({ ok: false, message: 'Error al crear cancha', error });
  }
});

// Actualizar una cancha
canchaRoutes.put('/:id', verificarTokenAdmin, async (req: Request, res: Response) => {
  const { id } = req.params;
  const updateData = req.body;

  try {
    const canchaActualizada = await Cancha.findByIdAndUpdate(id, updateData, { new: true });
    if (!canchaActualizada) return res.status(404).json({ ok: false, message: 'Cancha no encontrada' });
    res.status(200).json({ ok: true, cancha: canchaActualizada });
  } catch (error) {
    res.status(500).json({ ok: false, message: 'Error al actualizar cancha', error });
  }
});

// Eliminar una cancha
canchaRoutes.delete('/:id', verificarTokenAdmin, async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const canchaEliminada = await Cancha.findByIdAndDelete(id);
    if (!canchaEliminada) return res.status(404).json({ ok: false, message: 'Cancha no encontrada' });
    res.status(200).json({ ok: true, message: 'Cancha eliminada' });
  } catch (error) {
    res.status(500).json({ ok: false, message: 'Error al eliminar cancha', error });
  }
});

export default canchaRoutes;
