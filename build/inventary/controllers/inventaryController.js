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
exports.getAllInventaryCaps = exports.deleteInventaryPermanent = exports.deleteInventary = exports.getAllInventariesActive = exports.getAllInventaries = exports.updateInventary = exports.createInventary = void 0;
const InventarySerives_1 = require("../services/InventarySerives");
const createInventary = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { cantidad, gorra_id, talla_id, created_by } = req.body;
        // Validaciones, aunque no es correcto hacerlo de esta forma
        if (!cantidad || !gorra_id || !talla_id || !created_by) {
            return res.status(400).json({ message: 'Missing required fields' });
        }
        if (cantidad < 0) {
            return res.status(400).json({ message: 'Fields cannot be negative' });
        }
        const newInventary = yield InventarySerives_1.InventaryService.createInventary(cantidad, gorra_id, talla_id, created_by);
        res.status(201).json(newInventary);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.createInventary = createInventary;
const updateInventary = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { cantidad, updated_by } = req.body;
        // Validaciones, aunque no es correcto hacerlo de esta forma
        if (!id || !cantidad || !updated_by) {
            return res.status(400).json({ message: 'Missing required fields' });
        }
        if (cantidad < 0) {
            return res.status(400).json({ message: 'Fields cannot be negative' });
        }
        const updatedInventary = yield InventarySerives_1.InventaryService.updateInventary(id, cantidad, updated_by);
        res.status(200).json(updatedInventary);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.updateInventary = updateInventary;
const getAllInventaries = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allInventaries = yield InventarySerives_1.InventaryService.getAllInventaries();
        res.status(200).json(allInventaries);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.getAllInventaries = getAllInventaries;
const getAllInventariesActive = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allActiveInventaries = yield InventarySerives_1.InventaryService.getAllInventariesActive();
        res.status(200).json(allActiveInventaries);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.getAllInventariesActive = getAllInventariesActive;
const deleteInventary = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        // Validaciones, aunque no es correcto hacerlo de esta forma
        if (!id) {
            return res.status(400).json({ message: 'Missing required fields' });
        }
        const inventaryDelete = yield InventarySerives_1.InventaryService.deleteInventary(id);
        res.status(200).json(inventaryDelete);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.deleteInventary = deleteInventary;
const deleteInventaryPermanent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        // Validaciones, aunque no es correcto hacerlo de esta forma
        if (!id) {
            return res.status(400).json({ message: 'Missing required fields' });
        }
        const inventaryDelete = yield InventarySerives_1.InventaryService.deleteInventaryPermanent(id);
        res.status(200).json(inventaryDelete);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.deleteInventaryPermanent = deleteInventaryPermanent;
const getAllInventaryCaps = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allActiveInventaries = yield InventarySerives_1.InventaryService.getAllInventariCaps();
        res.status(200).json(allActiveInventaries);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.getAllInventaryCaps = getAllInventaryCaps;
