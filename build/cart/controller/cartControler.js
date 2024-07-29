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
exports.getAllCartDetails = exports.deleteCartDetail = exports.addCartDetail = void 0;
const cartService_1 = require("../services/cartService");
const addCartDetail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { cliente_id, gorra_id, tipo_gorra_id, talla_id, cantidad } = req.body;
        if (!cliente_id || !gorra_id || !tipo_gorra_id || !talla_id || !cantidad) {
            return res.status(400).json({ message: 'Missing required fields' });
        }
        const addCart = yield cartService_1.CartService.addCartDetail(cliente_id, gorra_id, tipo_gorra_id, talla_id, cantidad);
        res.status(201).json(addCart);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.addCartDetail = addCartDetail;
const deleteCartDetail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        //Validaciones aun que no es correcto hacerlo de esta forma
        if (!id) {
            return res.status(400).json({ message: 'Missing required fields' });
        }
        const cartDelete = yield cartService_1.CartService.deleteCartDetail(id);
        res.status(200).json(cartDelete);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.deleteCartDetail = deleteCartDetail;
const getAllCartDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const AllCarts = yield cartService_1.CartService.getAllCartDetails();
        res.status(200).json(AllCarts);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.getAllCartDetails = getAllCartDetails;
