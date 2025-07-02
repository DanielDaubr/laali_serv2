import { Router, Request, Response } from 'express';
import { Torneo } from '../models/torneo.model';

const router = Router();

// Obtener todos los torneos
router.get('/', async (req: Request, res: Response) => {
  try {
    const torneos = await Torneo.find()
      .populate('categorias')
      .populate('sedes')
      .populate('reglaOrdenGrupo')
      .populate('creadoPor');

    res.json({ ok: true, torneos });
  } catch (err) {
    res.status(500).json({ ok: false, error: err });
  }
});

// Obtener un torneo por ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const torneo = await Torneo.findById(req.params.id)
      .populate('categorias')
      .populate('sedes')
      .populate('reglaOrdenGrupo')
      .populate('creadoPor');

    if (!torneo) return res.status(404).json({ ok: false, msg: 'Torneo no encontrado' });

    res.json({ ok: true, torneo });
  } catch (err) {
    res.status(500).json({ ok: false, error: err });
  }
});

// Crear torneo
router.post('/', async (req: Request, res: Response) => {
  try {
    const nuevoTorneo = new Torneo(req.body);
    await nuevoTorneo.save();
    res.status(201).json({ ok: true, torneo: nuevoTorneo });
  } catch (err) {
    res.status(400).json({ ok: false, error: err });
  }
});

// Actualizar torneo
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const torneo = await Torneo.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!torneo) return res.status(404).json({ ok: false, msg: 'Torneo no encontrado' });

    res.json({ ok: true, torneo });
  } catch (err) {
    res.status(400).json({ ok: false, error: err });
  }
});

// Eliminar torneo
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const torneo = await Torneo.findByIdAndDelete(req.params.id);
    if (!torneo) return res.status(404).json({ ok: false, msg: 'Torneo no encontrado' });

    res.json({ ok: true, msg: 'Torneo eliminado' });
  } catch (err) {
    res.status(500).json({ ok: false, error: err });
  }
});

// Obtener categorías de un torneo
router.get('/:id/categorias', async (req: Request, res: Response) => {
  try {
    const torneo = await Torneo.findById(req.params.id).populate('categorias');
    if (!torneo) return res.status(404).json({ ok: false, msg: 'Torneo no encontrado' });

    res.json({ ok: true, categorias: torneo.categorias });
  } catch (err) {
    res.status(500).json({ ok: false, error: err });
  }
});

// Obtener sedes de un torneo
router.get('/:id/sedes', async (req: Request, res: Response) => {
  try {
    const torneo = await Torneo.findById(req.params.id).populate('sedes');
    if (!torneo) return res.status(404).json({ ok: false, msg: 'Torneo no encontrado' });

    res.json({ ok: true, sedes: torneo.sedes });
  } catch (err) {
    res.status(500).json({ ok: false, error: err });
  }
});

export default router;
