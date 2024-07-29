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
exports.deleteTypeCapPermanent = exports.deleteTypeCap = exports.getAllTypeCapsActive = exports.getAllTypeCaps = exports.updateTypeCap = exports.createTypeCap = void 0;
const TypeCapServices_1 = require("../services/TypeCapServices");
const createTypeCap = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { tipo, gorra_id, talla_id, created_by } = req.body;
        // Validaciones, aunque no es correcto hacerlo de esta forma
        if (!tipo || !gorra_id || !talla_id || !created_by) {
            return res.status(400).json({ message: 'Missing required fields' });
        }
        const newTypeCap = yield TypeCapServices_1.TypeCapService.createTypeCap(tipo, gorra_id, talla_id, created_by);
        res.status(201).json(newTypeCap);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.createTypeCap = createTypeCap;
const updateTypeCap = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { tipo, updated_by } = req.body;
        // Validaciones, aunque no es correcto hacerlo de esta forma
        if (!id || !tipo || !updated_by) {
            return res.status(400).json({ message: 'Missing required fields' });
        }
        const updatedTypeCap = yield TypeCapServices_1.TypeCapService.updateTypeCap(id, tipo, updated_by);
        res.status(200).json(updatedTypeCap);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.updateTypeCap = updateTypeCap;
const getAllTypeCaps = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allTypeCaps = yield TypeCapServices_1.TypeCapService.getAllTypeCaps();
        res.status(200).json(allTypeCaps);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.getAllTypeCaps = getAllTypeCaps;
const getAllTypeCapsActive = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allActiveTypeCaps = yield TypeCapServices_1.TypeCapService.getAllTypeCapsActive();
        res.status(200).json(allActiveTypeCaps);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.getAllTypeCapsActive = getAllTypeCapsActive;
const deleteTypeCap = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        // Validaciones, aunque no es correcto hacerlo de esta forma
        if (!id) {
            return res.status(400).json({ message: 'Missing required fields' });
        }
        const typeCapDelete = yield TypeCapServices_1.TypeCapService.deleteTypeCap(id);
        res.status(200).json(typeCapDelete);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.deleteTypeCap = deleteTypeCap;
const deleteTypeCapPermanent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        // Validaciones, aunque no es correcto hacerlo de esta forma
        if (!id) {
            return res.status(400).json({ message: 'Missing required fields' });
        }
        const typeCapDelete = yield TypeCapServices_1.TypeCapService.deleteTypeCapPermanent(id);
        res.status(200).json(typeCapDelete);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.deleteTypeCapPermanent = deleteTypeCapPermanent;
