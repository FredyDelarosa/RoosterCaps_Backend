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
exports.CapsRepository = void 0;
const mysql_1 = require("../../database/mysql");
class CapsRepository {
    static createCaps(categoria_id, name, price, created_by, imagen) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = 'INSERT INTO caps (categoria_id, name, price, created_by, updated_by, imagen) VALUES (?, ?, ?, ?, ?, ?)';
                const params = [categoria_id, name, price, created_by, created_by, imagen];
                const [result] = yield (0, mysql_1.query)(sql, params);
                // Verifica si el registro fue creado exitosamente
                if (!result.insertId) {
                    throw new Error('Failed to create cap, no insertId returned');
                }
                // Obtén el ID del registro creado
                const createdCapId = result.insertId;
                // Construye la entidad Cap completa
                const newCap = {
                    id: createdCapId,
                    categoria_id: categoria_id,
                    name: name,
                    price: price,
                    imagen: imagen,
                    created_by: created_by,
                    created_at: new Date().toISOString(),
                    updated_at: new Date().toISOString(),
                    updated_by: created_by,
                    deleted: false
                };
                return newCap;
            }
            catch (error) {
                throw new Error(`Error creating cap: ${error.message}`);
            }
        });
    }
    static updateCap(id, name, price, updated_by, imagen) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = 'UPDATE caps SET name = ?, price = ?, updated_by = ?, imagen  = ? WHERE id = ?';
                const params = [name, price, updated_by, imagen, id];
                const [result] = yield (0, mysql_1.query)(sql, params);
                // Verifica si se actualizó algún registro
                if (result.affectedRows === 0) {
                    throw new Error('cap not found or no change in data');
                }
                // Retorna un mensaje de éxito junto con el ID actualizado
                return { message: `cap with ID ${id} updated successfully.` };
            }
            catch (error) {
                throw new Error(`${error.message}`);
            }
        });
    }
    static getAllCaps() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = 'SELECT * FROM caps';
                const [rows] = yield (0, mysql_1.query)(sql);
                // Verifica si se encontraron registros
                if (!rows.length) {
                    throw new Error('No caps found');
                }
                // Retorna los registros como un arreglo de objetos Customer
                return rows;
            }
            catch (error) {
                throw new Error(`Error fetching caps: ${error.message}`);
            }
        });
    }
    static getAllCapsActive() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = 'SELECT * FROM caps WHERE deleted = false';
                const [rows] = yield (0, mysql_1.query)(sql);
                // Verifica si se encontraron registros
                if (!rows.length) {
                    throw new Error('No caps found');
                }
                // Retorna los registros como un arreglo de objetos Customer
                return rows;
            }
            catch (error) {
                throw new Error(`Error fetching caps: ${error.message}`);
            }
        });
    }
    static getByIdCap(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = 'SELECT * FROM caps WHERE id = ? AND deleted = false';
                const params = [id];
                const [rows] = yield (0, mysql_1.query)(sql, params);
                // Verifica si se encontraron registros
                if (rows.length === 0) {
                    throw new Error('Cap not found');
                }
                // Retorna el registro como un objeto Cap
                return rows[0];
            }
            catch (error) {
                throw new Error(`Error fetching cap: ${error.message}`);
            }
        });
    }
    static getCapsByCategorieId(categoria_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = 'SELECT * FROM caps WHERE categoria_id = ? AND deleted = false';
                const params = [categoria_id];
                const [rows] = yield (0, mysql_1.query)(sql, params);
                // Verifica si se encontraron registros
                if (rows.length === 0) {
                    throw new Error('No caps found for the given category');
                }
                // Retorna los registros como un arreglo de objetos Cap
                return rows;
            }
            catch (error) {
                throw new Error(`Error fetching caps: ${error.message}`);
            }
        });
    }
    static deleteCap(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = 'UPDATE caps SET deleted = true WHERE id = ?';
                const params = [id];
                const [result] = yield (0, mysql_1.query)(sql, params);
                // Verifica si se actualizó algún registro
                if (result.affectedRows === 0) {
                    throw new Error('cap not found or no change in data');
                }
                // Retorna un mensaje de éxito junto con el ID actualizado
                return `cap with ID ${id} marked as deleted successfully.`;
            }
            catch (error) {
                throw new Error(`Error deleting Categories: ${error.message}`);
            }
        });
    }
    static deleteCapPermant(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = 'DELETE FROM caps WHERE id = ?';
                const params = [id];
                const [result] = yield (0, mysql_1.query)(sql, params);
                // Verifica si se actualizó algún registro
                if (result.affectedRows === 0) {
                    throw new Error('cap not found or no change in data');
                }
                // Retorna un mensaje de éxito junto con el ID actualizado
                return `cap with ID ${id} marked as deleted permant successfully.`;
            }
            catch (error) {
                throw new Error(`Error deleting Categories: ${error.message}`);
            }
        });
    }
    static getInfoAllCap(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = `
                SELECT 
                    c.id AS cap_id,
                    c.name AS cap_name,
                    c.price AS cap_price,
                    c.imagen AS cap_imagen,
                    c.created_by AS cap_created_by,
                    c.updated_by AS cap_updated_by,
                    c.created_at AS cap_created_at,
                    c.updated_at AS cap_updated_at,
                    tc.id AS type_cap_id,
                    tc.tipo AS type_cap_tipo,
                    s.id AS size_id,
                    s.description AS size_description,
                    i.id AS inventary_id,
                    i.cantidad AS inventary_cantidad
                FROM 
                    caps c
                LEFT JOIN TypeCap tc ON c.id = tc.gorra_id AND tc.deleted = FALSE
                LEFT JOIN Size s ON tc.talla_id = s.id AND s.deleted = FALSE
                LEFT JOIN Inventary i ON c.id = i.gorra_id AND s.id = i.talla_id AND i.deleted = FALSE
                WHERE 
                    c.id = ?
                    AND c.deleted = FALSE
            `;
                const params = [id];
                const [rows] = yield (0, mysql_1.query)(sql, params);
                // Verifica si se encontraron registros
                if (rows.length === 0) {
                    throw new Error('Cap not found');
                }
                // Retorna los registros encontrados
                return rows;
            }
            catch (error) {
                throw new Error(`Error fetching cap: ${error.message}`);
            }
        });
    }
}
exports.CapsRepository = CapsRepository;
