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
exports.getInfoAllCap = exports.deleteCapPermant = exports.deleteCap = exports.getCapsByCategorieId = exports.getByIdCap = exports.getAllCapsActive = exports.getAllCaps = exports.updateCaps = exports.createCaps = void 0;
const capsService_1 = require("../services/capsService");
const multer_1 = __importDefault(require("multer"));
const convertImg_1 = require("../../helpers/convertImg");
const upload = (0, multer_1.default)({ storage: multer_1.default.memoryStorage() });
const createCaps = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Utilizamos multer como middleware para manejar la carga de archivos
    upload.single('image')(req, res, (err) => __awaiter(void 0, void 0, void 0, function* () {
        if (err) {
            return res.status(400).json({ message: 'Error uploading file', error: err });
        }
        try {
            const { categoria_id, name, price, created_by } = req.body;
            if (!categoria_id || !name || !price || !created_by) {
                return res.status(400).json({ message: 'Missing required fields' });
            }
            let base64Image = '';
            if (req.file) {
                base64Image = (0, convertImg_1.convertImageToBase64)(req.file.buffer);
            }
            const newCap = yield capsService_1.CapsService.createCaps(categoria_id, name, price, created_by, base64Image);
            res.status(201).json(newCap);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }));
});
exports.createCaps = createCaps;
const updateCaps = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    upload.single('image')(req, res, (err) => __awaiter(void 0, void 0, void 0, function* () {
        if (err) {
            return res.status(400).json({ message: 'Error uploading file', error: err });
        }
        try {
            const { id } = req.params;
            const { name, price, updated_by } = req.body;
            if (!id || !name || !price || !updated_by) {
                return res.status(400).json({ message: 'Missing required fields' });
            }
            let base64Image = '';
            if (req.file) {
                base64Image = (0, convertImg_1.convertImageToBase64)(req.file.buffer);
            }
            const updateCap = yield capsService_1.CapsService.updateCaps(id, name, price, updated_by, base64Image);
            res.status(201).json(updateCap);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }));
});
exports.updateCaps = updateCaps;
const getAllCaps = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const AllCaps = yield capsService_1.CapsService.getAllCaps();
        res.status(200).json(AllCaps);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.getAllCaps = getAllCaps;
const getAllCapsActive = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const AllCaps = yield capsService_1.CapsService.getAllCapsActivate();
        res.status(200).json(AllCaps);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.getAllCapsActive = getAllCapsActive;
const getByIdCap = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const AllCaps = yield capsService_1.CapsService.getByIdCap(id);
        res.status(200).json(AllCaps);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.getByIdCap = getByIdCap;
const getCapsByCategorieId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { categoria_id } = req.params;
        const AllCaps = yield capsService_1.CapsService.getCapsByCategorieId(categoria_id);
        res.status(200).json(AllCaps);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.getCapsByCategorieId = getCapsByCategorieId;
const deleteCap = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        //Validaciones aun que no es correcto hacerlo de esta forma
        if (!id) {
            return res.status(400).json({ message: 'Missing required fields' });
        }
        const capDelete = yield capsService_1.CapsService.deleteCap(id);
        res.status(200).json(capDelete);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.deleteCap = deleteCap;
const deleteCapPermant = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        //Validaciones aun que no es correcto hacerlo de esta forma
        if (!id) {
            return res.status(400).json({ message: 'Missing required fields' });
        }
        const capDelete = yield capsService_1.CapsService.deleteCapPermant(id);
        res.status(200).json(capDelete);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.deleteCapPermant = deleteCapPermant;
const getInfoAllCap = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        //Validaciones aun que no es correcto hacerlo de esta forma
        if (!id) {
            return res.status(400).json({ message: 'Missing required fields' });
        }
        const getCap = yield capsService_1.CapsService.getInfoAllCap(id);
        res.status(200).json(getCap);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.getInfoAllCap = getInfoAllCap;
