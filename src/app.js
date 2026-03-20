/**
 * Aplicación principal de VerduSys API
 * @author Aprendiz SENA
 * @version 1.0
 */

const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Importar rutas
const verduraRoutes = require('./routes/verduraRoutes');

const app = express();

// Middlewares globales
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
app.use('/api/verduras', verduraRoutes);

// Ruta de prueba
app.get('/', (req, res) => {
    res.json({
        nombre: 'VerduSys API',
        version: '1.0.0',
        descripcion: 'API REST para sistema de inventario de verduras',
        endpoints: {
            listar: 'GET /api/verduras',
            buscar: 'GET /api/verduras/:id',
            stockBajo: 'GET /api/verduras/stock/bajo',
            crear: 'POST /api/verduras',
            actualizar: 'PUT /api/verduras/:id',
            eliminar: 'DELETE /api/verduras/:id'
        }
    });
});

// Ruta ping para verificar que la API está viva
app.get('/ping', (req, res) => {
    res.json({ 
        success: true, 
        mensaje: '🏓 VerduSys API funcionando correctamente',
        timestamp: new Date().toISOString()
    });
});

// Manejo de errores 404
app.use((req, res) => {
    res.status(404).json({
        success: false,
        mensaje: 'Ruta no encontrada'
    });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log('=========================================');
    console.log('  🥬 VERDUSYS API - SISTEMA DE INVENTARIO');
    console.log(`  🌐 http://localhost:${PORT}`);
    console.log('=========================================');
    console.log('  Endpoints disponibles:');
    console.log(`  GET    http://localhost:${PORT}/api/verduras`);
    console.log(`  GET    http://localhost:${PORT}/api/verduras/stock/bajo`);
    console.log(`  GET    http://localhost:${PORT}/api/verduras/:id`);
    console.log(`  POST   http://localhost:${PORT}/api/verduras`);
    console.log(`  PUT    http://localhost:${PORT}/api/verduras/:id`);
    console.log(`  DELETE http://localhost:${PORT}/api/verduras/:id`);
    console.log(`  GET    http://localhost:${PORT}/ping`);
    console.log('=========================================');
});

module.exports = app;