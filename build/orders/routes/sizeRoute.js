"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderRoute = void 0;
const express_1 = __importDefault(require("express"));
const orderController_1 = require("../controllers/orderController");
exports.orderRoute = express_1.default.Router();
//orderRoute.use(validateToken)
exports.orderRoute.post('/', orderController_1.createOrder);
exports.orderRoute.get('/pending/', orderController_1.getAllPendingOrdersWithCustomer);
exports.orderRoute.patch('/date/:id', orderController_1.updateOrderDate);
exports.orderRoute.patch('/status/:id', orderController_1.updateOrderStatus);
exports.orderRoute.get('/all/asigned/date', orderController_1.getAllOrdersAsignedDate);
exports.orderRoute.get('/all/complet/order', orderController_1.getAllCompletedOrCancelledOrdersWithCustomer);
exports.orderRoute.get('/details/order/:id', orderController_1.getOrderDetails);
exports.orderRoute.get('/details/compras/:cliente_id', orderController_1.getshoppingClient);
