import { InventaryRepository } from "../repository/inventaryRepository";

export class InventaryService {
    public static async createInventary(cantidad: number, gorra_id: number, talla_id: number, created_by: string) {
        try {
            return await InventaryRepository.createInventary(cantidad, gorra_id, talla_id, created_by);
        } catch (error: any) {
            throw new Error(`Error al crear inventario: ${error.message}`);
        }
    }

    public static async updateInventary(id: string, cantidad: number, updated_by: string) {
        try {
            return await InventaryRepository.updateInventary(id, cantidad, updated_by);
        } catch (error: any) {
            throw new Error(`Error al modificar inventario: ${error.message}`);
        }
    }

    public static async getAllInventaries() {
        try {
            return await InventaryRepository.getAllInventaries();
        } catch (error: any) {
            throw new Error(`Error al obtener inventarios: ${error.message}`);
        }
    }

    public static async getAllInventariesActive() {
        try {
            return await InventaryRepository.getAllInventariesActive();
        } catch (error: any) {
            throw new Error(`Error al obtener inventarios activos: ${error.message}`);
        }
    }

    public static async deleteInventary(id: string) {
        try {
            return await InventaryRepository.deleteInventary(id);
        } catch (error: any) {
            throw new Error(`Error al eliminar inventario: ${error.message}`);
        }
    }

    public static async deleteInventaryPermanent(id: string) {
        try {
            return await InventaryRepository.deleteInventaryPermanent(id);
        } catch (error: any) {
            throw new Error(`Error al eliminar inventario permanentemente: ${error.message}`);
        }
    }

    public static async getAllInventariCaps() {
        try {
            return await InventaryRepository.getAllInventariCaps();
        } catch (error: any) {
            throw new Error(`Error al obtener inventarios de gorras: ${error.message}`);
        }
    }
}
