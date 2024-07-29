"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sizeRoutes = void 0;
const express_1 = __importDefault(require("express"));
const verificateToken_1 = require("../../helpers/verificateToken");
const sizeController_1 = require("../controllers/sizeController");
exports.sizeRoutes = express_1.default.Router();
exports.sizeRoutes.use(verificateToken_1.validateToken);
exports.sizeRoutes.post('/', sizeController_1.createSize);
exports.sizeRoutes.patch('/:id', sizeController_1.updateSize);
exports.sizeRoutes.get('/', sizeController_1.getAllSize);
exports.sizeRoutes.get('/activate/', sizeController_1.getAllSizeActivate);
exports.sizeRoutes.delete('/:id', sizeController_1.deleteSize);
exports.sizeRoutes.delete('/permant/:id', sizeController_1.deleteSizePermant);
