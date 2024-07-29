"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.custumerRoute = void 0;
const express_1 = __importDefault(require("express"));
const customerControllers_1 = require("../controllers/customerControllers");
const verificateToken_1 = require("../../helpers/verificateToken");
exports.custumerRoute = express_1.default.Router();
exports.custumerRoute.post('/', customerControllers_1.createCostumer);
exports.custumerRoute.post('/login', customerControllers_1.loginCustumer);
exports.custumerRoute.get('/', customerControllers_1.getAllCustumer);
exports.custumerRoute.get('/active/', customerControllers_1.getAllCustumeractive);
exports.custumerRoute.use(verificateToken_1.validateToken);
exports.custumerRoute.patch('/actualizar/:id', customerControllers_1.updateCustumer);
exports.custumerRoute.delete('/:id', customerControllers_1.deleteCustumer);
