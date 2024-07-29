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
exports.getshoppingClient = exports.getOrderDetails = exports.getAllCompletedOrCancelledOrdersWithCustomer = exports.getAllOrdersAsignedDate = exports.updateOrderStatus = exports.updateOrderDate = exports.getAllPendingOrdersWithCustomer = exports.createOrder = void 0;
const sizeServices_1 = require("../services/sizeServices");
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { cliente_id, created_by } = req.body;
        //Validaciones aun que no es correcto hacerlo de esta forma
        if (!cliente_id || !created_by) {
            return res.status(400).json({ message: 'Missing required fields' });
        }
        const newSize = yield sizeServices_1.OrderService.createOrder(cliente_id, created_by);
        res.status(201).json(newSize);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.createOrder = createOrder;
const getAllPendingOrdersWithCustomer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const Allordes = yield sizeServices_1.OrderService.getAllPendingOrdersWithCustomer();
        res.status(200).json(Allordes);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.getAllPendingOrdersWithCustomer = getAllPendingOrdersWithCustomer;
const updateOrderDate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { new_date } = req.body;
        //Validaciones aun que no es correcto hacerlo de esta forma
        if (!id || !new_date) {
            return res.status(400).json({ message: 'Missing required fields' });
        }
        const Allordes = yield sizeServices_1.OrderService.updateOrderDate(id, new_date);
        res.status(200).json(Allordes);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.updateOrderDate = updateOrderDate;
const updateOrderStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { newStatus } = req.body;
        //Validaciones aun que no es correcto hacerlo de esta forma
        if (!id || !newStatus) {
            return res.status(400).json({ message: 'Missing required fields' });
        }
        const updateStatus = yield sizeServices_1.OrderService.updateOrderStatus(id, newStatus);
        res.status(200).json(updateStatus);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.updateOrderStatus = updateOrderStatus;
const getAllOrdersAsignedDate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const Allordes = yield sizeServices_1.OrderService.getAllOrdersAsignedDate();
        res.status(200).json(Allordes);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.getAllOrdersAsignedDate = getAllOrdersAsignedDate;
const getAllCompletedOrCancelledOrdersWithCustomer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const Allordes = yield sizeServices_1.OrderService.getAllCompletedOrCancelledOrdersWithCustomer();
        res.status(200).json(Allordes);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.getAllCompletedOrCancelledOrdersWithCustomer = getAllCompletedOrCancelledOrdersWithCustomer;
const getOrderDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        //Validaciones aun que no es correcto hacerlo de esta forma
        if (!id) {
            return res.status(400).json({ message: 'Missing required fields' });
        }
        const updateStatus = yield sizeServices_1.OrderService.getOrderDetails(id);
        res.status(200).json(updateStatus);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.getOrderDetails = getOrderDetails;
const getshoppingClient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { cliente_id } = req.params;
        //Validaciones aun que no es correcto hacerlo de esta forma
        if (!cliente_id) {
            return res.status(400).json({ message: 'Missing required fields' });
        }
        const updateStatus = yield sizeServices_1.OrderService.getshoppingClient(cliente_id);
        res.status(200).json(updateStatus);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.getshoppingClient = getshoppingClient;
