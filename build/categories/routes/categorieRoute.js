"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.categorieRoute = void 0;
const express_1 = __importDefault(require("express"));
const categoriesController_1 = require("../controllers/categoriesController");
const verificateToken_1 = require("../../helpers/verificateToken");
exports.categorieRoute = express_1.default.Router();
//Verifica el token todos las rutas que esten de bajo
exports.categorieRoute.use(verificateToken_1.validateToken);
exports.categorieRoute.post("/", categoriesController_1.createCategorie);
exports.categorieRoute.patch("/:id", categoriesController_1.updateCategorie);
exports.categorieRoute.get("/", categoriesController_1.getAllCustumer);
exports.categorieRoute.get("/activate/", categoriesController_1.getAllCustumerActive);
exports.categorieRoute.delete("/delete/:id", categoriesController_1.deleteCategories);
exports.categorieRoute.delete("/delete/permant/:id", categoriesController_1.deleteCategoriesPermant);
