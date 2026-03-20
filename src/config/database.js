/**
 * Configuración de la conexión a MySQL
 * @author Aprendiz SENA
 */

const mysql = require('mysql2');
require('dotenv').config();

// Crear pool de conexiones
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Convertir a promesas para usar async/await
const promisePool = pool.promise();

// Probar la conexión
(async () => {
    try {
        const connection = await promisePool.getConnection();
        console.log('✅ Conectado a MySQL - Base de datos:', process.env.DB_NAME);
        connection.release();
    } catch (error) {
        console.error('❌ Error de conexión a MySQL:', error.message);
        console.error('   Verifica que MySQL esté corriendo y la contraseña sea correcta');
    }
})();

module.exports = promisePool;