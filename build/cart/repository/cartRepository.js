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
exports.CartRepository = void 0;
const mysql_1 = require("../../database/mysql");
class CartRepository {
    static getOrCreateShoppingCart(cliente_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Verificar si el usuario ya tiene un carrito
                const checkCartSql = 'SELECT id FROM ShoppingCart WHERE cliente_id = ?';
                const [existingCart] = yield (0, mysql_1.query)(checkCartSql, [cliente_id]);
                if (existingCart.length > 0) {
                    // Si ya existe un carrito, retornar el ID del carrito existente
                    return existingCart[0].id;
                }
                else {
                    // Si no existe un carrito, crear uno nuevo
                    const createCartSql = 'INSERT INTO ShoppingCart (cliente_id, created_at, updated_at) VALUES (?, NOW(), NOW())';
                    const [result] = yield (0, mysql_1.query)(createCartSql, [cliente_id]);
                    if (!result.insertId) {
                        throw new Error('Failed to create shopping cart, no insertId returned');
                    }
                    return result.insertId;
                }
            }
            catch (error) {
                throw new Error(`Error getting or creating shopping cart: ${error.message}`);
            }
        });
    }
    static addCartDetail(carrito_id, gorra_id, tipo_gorra_id, talla_id, cantidad, status_apartado) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Verificar la disponibilidad en el inventario
                const checkInventorySql = 'SELECT cantidad FROM Inventary WHERE gorra_id = ? AND talla_id = ?';
                const [inventory] = yield (0, mysql_1.query)(checkInventorySql, [gorra_id, talla_id]);
                if (inventory.length === 0 || inventory[0].cantidad < cantidad) {
                    throw new Error('Insufficient inventory for the requested cap and size');
                }
                // Crear el detalle del carrito
                const createCartDetailSql = 'INSERT INTO CartDetails (carrito_id, gorra_id, tipo_gorra_id, talla_id, cantidad, status_apartado, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, NOW(), NOW())';
                const params = [carrito_id, gorra_id, tipo_gorra_id, talla_id, cantidad, status_apartado];
                const [result] = yield (0, mysql_1.query)(createCartDetailSql, params);
                if (!result.insertId) {
                    throw new Error('Failed to create cart detail, no insertId returned');
                }
                // Construir y retornar el objeto CartDetails
                const createdCartDetail = {
                    id: result.insertId,
                    carrito_id: carrito_id,
                    gorra_id: gorra_id,
                    tipo_gorra_id: tipo_gorra_id,
                    talla_id: talla_id,
                    cantidad: cantidad,
                    status_apartado: status_apartado,
                    created_at: new Date().toISOString(),
                    updated_at: new Date().toISOString()
                };
                return createdCartDetail;
            }
            catch (error) {
                throw new Error(`Error adding cart detail: ${error.message}`);
            }
        });
    }
    static deleteCartDetail(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = 'DELETE FROM cartdetails WHERE id = ?';
                const params = [id];
                const [result] = yield (0, mysql_1.query)(sql, params);
                // Verifica si se actualizó algún registro
                if (result.affectedRows === 0) {
                    throw new Error('cap not found or no change in data');
                }
                // Retorna un mensaje de éxito junto con el ID actualizado
                return `cart details with ID ${id} marked as deleted permant successfully.`;
            }
            catch (error) {
                throw new Error(`Error deleting Categories: ${error.message}`);
            }
        });
    }
    static getAllCartDetails() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = 'SELECT * FROM CartDetails WHERE status_apartado = "Pendiente"';
                const [cartDetails] = yield (0, mysql_1.query)(sql);
                if (!cartDetails.length) {
                    throw new Error('No cart details found');
                }
                const result = [];
                for (const detail of cartDetails) {
                    const [cap] = yield (0, mysql_1.query)('SELECT id, name, price, imagen FROM caps WHERE id = ?', [detail.gorra_id]);
                    if (!cap.length) {
                        throw new Error(`No cap found with id ${detail.gorra_id}`);
                    }
                    const [typeCap] = yield (0, mysql_1.query)('SELECT id, tipo FROM TypeCap WHERE id = ?', [detail.tipo_gorra_id]);
                    if (!typeCap.length) {
                        throw new Error(`No typeCap found with id ${detail.tipo_gorra_id}`);
                    }
                    const [size] = yield (0, mysql_1.query)('SELECT id, description FROM Size WHERE id = ?', [detail.talla_id]);
                    if (!size.length) {
                        throw new Error(`No size found with id ${detail.talla_id}`);
                    }
                    const priceInt = parseFloat(cap[0].price);
                    const cantidadInt = parseInt(detail.cantidad);
                    const price_total = priceInt * cantidadInt;
                    result.push({
                        id: detail.id,
                        carrito_id: detail.carrito_id,
                        gorra: {
                            id: cap[0].id,
                            name: cap[0].name,
                            price: cap[0].price,
                            imagen: cap[0].imagen
                        },
                        tipo_gorra: {
                            id: typeCap[0].id,
                            tipo: typeCap[0].tipo
                        },
                        talla: {
                            id: size[0].id,
                            description: size[0].description
                        },
                        cantidad: detail.cantidad,
                        price_total: price_total,
                        status_apartado: detail.status_apartado,
                        created_at: detail.created_at,
                        updated_at: detail.updated_at
                    });
                }
                return result;
            }
            catch (error) {
                throw new Error(`Error fetching details: ${error.message}`);
            }
        });
    }
}
exports.CartRepository = CartRepository;
