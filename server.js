import express from "express";
import { sequelize } from "./config/db.js";
import initModels from "./models/init-models.js";

// Importar rutas (Añade las que te falten aquí)
import productoRoutes from "./routes/productosRoutes.js";
import logRoutes from "./routes/logRoutes.js";
import clientesRouter from "./routes/clientesRoutes.js";

const app = express();
app.use(express.json());
app.use((req, res, next) => {
  console.log(`📢 Petición recibida: ${req.method} en ${req.url}`);
  next();
});

// 1. INICIALIZAR MODELOS GLOBALMENTE
// Esto hace que todas las tablas se conozcan entre sí
const models = initModels(sequelize);

// 2. RUTAS
app.use("/api/productos", productoRoutes);
app.use("/api/log", logRoutes);
app.use("/api/clientes", clientesRouter);

// 3. CONEXIÓN Y SINCRONIZACIÓN
const startServer = async () => {
    try {
        await sequelize.authenticate();
        console.log("✅ Conexión establecida con la base de datos.");
        
        // Usamos alter:true para que respete los cambios en las tablas
        await sequelize.sync({ alter: true });
        console.log("✅ Tablas sincronizadas.");

        const PORT = 3000;
        app.listen(PORT, () => console.log(`🚀 Servidor en http://localhost:${PORT}`));
    } catch (error) {
        console.error("❌ Error al iniciar el sistema:", error);
    }
};

startServer();