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
exports.InventaryService = void 0;
const inventaryRepository_1 = require("../repository/inventaryRepository");
class InventaryService {
    static createInventary(cantidad, gorra_id, talla_id, created_by) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield inventaryRepository_1.InventaryRepository.createInventary(cantidad, gorra_id, talla_id, created_by);
            }
            catch (error) {
                throw new Error(`Error al crear inventario: ${error.message}`);
            }
        });
    }
    static updateInventary(id, cantidad, updated_by) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield inventaryRepository_1.InventaryRepository.updateInventary(id, cantidad, updated_by);
            }
            catch (error) {
                throw new Error(`Error al modificar inventario: ${error.message}`);
            }
        });
    }
    static getAllInventaries() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield inventaryRepository_1.InventaryRepository.getAllInventaries();
            }
            catch (error) {
                throw new Error(`Error al obtener inventarios: ${error.message}`);
            }
        });
    }
    static getAllInventariesActive() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield inventaryRepository_1.InventaryRepository.getAllInventariesActive();
            }
            catch (error) {
                throw new Error(`Error al obtener inventarios activos: ${error.message}`);
            }
        });
    }
    static deleteInventary(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield inventaryRepository_1.InventaryRepository.deleteInventary(id);
            }
            catch (error) {
                throw new Error(`Error al eliminar inventario: ${error.message}`);
            }
        });
    }
    static deleteInventaryPermanent(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield inventaryRepository_1.InventaryRepository.deleteInventaryPermanent(id);
            }
            catch (error) {
                throw new Error(`Error al eliminar inventario permanentemente: ${error.message}`);
            }
        });
    }
    static getAllInventariCaps() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield inventaryRepository_1.InventaryRepository.getAllInventariCaps();
            }
            catch (error) {
                throw new Error(`Error al obtener inventarios de gorras: ${error.message}`);
            }
        });
    }
}
exports.InventaryService = InventaryService;
