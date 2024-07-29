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
exports.CustumerService = void 0;
const customerRepository_1 = require("../repository/customerRepository");
const ashs_1 = require("../../helpers/ashs");
const ashs_2 = require("../../helpers/ashs");
const token_1 = require("../../helpers/token");
class CustumerService {
    static createCustomer(name, email, password, phone_number) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //Encripta la contraseña
                password = yield (0, ashs_1.encrypt)(password);
                return yield customerRepository_1.CustumerRepository.createCustumer(name, email, password, phone_number);
            }
            catch (error) {
                throw new Error(`Error al crear cliente: ${error.message}`);
            }
        });
    }
    static updateCustumer(id, name, phone_number) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield customerRepository_1.CustumerRepository.updateCustumer(id, name, phone_number);
            }
            catch (error) {
                throw new Error(`Error al modificar cliente: ${error.message}`);
            }
        });
    }
    static getAllCustumer() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield customerRepository_1.CustumerRepository.getAllCustumer();
            }
            catch (error) {
                throw new Error(`Error al modificar cliente: ${error.message}`);
            }
        });
    }
    static getAllCustumerActive() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield customerRepository_1.CustumerRepository.getAllCustumerActive();
            }
            catch (error) {
                throw new Error(`Error al modificar cliente: ${error.message}`);
            }
        });
    }
    static deleteCustumer(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield customerRepository_1.CustumerRepository.deleteCustumer(id);
            }
            catch (error) {
                throw new Error(`Error al modificar cliente: ${error.message}`);
            }
        });
    }
    static loginCustumer(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const custumer = yield customerRepository_1.CustumerRepository.getByEmail(email);
                if (!custumer) {
                    return "User not found";
                }
                const passwordVeritify = yield (0, ashs_2.compare)(password, custumer.password);
                if (!passwordVeritify) {
                    return 'Contraseña incorrecta';
                }
                const id = custumer.id.toString(); // se convierte en string el id
                const token = (0, token_1.tokenSigIn)(id, email);
                return { token: token, id: custumer.id, name: custumer.name, email: custumer.email, phone_number: custumer.phone_number };
            }
            catch (error) {
                throw new Error(`Error al modificar cliente: ${error.message}`);
            }
        });
    }
}
exports.CustumerService = CustumerService;
