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
exports.CustumerRepository = void 0;
const mysql_1 = require("../../database/mysql");
class CustumerRepository {
    static createCustumer(name, email, password, phone_number) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = 'INSERT INTO Customer (name, email, password, phone_number ,created_by, updated_by) VALUES (?, ?, ?, ?, ?, ?)';
                const params = [name, email, password, phone_number, name, name];
                const [result] = yield (0, mysql_1.query)(sql, params);
                // Verifica si el cliente fue creado exitosamente
                if (!result.insertId) {
                    throw new Error('Failed to create cliente, no insertId returned');
                }
                // Obtén el ID del cliente creado
                const createdCustumerId = result.insertId;
                // Construye la entidad Customer completa
                const newCustumer = {
                    id: createdCustumerId,
                    name: name,
                    email: email,
                    password: password,
                    phone_number: phone_number,
                    created_at: new Date().toISOString(),
                    created_by: name,
                    updated_at: new Date().toISOString(),
                    updated_by: name,
                    deleted: false
                };
                return newCustumer;
            }
            catch (error) {
                throw new Error(`${error.message}`);
            }
        });
    }
    static updateCustumer(id, name, phone_number) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = 'UPDATE Customer SET name = ?, phone_number = ?, updated_by = ? WHERE id = ?';
                const params = [name, phone_number, name, id];
                const [result] = yield (0, mysql_1.query)(sql, params);
                // Verifica si se actualizó algún registro
                if (result.affectedRows === 0) {
                    throw new Error('Customer not found or no change in data');
                }
                // Retorna un mensaje de éxito junto con el ID actualizado
                return { message: `Customer with ID ${id} updated successfully.` };
            }
            catch (error) {
                throw new Error(`${error.message}`);
            }
        });
    }
    static getAllCustumer() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = 'SELECT * FROM Customer';
                const [rows] = yield (0, mysql_1.query)(sql);
                // Verifica si se encontraron registros
                if (!rows.length) {
                    throw new Error('No customers found');
                }
                // Retorna los registros como un arreglo de objetos Customer
                return rows;
            }
            catch (error) {
                throw new Error(`Error fetching customers: ${error.message}`);
            }
        });
    }
    static getAllCustumerActive() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = 'SELECT * FROM Customer WHERE deleted = false';
                const [rows] = yield (0, mysql_1.query)(sql);
                // Verifica si se encontraron registros
                if (!rows.length) {
                    throw new Error('No customers');
                }
                // Retorna los registros como un arreglo de objetos Customer
                return rows;
            }
            catch (error) {
                throw new Error(`Error fetching customers: ${error.message}`);
            }
        });
    }
    static deleteCustumer(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = 'UPDATE Customer SET deleted = true WHERE id = ?';
                const params = [id];
                const [result] = yield (0, mysql_1.query)(sql, params);
                // Verifica si se actualizó algún registro
                if (result.affectedRows === 0) {
                    throw new Error('Customer not found or no change in data');
                }
                // Retorna un mensaje de éxito junto con el ID actualizado
                return `Customer with ID ${id} marked as deleted successfully.`;
            }
            catch (error) {
                throw new Error(`Error deleting customer: ${error.message}`);
            }
        });
    }
    static getByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = 'SELECT * FROM Customer WHERE email = ? AND deleted = false';
                const params = [email];
                const [rows] = yield (0, mysql_1.query)(sql, params);
                // Verifica si se encontró el registro
                if (rows.length === 0) {
                    return null;
                }
                // Retorna la información del cliente encontrado
                const customer = rows[0];
                return customer;
            }
            catch (error) {
                throw new Error(`Error fetching customer by email: ${error.message}`);
            }
        });
    }
}
exports.CustumerRepository = CustumerRepository;
