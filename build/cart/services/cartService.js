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
exports.CartService = void 0;
const cartRepository_1 = require("../repository/cartRepository");
class CartService {
    static addCartDetail(cliente_id, gorra_id, tipo_gorra_id, talla_id, cantidad) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const carrito_id = yield cartRepository_1.CartRepository.getOrCreateShoppingCart(cliente_id);
                // Verificar que carrito_id no sea null
                if (!carrito_id) {
                    throw new Error('Failed to get or create shopping cart');
                }
                const status_apartado = "Pendiente";
                return yield cartRepository_1.CartRepository.addCartDetail(carrito_id, gorra_id, tipo_gorra_id, talla_id, cantidad, status_apartado);
            }
            catch (error) {
                throw new Error(`Error al crear detalle del carrito: ${error.message}`);
            }
        });
    }
    static deleteCartDetail(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield cartRepository_1.CartRepository.deleteCartDetail(id);
            }
            catch (error) {
                throw new Error(`Error al eliminar cart detail: ${error.message}`);
            }
        });
    }
    static getAllCartDetails() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield cartRepository_1.CartRepository.getAllCartDetails();
            }
            catch (error) {
                throw new Error(`Error al optener cart details: ${error.message}`);
            }
        });
    }
}
exports.CartService = CartService;
