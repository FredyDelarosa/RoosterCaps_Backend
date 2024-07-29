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
exports.deleteSizePermant = exports.deleteSize = exports.getAllSizeActivate = exports.getAllSize = exports.updateSize = exports.createSize = void 0;
const sizeServices_1 = require("../services/sizeServices");
const createSize = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { descripcion, created_by } = req.body;
        //Validaciones aun que no es correcto hacerlo de esta forma
        if (!descripcion || !created_by) {
            return res.status(400).json({ message: 'Missing required fields' });
        }
        const newSize = yield sizeServices_1.SizeService.createSize(descripcion, created_by);
        res.status(201).json(newSize);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.createSize = createSize;
const updateSize = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { descripcion, updated_by } = req.body;
        //Validaciones aun que no es correcto hacerlo de esta forma
        if (!id || !descripcion || !updated_by) {
            return res.status(400).json({ message: 'Missing required fields' });
        }
        const newUpdateSize = yield sizeServices_1.SizeService.updateSize(id, descripcion, updated_by);
        res.status(201).json(newUpdateSize);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.updateSize = updateSize;
const getAllSize = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const AllSize = yield sizeServices_1.SizeService.getAllSize();
        res.status(200).json(AllSize);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.getAllSize = getAllSize;
const getAllSizeActivate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const AllSize = yield sizeServices_1.SizeService.getAllSizeActivate();
        res.status(200).json(AllSize);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.getAllSizeActivate = getAllSizeActivate;
const deleteSize = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        //Validaciones aun que no es correcto hacerlo de esta forma
        if (!id) {
            return res.status(400).json({ message: 'Missing required fields' });
        }
        const sizeDelete = yield sizeServices_1.SizeService.deleteSize(id);
        res.status(200).json(sizeDelete);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.deleteSize = deleteSize;
const deleteSizePermant = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        //Validaciones aun que no es correcto hacerlo de esta forma
        if (!id) {
            return res.status(400).json({ message: 'Missing required fields' });
        }
        const sizeDelete = yield sizeServices_1.SizeService.deleteSizePermant(id);
        res.status(200).json(sizeDelete);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.deleteSizePermant = deleteSizePermant;
