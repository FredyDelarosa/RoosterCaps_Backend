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
exports.InventaryRepository = void 0;
const mysql_1 = require("../../database/mysql");
class InventaryRepository {
    static createInventary(cantidad, gorra_id, talla_id, created_by) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = 'INSERT INTO Inventary (cantidad, gorra_id, talla_id, created_by, updated_by) VALUES (?, ?, ?, ?, ?)';
                const params = [cantidad, gorra_id, talla_id, created_by, created_by];
                const [result] = yield (0, mysql_1.query)(sql, params);
                // Verifica si el Inventary fue creado exitosamente
                if (!result.insertId) {
                    throw new Error('Failed to create Inventary, no insertId returned');
                }
                // Obtén el ID del Inventary creado
                const createdInventaryId = result.insertId;
                // Construye la entidad Inventary completa
                const newInventary = {
                    id: createdInventaryId,
                    cantidad: cantidad,
                    gorra_id: gorra_id,
                    talla_id: talla_id,
                    created_at: new Date().toISOString(),
                    created_by: created_by,
                    updated_at: new Date().toISOString(),
                    updated_by: created_by,
                    deleted: false
                };
                return newInventary;
            }
            catch (error) {
                throw new Error(`${error.message}`);
            }
        });
    }
    static updateInventary(id, cantidad, updated_by) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = 'UPDATE Inventary SET cantidad = ?, updated_by = ? WHERE id = ?';
                const params = [cantidad, updated_by, id];
                const [result] = yield (0, mysql_1.query)(sql, params);
                // Verifica si se actualizó algún registro
                if (result.affectedRows === 0) {
                    throw new Error('Inventary not found or no change in data');
                }
                // Retorna un mensaje de éxito junto con el ID actualizado
                return { message: `Inventary with ID ${id} updated successfully.` };
            }
            catch (error) {
                throw new Error(`${error.message}`);
            }
        });
    }
    static getAllInventaries() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = 'SELECT * FROM Inventary';
                const [rows] = yield (0, mysql_1.query)(sql);
                // Verifica si se encontraron registros
                if (!rows.length) {
                    throw new Error('No Inventary found');
                }
                // Retorna los registros como un arreglo de objetos Inventary
                return rows;
            }
            catch (error) {
                throw new Error(`Error fetching Inventary: ${error.message}`);
            }
        });
    }
    static getAllInventariesActive() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = 'SELECT * FROM Inventary WHERE deleted = false';
                const [rows] = yield (0, mysql_1.query)(sql);
                // Verifica si se encontraron registros
                if (!rows.length) {
                    throw new Error('No Inventary found');
                }
                // Retorna los registros como un arreglo de objetos Inventary
                return rows;
            }
            catch (error) {
                throw new Error(`Error fetching Inventary: ${error.message}`);
            }
        });
    }
    static deleteInventary(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = 'UPDATE Inventary SET deleted = true WHERE id = ?';
                const params = [id];
                const [result] = yield (0, mysql_1.query)(sql, params);
                // Verifica si se actualizó algún registro
                if (result.affectedRows === 0) {
                    throw new Error('Inventary not found or no change in data');
                }
                // Retorna un mensaje de éxito junto con el ID actualizado
                return `Inventary with ID ${id} marked as deleted successfully.`;
            }
            catch (error) {
                throw new Error(`Error deleting Inventary: ${error.message}`);
            }
        });
    }
    static deleteInventaryPermanent(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = 'DELETE FROM Inventary WHERE id = ?';
                const params = [id];
                const [result] = yield (0, mysql_1.query)(sql, params);
                // Verifica si se eliminó algún registro
                if (result.affectedRows === 0) {
                    throw new Error('Inventary not found or no change in data');
                }
                // Retorna un mensaje de éxito junto con el ID eliminado
                return `Inventary with ID ${id} deleted permanently successfully.`;
            }
            catch (error) {
                throw new Error(`Error deleting Inventary: ${error.message}`);
            }
        });
    }
    static getAllInventariCaps() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = `
                SELECT 
                    i.*, 
                    c.id AS cap_id, 
                    c.name AS cap_name, 
                    c.price AS cap_price, 
                    c.imagen AS cap_imagen
                FROM Inventary i
                JOIN caps c ON i.gorra_id = c.id
                WHERE i.deleted = false AND c.deleted = false
            `;
                const [rows] = yield (0, mysql_1.query)(sql);
                // Verifica si se encontraron registros
                if (!rows.length) {
                    throw new Error('No Inventary found');
                }
                // Retorna los registros como un arreglo de objetos Inventary
                return rows;
            }
            catch (error) {
                throw new Error(`Error fetching Inventary: ${error.message}`);
            }
        });
    }
}
exports.InventaryRepository = InventaryRepository;
