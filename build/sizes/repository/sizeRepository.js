"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SizeRepository = void 0;
const mysql_1 = require("../../database/mysql");
class SizeRepository {
    static createSize(descripcion, created_by) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = 'INSERT INTO Size (description ,created_by, updated_by) VALUES (?, ?, ?)';
                const params = [descripcion, created_by, created_by];
                const [result] = yield (0, mysql_1.query)(sql, params);
                // Verifica si el talla fue creado exitosamente
                if (!result.insertId) {
                    throw new Error('Failed to create size, no insertId returned');
                }
                // Obtén el ID de la talla creado
                const createdCustumerId = result.insertId;
                // Construye la entidad Customer completa
                const newSize = {
                    id: createdCustumerId,
                    description: descripcion,
                    created_at: new Date().toISOString(),
                    created_by: created_by,
                    updated_at: new Date().toISOString(),
                    updated_by: created_by,
                    deleted: false
                };
                return newSize;
            }
            catch (error) {
                throw new Error(`${error.message}`);
            }
        });
    }
    static updateSize(id, descripcion, updated_by) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = 'UPDATE Size SET description = ?, updated_by = ? WHERE id = ?';
                const params = [descripcion, updated_by, id];
                const [result] = yield (0, mysql_1.query)(sql, params);
                // Verifica si se actualizó algún registro
                if (result.affectedRows === 0) {
                    throw new Error('Size not found or no change in data');
                }
                // Retorna un mensaje de éxito junto con el ID actualizado
                return { message: `Size with ID ${id} updated successfully.` };
            }
            catch (error) {
                throw new Error(`${error.message}`);
            }
        });
    }
    static getAllSize() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = 'SELECT * FROM Size';
                const [rows] = yield (0, mysql_1.query)(sql);
                // Verifica si se encontraron registros
                if (!rows.length) {
                    throw new Error('No size found');
                }
                // Retorna los registros como un arreglo de objetos Customer
                return rows;
            }
            catch (error) {
                throw new Error(`Error fetching size: ${error.message}`);
            }
        });
    }
    static getAllSizeActive() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = 'SELECT * FROM Size WHERE deleted = false';
                const [rows] = yield (0, mysql_1.query)(sql);
                // Verifica si se encontraron registros
                if (!rows.length) {
                    throw new Error('No size found');
                }
                // Retorna los registros como un arreglo de objetos Customer
                return rows;
            }
            catch (error) {
                throw new Error(`Error fetching size: ${error.message}`);
            }
        });
    }
    static deleteSize(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = 'UPDATE Size SET deleted = true WHERE id = ?';
                const params = [id];
                const [result] = yield (0, mysql_1.query)(sql, params);
                // Verifica si se actualizó algún registro
                if (result.affectedRows === 0) {
                    throw new Error('Size not found or no change in data');
                }
                // Retorna un mensaje de éxito junto con el ID actualizado
                return `Size with ID ${id} marked as deleted successfully.`;
            }
            catch (error) {
                throw new Error(`Error deleting Categories: ${error.message}`);
            }
        });
    }
    static deleteSizePermant(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = 'DELETE FROM caps WHERE id = ?';
                const params = [id];
                const [result] = yield (0, mysql_1.query)(sql, params);
                // Verifica si se actualizó algún registro
                if (result.affectedRows === 0) {
                    throw new Error('Size not found or no change in data');
                }
                // Retorna un mensaje de éxito junto con el ID actualizado
                return `Size with ID ${id} marked as deleted permant successfully.`;
            }
            catch (error) {
                throw new Error(`Error deleting Categories: ${error.message}`);
            }
        });
    }
    static updateOrderDate(id, newDate) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = 'UPDATE Orders SET date = ? WHERE id = ?';
                const params = [newDate, id];
                const [result] = yield (0, mysql_1.query)(sql, params);
                // Verifica si se actualizó algún registro
                if (result.affectedRows === 0) {
                    throw new Error('Order not found or no change in data');
                }
                // Retorna un mensaje de éxito junto con el ID actualizado
                return `Order with ID ${id} updated with new date ${newDate.toISOString()} successfully.`;
            }
            catch (error) {
                throw new Error(`Error updating order date: ${error.message}`);
            }
        });
    }
}
exports.SizeRepository = SizeRepository;
