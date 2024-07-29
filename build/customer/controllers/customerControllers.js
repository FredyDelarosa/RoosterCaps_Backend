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
exports.loginCustumer = exports.deleteCustumer = exports.getAllCustumeractive = exports.getAllCustumer = exports.updateCustumer = exports.createCostumer = void 0;
const customerService_1 = require("../services/customerService");
const createCostumer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password, phone_number } = req.body;
        //Validaciones aun que no es correcto hacerlo de esta forma
        if (!name || !email || !password || !phone_number) {
            return res.status(400).json({ message: 'Missing required fields' });
        }
        const newCustumer = yield customerService_1.CustumerService.createCustomer(name, email, password, phone_number);
        res.status(201).json(newCustumer);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.createCostumer = createCostumer;
const updateCustumer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { name, phone_number } = req.body;
        console.log(id, name, phone_number);
        //Validaciones aun que no es correcto hacerlo de esta forma
        if (!id || !name || !phone_number) {
            return res.status(400).json({ message: 'Missing required fields' });
        }
        const newUpdateCustumer = yield customerService_1.CustumerService.updateCustumer(id, name, phone_number);
        res.status(201).json(newUpdateCustumer);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.updateCustumer = updateCustumer;
const getAllCustumer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const AllCustumer = yield customerService_1.CustumerService.getAllCustumer();
        res.status(200).json(AllCustumer);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.getAllCustumer = getAllCustumer;
const getAllCustumeractive = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const AllCustumer = yield customerService_1.CustumerService.getAllCustumerActive();
        res.status(200).json(AllCustumer);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.getAllCustumeractive = getAllCustumeractive;
const deleteCustumer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        //Validaciones aun que no es correcto hacerlo de esta forma
        if (!id) {
            return res.status(400).json({ message: 'Missing required fields' });
        }
        const custumerDelete = yield customerService_1.CustumerService.deleteCustumer(id);
        res.status(200).json(custumerDelete);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.deleteCustumer = deleteCustumer;
const loginCustumer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: 'Missing required fields' });
        }
        const login = yield customerService_1.CustumerService.loginCustumer(email, password);
        res.status(201).json(login);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.loginCustumer = loginCustumer;
