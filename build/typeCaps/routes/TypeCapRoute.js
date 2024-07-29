"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeCapRoutes = void 0;
const express_1 = __importDefault(require("express"));
const verificateToken_1 = require("../../helpers/verificateToken");
const TypeCapController_1 = require("../controllers/TypeCapController");
exports.typeCapRoutes = express_1.default.Router();
exports.typeCapRoutes.use(verificateToken_1.validateToken);
exports.typeCapRoutes.post('/', TypeCapController_1.createTypeCap);
exports.typeCapRoutes.patch('/:id', TypeCapController_1.updateTypeCap);
exports.typeCapRoutes.get('/', TypeCapController_1.getAllTypeCaps);
exports.typeCapRoutes.get('/activate/', TypeCapController_1.getAllTypeCapsActive);
exports.typeCapRoutes.delete('/:id', TypeCapController_1.deleteTypeCap);
exports.typeCapRoutes.delete('/permant/:id', TypeCapController_1.deleteTypeCapPermanent);
