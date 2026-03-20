/**
 * Controlador de Verduras - Maneja las peticiones HTTP
 * @author Aprendiz SENA
 */

const VerduraModel = require('../models/verduraModel');

class VerduraController {
    
    /**
     * GET /api/verduras
     * Obtener todas las verduras
     */
    static async obtenerTodas(req, res) {
        try {
            const verduras = await VerduraModel.obtenerTodas();
            
            // Agregar campo calculado: stockBajo
            const verdurasConEstado = verduras.map(v => ({
                ...v,
                stockBajo: v.cantidad <= v.stock_minimo,
                valorTotal: v.cantidad * v.precio
            }));
            
            res.json({
                success: true,
                count: verduras.length,
                data: verdurasConEstado
            });
        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({
                success: false,
                mensaje: 'Error al obtener las verduras'
            });
        }
    }
    
    /**
     * GET /api/verduras/:id
     * Obtener una verdura por ID
     */
    static async obtenerPorId(req, res) {
        try {
            const id = parseInt(req.params.id);
            
            if (isNaN(id) || id <= 0) {
                return res.status(400).json({
                    success: false,
                    mensaje: 'ID inválido'
                });
            }
            
            const verdura = await VerduraModel.obtenerPorId(id);
            
            if (!verdura) {
                return res.status(404).json({
                    success: false,
                    mensaje: `No se encontró verdura con ID ${id}`
                });
            }
            
            res.json({
                success: true,
                data: {
                    ...verdura,
                    stockBajo: verdura.cantidad <= verdura.stock_minimo,
                    valorTotal: verdura.cantidad * verdura.precio
                }
            });
        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({
                success: false,
                mensaje: 'Error al obtener la verdura'
            });
        }
    }
    
    /**
     * GET /api/verduras/stock/bajo
     * Obtener verduras con stock bajo
     */
    static async obtenerStockBajo(req, res) {
        try {
            const verduras = await VerduraModel.obtenerStockBajo();
            
            res.json({
                success: true,
                count: verduras.length,
                data: verduras
            });
        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({
                success: false,
                mensaje: 'Error al obtener verduras con stock bajo'
            });
        }
    }
    
    /**
     * POST /api/verduras
     * Crear una nueva verdura
     */
    static async crear(req, res) {
        try {
            const { nombre, cantidad, precio, proveedor, stock_minimo } = req.body;
            
            // Validaciones
            if (!nombre || nombre.trim() === '') {
                return res.status(400).json({
                    success: false,
                    mensaje: 'El nombre es obligatorio'
                });
            }
            
            if (cantidad === undefined || cantidad < 0) {
                return res.status(400).json({
                    success: false,
                    mensaje: 'La cantidad debe ser un número positivo'
                });
            }
            
            if (precio === undefined || precio <= 0) {
                return res.status(400).json({
                    success: false,
                    mensaje: 'El precio debe ser mayor a 0'
                });
            }
            
            const nuevaVerdura = await VerduraModel.crear({
                nombre,
                cantidad: parseInt(cantidad),
                precio: parseFloat(precio),
                proveedor,
                stock_minimo: stock_minimo || 10
            });
            
            res.status(201).json({
                success: true,
                mensaje: 'Verdura creada exitosamente',
                data: nuevaVerdura
            });
        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({
                success: false,
                mensaje: 'Error al crear la verdura'
            });
        }
    }
    
    /**
     * PUT /api/verduras/:id
     * Actualizar una verdura existente
     */
    static async actualizar(req, res) {
        try {
            const id = parseInt(req.params.id);
            const { nombre, cantidad, precio, proveedor, stock_minimo } = req.body;
            
            if (isNaN(id) || id <= 0) {
                return res.status(400).json({
                    success: false,
                    mensaje: 'ID inválido'
                });
            }
            
            // Verificar que la verdura existe
            const verduraExistente = await VerduraModel.obtenerPorId(id);
            if (!verduraExistente) {
                return res.status(404).json({
                    success: false,
                    mensaje: `No se encontró verdura con ID ${id}`
                });
            }
            
            // Validaciones
            if (!nombre || nombre.trim() === '') {
                return res.status(400).json({
                    success: false,
                    mensaje: 'El nombre es obligatorio'
                });
            }
            
            if (cantidad === undefined || cantidad < 0) {
                return res.status(400).json({
                    success: false,
                    mensaje: 'La cantidad debe ser un número positivo'
                });
            }
            
            if (precio === undefined || precio <= 0) {
                return res.status(400).json({
                    success: false,
                    mensaje: 'El precio debe ser mayor a 0'
                });
            }
            
            const actualizado = await VerduraModel.actualizar(id, {
                nombre,
                cantidad: parseInt(cantidad),
                precio: parseFloat(precio),
                proveedor,
                stock_minimo: stock_minimo || 10
            });
            
            if (actualizado) {
                res.json({
                    success: true,
                    mensaje: 'Verdura actualizada exitosamente'
                });
            } else {
                res.status(500).json({
                    success: false,
                    mensaje: 'No se pudo actualizar la verdura'
                });
            }
        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({
                success: false,
                mensaje: 'Error al actualizar la verdura'
            });
        }
    }
    
    /**
     * DELETE /api/verduras/:id
     * Eliminar una verdura
     */
    static async eliminar(req, res) {
        try {
            const id = parseInt(req.params.id);
            
            if (isNaN(id) || id <= 0) {
                return res.status(400).json({
                    success: false,
                    mensaje: 'ID inválido'
                });
            }
            
            // Verificar que la verdura existe
            const verduraExistente = await VerduraModel.obtenerPorId(id);
            if (!verduraExistente) {
                return res.status(404).json({
                    success: false,
                    mensaje: `No se encontró verdura con ID ${id}`
                });
            }
            
            const eliminado = await VerduraModel.eliminar(id);
            
            if (eliminado) {
                res.json({
                    success: true,
                    mensaje: 'Verdura eliminada exitosamente'
                });
            } else {
                res.status(500).json({
                    success: false,
                    mensaje: 'No se pudo eliminar la verdura'
                });
            }
        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({
                success: false,
                mensaje: 'Error al eliminar la verdura'
            });
        }
    }
}

module.exports = VerduraController;