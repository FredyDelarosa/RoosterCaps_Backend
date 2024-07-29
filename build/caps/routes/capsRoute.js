"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.capRouter = void 0;
const express_1 = __importDefault(require("express"));
const capsController_1 = require("../controller/capsController");
exports.capRouter = express_1.default.Router();
exports.capRouter.post('/', capsController_1.createCaps);
exports.capRouter.patch('/:id', capsController_1.updateCaps);
exports.capRouter.get('/', capsController_1.getAllCaps);
exports.capRouter.get('/activate/', capsController_1.getAllCapsActive);
exports.capRouter.get('/:id', capsController_1.getByIdCap);
exports.capRouter.get('/categorie/:categoria_id', capsController_1.getCapsByCategorieId);
exports.capRouter.delete('/:id', capsController_1.deleteCap);
exports.capRouter.delete('/delete/permant/:id', capsController_1.deleteCapPermant);
exports.capRouter.get('/all/info/:id', capsController_1.getInfoAllCap);
