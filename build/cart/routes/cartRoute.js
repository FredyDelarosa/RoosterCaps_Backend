"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cartRoute = void 0;
const express_1 = __importDefault(require("express"));
const cartControler_1 = require("../controller/cartControler");
const verificateToken_1 = require("../../helpers/verificateToken");
exports.cartRoute = express_1.default.Router();
exports.cartRoute.use(verificateToken_1.validateToken);
exports.cartRoute.post("/", cartControler_1.addCartDetail);
exports.cartRoute.delete("/:id", cartControler_1.deleteCartDetail);
exports.cartRoute.get("/", cartControler_1.getAllCartDetails);
