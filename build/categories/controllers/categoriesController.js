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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCategoriesPermant = exports.deleteCategories = exports.getAllCustumerActive = exports.getAllCustumer = exports.updateCategorie = exports.createCategorie = void 0;
const categoriesService_1 = require("../services/categoriesService");
const multer_1 = __importDefault(require("multer"));
const convertImg_1 = require("../../helpers/convertImg");
// Configuración de multer para manejar la carga de archivos
const upload = (0, multer_1.default)({ storage: multer_1.default.memoryStorage() });
const createCategorie = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Utilizamos multer como middleware para manejar la carga de archivos
        upload.single('image')(req, res, (err) => __awaiter(void 0, void 0, void 0, function* () {
            if (err) {
                return res.status(400).json({ message: 'Error uploading file', error: err });
            }
            const { name, descripcion, created_by } = req.body;
            if (!name || !descripcion || !created_by) {
                return res.status(400).json({ message: 'Missing required fields' });
            }
            let base64Image = '';
            if (req.file) {
                base64Image = (0, convertImg_1.convertImageToBase64)(req.file.buffer);
            }
            const newCategoria = yield categoriesService_1.CategoriaService.createCategorie(name, descripcion, created_by, base64Image);
            res.status(201).json(newCategoria);
        }));
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.createCategorie = createCategorie;
const updateCategorie = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    upload.single('image')(req, res, (err) => __awaiter(void 0, void 0, void 0, function* () {
        if (err) {
            return res.status(400).json({ message: 'Error uploading file', error: err });
        }
        try {
            const { id } = req.params;
            const { name, descripcion, updated_by } = req.body;
            if (!id || !name || !descripcion || !updated_by) {
                return res.status(400).json({ message: 'Missing required fields' });
            }
            let base64Image = '';
            if (req.file) {
                base64Image = (0, convertImg_1.convertImageToBase64)(req.file.buffer);
            }
            const updatedCategoria = yield categoriesService_1.CategoriaService.updateCategorie(id, name, descripcion, updated_by, base64Image);
            res.status(200).json(updatedCategoria);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }));
});
exports.updateCategorie = updateCategorie;
const getAllCustumer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const AllCategorie = yield categoriesService_1.CategoriaService.getAllCategories();
        res.status(200).json(AllCategorie);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.getAllCustumer = getAllCustumer;
const getAllCustumerActive = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const AllCategorieActive = yield categoriesService_1.CategoriaService.getAllCategoriesActive();
        res.status(200).json(AllCategorieActive);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.getAllCustumerActive = getAllCustumerActive;
const deleteCategories = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const deleteCategories = yield categoriesService_1.CategoriaService.deleteCategories(id);
        res.status(200).json(deleteCategories);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.deleteCategories = deleteCategories;
const deleteCategoriesPermant = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const deleteCategories = yield categoriesService_1.CategoriaService.deleteCategoriesPermant(id);
        res.status(200).json(deleteCategories);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.deleteCategoriesPermant = deleteCategoriesPermant;
