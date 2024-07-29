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
exports.CapsService = void 0;
const capsRepository_1 = require("../repository/capsRepository");
class CapsService {
    static createCaps(categoria_id, name, price, created_by, imagen) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield capsRepository_1.CapsRepository.createCaps(categoria_id, name, price, created_by, imagen);
            }
            catch (error) {
                throw new Error(`Error al crear categorie: ${error.message}`);
            }
        });
    }
    static updateCaps(id, name, price, updated_by, imagen) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield capsRepository_1.CapsRepository.updateCap(id, name, price, updated_by, imagen);
            }
            catch (error) {
                throw new Error(`Error al actualizar categorie: ${error.message}`);
            }
        });
    }
    static getAllCaps() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield capsRepository_1.CapsRepository.getAllCaps();
            }
            catch (error) {
                throw new Error(`Error al optener caps: ${error.message}`);
            }
        });
    }
    static getAllCapsActivate() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield capsRepository_1.CapsRepository.getAllCapsActive();
            }
            catch (error) {
                throw new Error(`Error al optener caps: ${error.message}`);
            }
        });
    }
    static getByIdCap(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield capsRepository_1.CapsRepository.getByIdCap(id);
            }
            catch (error) {
                throw new Error(`Error al optener cap: ${error.message}`);
            }
        });
    }
    static getCapsByCategorieId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield capsRepository_1.CapsRepository.getCapsByCategorieId(id);
            }
            catch (error) {
                throw new Error(`Error al optener cap: ${error.message}`);
            }
        });
    }
    static deleteCap(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield capsRepository_1.CapsRepository.deleteCap(id);
            }
            catch (error) {
                throw new Error(`Error al eliminar cap: ${error.message}`);
            }
        });
    }
    static deleteCapPermant(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield capsRepository_1.CapsRepository.deleteCapPermant(id);
            }
            catch (error) {
                throw new Error(`Error al eliminar cap: ${error.message}`);
            }
        });
    }
    static getInfoAllCap(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield capsRepository_1.CapsRepository.getInfoAllCap(id);
            }
            catch (error) {
                throw new Error(`Error al obtener la toda la informacion de la gorra: ${error.message}`);
            }
        });
    }
}
exports.CapsService = CapsService;
