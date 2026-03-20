/**
 * Modelo de Verdura - Operaciones con la base de datos
 * @author Aprendiz SENA
 */

const db = require('../config/database');

class VerduraModel {
    
    /**
     * Obtener todas las verduras
     * @returns {Array} Lista de verduras
     */
    static async obtenerTodas() {
        const [rows] = await db.query('SELECT * FROM verduras ORDER BY nombre');
        return rows;
    }
    
    /**
     * Obtener una verdura por ID
     * @param {number} id - ID de la verdura
     * @returns {Object|null} Verdura encontrada o null
     */
    static async obtenerPorId(id) {
        const [rows] = await db.query('SELECT * FROM verduras WHERE id = ?', [id]);
        return rows.length > 0 ? rows[0] : null;
    }
    
    /**
     * Obtener verduras con stock bajo (cantidad <= stock_minimo)
     * @returns {Array} Lista de verduras con stock bajo
     */
    static async obtenerStockBajo() {
        const [rows] = await db.query(
            'SELECT * FROM verduras WHERE cantidad <= stock_minimo ORDER BY cantidad ASC'
        );
        return rows;
    }
    
    /**
     * Crear una nueva verdura
     * @param {Object} verdura - Datos de la verdura
     * @returns {Object} Verdura creada con su ID
     */
    static async crear(verdura) {
        const { nombre, cantidad, precio, proveedor, stock_minimo } = verdura;
        
        const [result] = await db.query(
            `INSERT INTO verduras 
            (nombre, cantidad, precio, proveedor, stock_minimo) 
            VALUES (?, ?, ?, ?, ?)`,
            [nombre, cantidad, precio, proveedor, stock_minimo || 10]
        );
        
        return {
            id: result.insertId,
            ...verdura
        };
    }
    
    /**
     * Actualizar una verdura existente
     * @param {number} id - ID de la verdura
     * @param {Object} verdura - Datos actualizados
     * @returns {boolean} true si se actualizó
     */
    static async actualizar(id, verdura) {
        const { nombre, cantidad, precio, proveedor, stock_minimo } = verdura;
        
        const [result] = await db.query(
            `UPDATE verduras 
            SET nombre = ?, cantidad = ?, precio = ?, proveedor = ?, stock_minimo = ?
            WHERE id = ?`,
            [nombre, cantidad, precio, proveedor, stock_minimo, id]
        );
        
        return result.affectedRows > 0;
    }
    
    /**
     * Eliminar una verdura
     * @param {number} id - ID de la verdura
     * @returns {boolean} true si se eliminó
     */
    static async eliminar(id) {
        const [result] = await db.query('DELETE FROM verduras WHERE id = ?', [id]);
        return result.affectedRows > 0;
    }
}

module.exports = VerduraModel;