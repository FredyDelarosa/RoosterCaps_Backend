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
exports.TypeCapService = void 0;
const TypeCapRepository_1 = require("../repository/TypeCapRepository");
class TypeCapService {
    static createTypeCap(tipo, gorra_id, talla_id, created_by) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield TypeCapRepository_1.TypeCapRepository.createTypeCap(tipo, gorra_id, talla_id, created_by);
            }
            catch (error) {
                throw new Error(`Error al crear tipo de gorra: ${error.message}`);
            }
        });
    }
    static updateTypeCap(id, tipo, updated_by) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield TypeCapRepository_1.TypeCapRepository.updateTypeCap(id, tipo, updated_by);
            }
            catch (error) {
                throw new Error(`Error al modificar tipo de gorra: ${error.message}`);
            }
        });
    }
    static getAllTypeCaps() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield TypeCapRepository_1.TypeCapRepository.getAllTypeCaps();
            }
            catch (error) {
                throw new Error(`Error al obtener los tipos de gorras: ${error.message}`);
            }
        });
    }
    static getAllTypeCapsActive() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield TypeCapRepository_1.TypeCapRepository.getAllTypeCapsActive();
            }
            catch (error) {
                throw new Error(`Error al obtener los tipos de gorras: ${error.message}`);
            }
        });
    }
    static deleteTypeCap(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield TypeCapRepository_1.TypeCapRepository.deleteTypeCap(id);
            }
            catch (error) {
                throw new Error(`Error al eliminar tipo de gorra: ${error.message}`);
            }
        });
    }
    static deleteTypeCapPermanent(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield TypeCapRepository_1.TypeCapRepository.deleteTypeCapPermanent(id);
            }
            catch (error) {
                throw new Error(`Error al eliminar tipo de gorra permanentemente: ${error.message}`);
            }
        });
    }
}
exports.TypeCapService = TypeCapService;
