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
exports.CategoriaService = void 0;
const categoriesRepository_1 = require("../repository/categoriesRepository");
class CategoriaService {
    static createCategorie(name, descripcion, created_by, image) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield categoriesRepository_1.CategorieRepository.createCategorie(name, descripcion, created_by, image);
            }
            catch (error) {
                throw new Error(`Error al crear categorie: ${error.message}`);
            }
        });
    }
    static updateCategorie(id, name, descripcion, updated_by, image) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield categoriesRepository_1.CategorieRepository.updateCategorie(id, name, descripcion, updated_by, image);
            }
            catch (error) {
                throw new Error(`Error al crear categorie: ${error.message}`);
            }
        });
    }
    static getAllCategories() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield categoriesRepository_1.CategorieRepository.getAllCategories();
            }
            catch (error) {
                throw new Error(`Error al crear categorie: ${error.message}`);
            }
        });
    }
    static getAllCategoriesActive() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield categoriesRepository_1.CategorieRepository.getAllCategoriesActive();
            }
            catch (error) {
                throw new Error(`Error al crear categorie: ${error.message}`);
            }
        });
    }
    static deleteCategories(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield categoriesRepository_1.CategorieRepository.deleteCategorie(id);
            }
            catch (error) {
                throw new Error(`Error al crear categorie: ${error.message}`);
            }
        });
    }
    static deleteCategoriesPermant(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield categoriesRepository_1.CategorieRepository.deleteCategoriePermant(id);
            }
            catch (error) {
                throw new Error(`Error al crear categorie: ${error.message}`);
            }
        });
    }
}
exports.CategoriaService = CategoriaService;
