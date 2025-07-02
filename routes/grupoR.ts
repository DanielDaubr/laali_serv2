import { Router, Request, Response } from 'express';
import { Grupo, IGrupo } from '../models/grupo.model';
import { verificarTokenAdmin } from '../middlewares/autenticacion';

const grupoRoutes = Router();

// Obtener todos los grupos
grupoRoutes.get('/', async (req: Request, res: Response) => {
  try {
    const grupos = await Grupo.find()
      .populate('equipos', 'nombre')
      .populate('partidos')
      .populate('categoria', 'nombre')
      .populate('torneo', 'nombre');
    res.status(200).json({ ok: true, grupos });
  } catch (error) {
    res.status(500).json({ ok: false, message: 'Error al obtener grupos', error });
  }
});

// Obtener grupo por ID
grupoRoutes.get('/:id', async (req: Request, res: Response) => {
  try {
    const grupo = await Grupo.findById(req.params.id)
      .populate('equipos', 'nombre')
      .populate('partidos')
      .populate('categoria', 'nombre')
      .populate('torneo', 'nombre');

    if (!grupo) return res.status(404).json({ ok: false, message: 'Grupo no encontrado' });

    res.status(200).json({ ok: true, grupo });
  } catch (error) {
    res.status(500).json({ ok: false, message: 'Error al obtener grupo', error });
  }
});

// Crear grupo
grupoRoutes.post('/create', verificarTokenAdmin, async (req: Request, res: Response) => {
  const data: IGrupo = req.body;

  try {
    const nuevoGrupo = await Grupo.create(data);
    res.status(201).json({ ok: true, grupo: nuevoGrupo });
  } catch (error) {
    res.status(400).json({ ok: false, message: 'Error al crear grupo', error });
  }
});

// Actualizar grupo
grupoRoutes.put('/:id', verificarTokenAdmin, async (req: Request, res: Response) => {
  try {
    const grupo = await Grupo.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!grupo) return res.status(404).json({ ok: false, message: 'Grupo no encontrado' });

    res.status(200).json({ ok: true, grupo });
  } catch (error) {
    res.status(500).json({ ok: false, message: 'Error al actualizar grupo', error });
  }
});

// Eliminar grupo
grupoRoutes.delete('/:id', verificarTokenAdmin, async (req: Request, res: Response) => {
  try {
    const eliminado = await Grupo.findByIdAndDelete(req.params.id);
    if (!eliminado) return res.status(404).json({ ok: false, message: 'Grupo no encontrado' });

    res.status(200).json({ ok: true, message: 'Grupo eliminado' });
  } catch (error) {
    res.status(500).json({ ok: false, message: 'Error al eliminar grupo', error });
  }
});

// Buscar grupos por torneo
grupoRoutes.get('/torneo/:torneoId', async (req: Request, res: Response) => {
  try {
    const grupos = await Grupo.find({ torneo: req.params.torneoId })
      .populate('equipos', 'nombre')
      .populate('partidos')
      .populate('categoria', 'nombre');

    res.status(200).json({ ok: true, grupos });
  } catch (error) {
    res.status(500).json({ ok: false, message: 'Error al buscar grupos por torneo', error });
  }
});

// Buscar grupos por categoría
grupoRoutes.get('/categoria/:categoriaId', async (req: Request, res: Response) => {
  try {
    const grupos = await Grupo.find({ categoria: req.params.categoriaId })
      .populate('equipos', 'nombre')
      .populate('partidos')
      .populate('torneo', 'nombre');

    res.status(200).json({ ok: true, grupos });
  } catch (error) {
    res.status(500).json({ ok: false, message: 'Error al buscar grupos por categoría', error });
  }
});

export default grupoRoutes;
