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
exports.CategorieRepository = void 0;
const mysql_1 = require("../../database/mysql");
class CategorieRepository {
    static createCategorie(name, descripcion, created_by, image) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = 'INSERT INTO categories (name, descripcion, created_by, updated_by, imagen) VALUES (?, ?, ?, ?, ?)';
                const params = [name, descripcion, created_by, created_by, image];
                const [result] = yield (0, mysql_1.query)(sql, params);
                // Verifica si la categoría fue creada exitosamente
                if (!result.insertId) {
                    throw new Error('Failed to create categorie, no insertId returned');
                }
                // Obtén el ID de la categoría creada
                const createdCategorieId = result.insertId;
                // Construye la entidad Categories completa
                const newCategorie = {
                    id: createdCategorieId,
                    name: name,
                    descripcion: descripcion,
                    image: image,
                    created_by: created_by,
                    created_at: new Date().toISOString(),
                    updated_at: new Date().toISOString(),
                    updated_by: created_by,
                    deleted: false
                };
                return newCategorie;
            }
            catch (error) {
                throw new Error(`Error creating categorie: ${error.message}`);
            }
        });
    }
    static updateCategorie(id, name, descripcion, updated_by, imagen) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = 'UPDATE categories SET name = ?, descripcion = ?, updated_by = ?, imagen = ? WHERE id = ?';
                const params = [name, descripcion, updated_by, imagen, id];
                const [result] = yield (0, mysql_1.query)(sql, params);
                // Verifica si se actualizó algún registro
                if (result.affectedRows === 0) {
                    throw new Error('Customer not found or no change in data');
                }
                // Retorna un mensaje de éxito junto con el ID actualizado
                return { message: `Categorie with ID ${id} updated successfully.` };
            }
            catch (error) {
                throw new Error(`${error.message}`);
            }
        });
    }
    static getAllCategories() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = 'SELECT * FROM categories';
                const [rows] = yield (0, mysql_1.query)(sql);
                // Verifica si se encontraron registros
                if (!rows.length) {
                    throw new Error('No categories found');
                }
                // Retorna los registros como un arreglo de objetos Customer
                return rows;
            }
            catch (error) {
                throw new Error(`Error fetching customers: ${error.message}`);
            }
        });
    }
    static getAllCategoriesActive() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = 'SELECT * FROM categories WHERE deleted = false';
                const [rows] = yield (0, mysql_1.query)(sql);
                // Verifica si se encontraron registros
                if (!rows.length) {
                    throw new Error('No categories found');
                }
                // Retorna los registros como un arreglo de objetos Customer
                return rows;
            }
            catch (error) {
                throw new Error(`Error fetching customers: ${error.message}`);
            }
        });
    }
    static deleteCategorie(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = 'UPDATE categories SET deleted = true WHERE id = ?';
                const params = [id];
                const [result] = yield (0, mysql_1.query)(sql, params);
                // Verifica si se actualizó algún registro
                if (result.affectedRows === 0) {
                    throw new Error('Categories not found or no change in data');
                }
                // Retorna un mensaje de éxito junto con el ID actualizado
                return `Categorie with ID ${id} marked as deleted successfully.`;
            }
            catch (error) {
                throw new Error(`Error deleting Categories: ${error.message}`);
            }
        });
    }
    static deleteCategoriePermant(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = 'DELETE FROM categories WHERE id = ?';
                const params = [id];
                const [result] = yield (0, mysql_1.query)(sql, params);
                // Verifica si se eliminó algún registro
                if (result.affectedRows === 0) {
                    throw new Error('Category not found or no records deleted');
                }
                // Retorna un mensaje de éxito junto con el ID eliminado
                return `Category with ID ${id} deleted successfully.`;
            }
            catch (error) {
                throw new Error(`Error deleting category: ${error.message}`);
            }
        });
    }
}
exports.CategorieRepository = CategorieRepository;
