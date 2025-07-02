import { Router, Request, Response } from 'express';
import { Categoria, ICategoria } from '../models/categoria.model';
import { verificarTokenAdmin } from '../middlewares/autenticacion';

const categoriaRoutes = Router();

// Obtener todas las categorías
categoriaRoutes.get('/', async (req: Request, res: Response) => {
  try {
    const categorias = await Categoria.find()
      .populate('grupos', 'nombre')
      .populate('fasesFinales', 'nombre')
      .populate('reglasClasificacion', 'nombre');
    res.status(200).json({ ok: true, categorias });
  } catch (error) {
    res.status(500).json({ ok: false, message: 'Error al obtener categorías', error });
  }
});

// Buscar categorías por torneo
categoriaRoutes.get('/torneo/:torneoId', async (req: Request, res: Response) => {
    const { torneoId } = req.params;
  
    try {
      const categorias = await Categoria.find({ torneo: torneoId })
        .populate('grupos')
        .populate('fasesFinales')
        .populate('reglasClasificacion');
        
      res.status(200).json({ ok: true, categorias });
    } catch (error) {
      res.status(500).json({ ok: false, message: 'Error al buscar categorías por torneo', error });
    }
  });
  

// Obtener una categoría por ID
categoriaRoutes.get('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const categoria = await Categoria.findById(id)
      .populate('grupos', 'nombre')
      .populate('fasesFinales', 'nombre')
      .populate('reglasClasificacion', 'nombre');

    if (!categoria) {
      return res.status(404).json({ ok: false, message: 'Categoría no encontrada' });
    }

    res.status(200).json({ ok: true, categoria });
  } catch (error) {
    res.status(500).json({ ok: false, message: 'Error al buscar categoría', error });
  }
});

// Crear una categoría
categoriaRoutes.post('/create', verificarTokenAdmin, async (req: Request, res: Response) => {
  const data: ICategoria = req.body;

  try {
    const nuevaCategoria = await Categoria.create(data);
    res.status(201).json({ ok: true, categoria: nuevaCategoria });
  } catch (error) {
    res.status(400).json({ ok: false, message: 'Error al crear categoría', error });
  }
});

// Actualizar una categoría
categoriaRoutes.put('/:id', verificarTokenAdmin, async (req: Request, res: Response) => {
  const { id } = req.params;
  const updateData = req.body;

  try {
    const categoriaActualizada = await Categoria.findByIdAndUpdate(id, updateData, { new: true });
    if (!categoriaActualizada) {
      return res.status(404).json({ ok: false, message: 'Categoría no encontrada' });
    }

    res.status(200).json({ ok: true, categoria: categoriaActualizada });
  } catch (error) {
    res.status(500).json({ ok: false, message: 'Error al actualizar categoría', error });
  }
});

// Eliminar una categoría
categoriaRoutes.delete('/:id', verificarTokenAdmin, async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const categoriaEliminada = await Categoria.findByIdAndDelete(id);
    if (!categoriaEliminada) {
      return res.status(404).json({ ok: false, message: 'Categoría no encontrada' });
    }

    res.status(200).json({ ok: true, message: 'Categoría eliminada' });
  } catch (error) {
    res.status(500).json({ ok: false, message: 'Error al eliminar categoría', error });
  }
});

export default categoriaRoutes;
