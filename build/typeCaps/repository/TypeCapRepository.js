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
exports.TypeCapRepository = void 0;
const mysql_1 = require("../../database/mysql");
class TypeCapRepository {
    static createTypeCap(tipo, gorra_id, talla_id, created_by) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = 'INSERT INTO TypeCap (tipo, gorra_id, talla_id, created_by, updated_by) VALUES (?, ?, ?, ?, ?)';
                const params = [tipo, gorra_id, talla_id, created_by, created_by];
                const [result] = yield (0, mysql_1.query)(sql, params);
                // Verifica si el TypeCap fue creado exitosamente
                if (!result.insertId) {
                    throw new Error('Failed to create TypeCap, no insertId returned');
                }
                // Obtén el ID del TypeCap creado
                const createdTypeCapId = result.insertId;
                // Construye la entidad TypeCap completa
                const newTypeCap = {
                    id: createdTypeCapId,
                    tipo: tipo,
                    gorra_id: gorra_id,
                    talla_id: talla_id,
                    created_at: new Date().toISOString(),
                    created_by: created_by,
                    updated_at: new Date().toISOString(),
                    updated_by: created_by,
                    deleted: false
                };
                return newTypeCap;
            }
            catch (error) {
                throw new Error(`${error.message}`);
            }
        });
    }
    static updateTypeCap(id, tipo, updated_by) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = 'UPDATE TypeCap SET tipo = ?, updated_by = ? WHERE id = ?';
                const params = [tipo, updated_by, id];
                const [result] = yield (0, mysql_1.query)(sql, params);
                // Verifica si se actualizó algún registro
                if (result.affectedRows === 0) {
                    throw new Error('TypeCap not found or no change in data');
                }
                // Retorna un mensaje de éxito junto con el ID actualizado
                return { message: `TypeCap with ID ${id} updated successfully.` };
            }
            catch (error) {
                throw new Error(`${error.message}`);
            }
        });
    }
    static getAllTypeCaps() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = 'SELECT * FROM TypeCap';
                const [rows] = yield (0, mysql_1.query)(sql);
                // Verifica si se encontraron registros
                if (!rows.length) {
                    throw new Error('No TypeCap found');
                }
                // Retorna los registros como un arreglo de objetos TypeCap
                return rows;
            }
            catch (error) {
                throw new Error(`Error fetching TypeCap: ${error.message}`);
            }
        });
    }
    static getAllTypeCapsActive() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = 'SELECT * FROM TypeCap WHERE deleted = false';
                const [rows] = yield (0, mysql_1.query)(sql);
                // Verifica si se encontraron registros
                if (!rows.length) {
                    throw new Error('No TypeCap found');
                }
                // Retorna los registros como un arreglo de objetos TypeCap
                return rows;
            }
            catch (error) {
                throw new Error(`Error fetching TypeCap: ${error.message}`);
            }
        });
    }
    static deleteTypeCap(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = 'UPDATE TypeCap SET deleted = true WHERE id = ?';
                const params = [id];
                const [result] = yield (0, mysql_1.query)(sql, params);
                // Verifica si se actualizó algún registro
                if (result.affectedRows === 0) {
                    throw new Error('TypeCap not found or no change in data');
                }
                // Retorna un mensaje de éxito junto con el ID actualizado
                return `TypeCap with ID ${id} marked as deleted successfully.`;
            }
            catch (error) {
                throw new Error(`Error deleting TypeCap: ${error.message}`);
            }
        });
    }
    static deleteTypeCapPermanent(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = 'DELETE FROM TypeCap WHERE id = ?';
                const params = [id];
                const [result] = yield (0, mysql_1.query)(sql, params);
                // Verifica si se eliminó algún registro
                if (result.affectedRows === 0) {
                    throw new Error('TypeCap not found or no change in data');
                }
                // Retorna un mensaje de éxito junto con el ID eliminado
                return `TypeCap with ID ${id} deleted permanently successfully.`;
            }
            catch (error) {
                throw new Error(`Error deleting TypeCap: ${error.message}`);
            }
        });
    }
}
exports.TypeCapRepository = TypeCapRepository;
