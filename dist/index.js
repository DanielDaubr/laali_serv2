"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./classes/server"));
const mongoose_1 = __importDefault(require("mongoose"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
// Rutas
const adminR_1 = __importDefault(require("./routes/adminR"));
const canchaR_1 = __importDefault(require("./routes/canchaR"));
const categoriaR_1 = __importDefault(require("./routes/categoriaR"));
const equipoR_1 = __importDefault(require("./routes/equipoR"));
const faseFinalR_1 = __importDefault(require("./routes/faseFinalR"));
const golR_1 = __importDefault(require("./routes/golR"));
const grupoR_1 = __importDefault(require("./routes/grupoR"));
const institucionR_1 = __importDefault(require("./routes/institucionR"));
const jugadorR_1 = __importDefault(require("./routes/jugadorR"));
const partidoR_1 = __importDefault(require("./routes/partidoR"));
const reglaClasificacionR_1 = __importDefault(require("./routes/reglaClasificacionR"));
const reglaOrdenGrupoR_1 = __importDefault(require("./routes/reglaOrdenGrupoR"));
const sedeR_1 = __importDefault(require("./routes/sedeR"));
const tarjetaR_1 = __importDefault(require("./routes/tarjetaR"));
const torneoR_1 = __importDefault(require("./routes/torneoR"));
const server = new server_1.default();
const dbLocal = 'mongodb://127.0.0.1:27017/lacai';
// const dbNube = 'mongodb+srv://...';
// Middleware
server.app.use(body_parser_1.default.urlencoded({ extended: true }));
server.app.use(body_parser_1.default.json());
server.app.use((0, cors_1.default)({
    origin: '*',
    credentials: true,
    allowedHeaders: 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method, x-token, *',
    methods: 'GET, POST, OPTIONS, PUT, DELETE',
}));
// Conexión a la base de datos
mongoose_1.default.connect(dbLocal)
    .then(() => console.log('base de datos ONLINE'))
    .catch((err) => console.log(err));
// Rutas
server.app.use('/admin', adminR_1.default);
server.app.use('/cancha', canchaR_1.default);
server.app.use('/categoria', categoriaR_1.default);
server.app.use('/equipo', equipoR_1.default);
server.app.use('/fasefinal', faseFinalR_1.default);
server.app.use('/gol', golR_1.default);
server.app.use('/grupo', grupoR_1.default);
server.app.use('/institucion', institucionR_1.default);
server.app.use('/jugador', jugadorR_1.default);
server.app.use('/partido', partidoR_1.default);
server.app.use('/reglaclasificacion', reglaClasificacionR_1.default);
server.app.use('/regla-orden-grupo', reglaOrdenGrupoR_1.default);
server.app.use('/sede', sedeR_1.default);
server.app.use('/tarjeta', tarjetaR_1.default);
server.app.use('/torneo', torneoR_1.default);
// Levantar servidor
server.start(() => {
    console.log(`Servidor corriendo en puerto ${server.port}`);
});
