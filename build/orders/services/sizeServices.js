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
exports.OrderService = void 0;
const ordesRepository_1 = require("../repository/ordesRepository");
class OrderService {
    static createOrder(cliente_id, created_by) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield ordesRepository_1.OrdersRepository.createOrder(cliente_id, created_by);
            }
            catch (error) {
                throw new Error(`Error al crear orden: ${error.message}`);
            }
        });
    }
    static getAllPendingOrdersWithCustomer() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield ordesRepository_1.OrdersRepository.getAllPendingOrdersWithCustomer();
            }
            catch (error) {
                throw new Error(`Error al obtener las orden: ${error.message}`);
            }
        });
    }
    static updateOrderDate(id, newDate) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield ordesRepository_1.OrdersRepository.updateOrderDate(id, newDate);
            }
            catch (error) {
                throw new Error(`Error al actualizar las orden: ${error.message}`);
            }
        });
    }
    static updateOrderStatus(id, newStatus) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield ordesRepository_1.OrdersRepository.updateOrderStatus(id, newStatus);
            }
            catch (error) {
                throw new Error(`Error al actualizar las orden: ${error.message}`);
            }
        });
    }
    static getAllOrdersAsignedDate() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield ordesRepository_1.OrdersRepository.getAllOrdersAsignedDate();
            }
            catch (error) {
                throw new Error(`Error al obtener las orden: ${error.message}`);
            }
        });
    }
    static getAllCompletedOrCancelledOrdersWithCustomer() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield ordesRepository_1.OrdersRepository.getAllCompletedOrCancelledOrdersWithCustomer();
            }
            catch (error) {
                throw new Error(`Error al obtener las orden: ${error.message}`);
            }
        });
    }
    static getOrderDetails(order_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield ordesRepository_1.OrdersRepository.getOrderDetails(order_id);
            }
            catch (error) {
                throw new Error(`Error al obtener las orden: ${error.message}`);
            }
        });
    }
    static getshoppingClient(cliente_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield ordesRepository_1.OrdersRepository.getshoppingClient(cliente_id);
            }
            catch (error) {
                throw new Error(`Error al obtener los detalles de la compras: ${error.message}`);
            }
        });
    }
}
exports.OrderService = OrderService;
