"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.inventaryRoutes = void 0;
const express_1 = __importDefault(require("express"));
const verificateToken_1 = require("../../helpers/verificateToken");
const inventaryController_1 = require("../controllers/inventaryController");
exports.inventaryRoutes = express_1.default.Router();
exports.inventaryRoutes.use(verificateToken_1.validateToken);
exports.inventaryRoutes.post('/', inventaryController_1.createInventary);
exports.inventaryRoutes.patch('/:id', inventaryController_1.updateInventary);
exports.inventaryRoutes.get('/', inventaryController_1.getAllInventaries);
exports.inventaryRoutes.get('/active', inventaryController_1.getAllInventariesActive);
exports.inventaryRoutes.delete('/:id', inventaryController_1.deleteInventary);
exports.inventaryRoutes.delete('/permanent/:id', inventaryController_1.deleteInventaryPermanent);
exports.inventaryRoutes.get('/caps/', inventaryController_1.getAllInventaryCaps);
