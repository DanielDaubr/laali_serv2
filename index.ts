import Server from "./classes/server";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";

// Rutas
import adminRoutes from "./routes/adminR";
import canchaRoutes from "./routes/canchaR";
import categoriaRoutes from "./routes/categoriaR";
import equipoRoutes from "./routes/equipoR";
import faseFinalRoutes from "./routes/faseFinalR";
import golRoutes from "./routes/golR";
import grupoRoutes from "./routes/grupoR";
import institucionRoutes from "./routes/institucionR";
import jugadorRoutes from "./routes/jugadorR";
import partidoRoutes from "./routes/partidoR";
import reglaClasificacionRoutes from "./routes/reglaClasificacionR";
import reglaOrdenGrupoRoutes from "./routes/reglaOrdenGrupoR";
import sedeRoutes from "./routes/sedeR";
import tarjetaRoutes from "./routes/tarjetaR";
import torneoRoutes from "./routes/torneoR";

const server = new Server();

const dbLocal = 'mongodb://127.0.0.1:27017/lacai';
// const dbNube = 'mongodb+srv://...';

// Middleware
server.app.use(bodyParser.urlencoded({ extended: true }));
server.app.use(bodyParser.json());

server.app.use(cors({
  origin: '*',
  credentials: true,
  allowedHeaders: 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method, x-token, *',
  methods: 'GET, POST, OPTIONS, PUT, DELETE',
}));

// Conexión a la base de datos
mongoose.connect(dbLocal)
  .then(() => console.log('base de datos ONLINE'))
  .catch((err) => console.log(err));

// Rutas
server.app.use('/admin', adminRoutes);
server.app.use('/cancha', canchaRoutes);
server.app.use('/categoria', categoriaRoutes);
server.app.use('/equipo', equipoRoutes);
server.app.use('/fasefinal', faseFinalRoutes);
server.app.use('/gol', golRoutes);
server.app.use('/grupo', grupoRoutes);
server.app.use('/institucion', institucionRoutes);
server.app.use('/jugador', jugadorRoutes);
server.app.use('/partido', partidoRoutes);
server.app.use('/reglaclasificacion', reglaClasificacionRoutes);
server.app.use('/regla-orden-grupo', reglaOrdenGrupoRoutes);
server.app.use('/sede', sedeRoutes);
server.app.use('/tarjeta', tarjetaRoutes);
server.app.use('/torneo', torneoRoutes);

// Levantar servidor
server.start(() => {
  console.log(`Servidor corriendo en puerto ${server.port}`);
});
