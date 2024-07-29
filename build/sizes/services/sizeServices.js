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
exports.SizeService = void 0;
const sizeRepository_1 = require("../repository/sizeRepository");
class SizeService {
    static createSize(descripcion, created_by) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield sizeRepository_1.SizeRepository.createSize(descripcion, created_by);
            }
            catch (error) {
                throw new Error(`Error al crear talla: ${error.message}`);
            }
        });
    }
    static updateSize(id, descripcion, updated_by) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield sizeRepository_1.SizeRepository.updateSize(id, descripcion, updated_by);
            }
            catch (error) {
                throw new Error(`Error al modificar talla: ${error.message}`);
            }
        });
    }
    static getAllSize() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield sizeRepository_1.SizeRepository.getAllSize();
            }
            catch (error) {
                throw new Error(`Error al obtener las tallas: ${error.message}`);
            }
        });
    }
    static getAllSizeActivate() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield sizeRepository_1.SizeRepository.getAllSizeActive();
            }
            catch (error) {
                throw new Error(`Error al obtener las tallas: ${error.message}`);
            }
        });
    }
    static deleteSize(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield sizeRepository_1.SizeRepository.deleteSize(id);
            }
            catch (error) {
                throw new Error(`Error al eliminar cap: ${error.message}`);
            }
        });
    }
    static deleteSizePermant(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield sizeRepository_1.SizeRepository.deleteSizePermant(id);
            }
            catch (error) {
                throw new Error(`Error al eliminar cap: ${error.message}`);
            }
        });
    }
}
exports.SizeService = SizeService;
