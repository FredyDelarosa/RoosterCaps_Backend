import { TypeCapRepository } from "../repository/TypeCapRepository";

export class TypeCapService{
    public static async createTypeCap(tipo: string, gorra_id: number, talla_id: number, created_by: string) {
        try {
            return await TypeCapRepository.createTypeCap(tipo, gorra_id, talla_id, created_by);
        } catch (error: any) {
            throw new Error(`Error al crear tipo de gorra: ${error.message}`);
        }
    }
    
    public static async updateTypeCap(id: string, tipo: string, updated_by: string) {
        try {
            return await TypeCapRepository.updateTypeCap(id, tipo, updated_by);
        } catch (error: any) {
            throw new Error(`Error al modificar tipo de gorra: ${error.message}`);
        }
    }
    
    public static async getAllTypeCaps() {
        try {
            return await TypeCapRepository.getAllTypeCaps();
        } catch (error: any) {
            throw new Error(`Error al obtener los tipos de gorras: ${error.message}`);
        }
    }
    
    public static async getAllTypeCapsActive() {
        try {
            return await TypeCapRepository.getAllTypeCapsActive();
        } catch (error: any) {
            throw new Error(`Error al obtener los tipos de gorras: ${error.message}`);
        }
    }
    
    public static async deleteTypeCap(id: string) {
        try {
            return await TypeCapRepository.deleteTypeCap(id);
        } catch (error: any) {
            throw new Error(`Error al eliminar tipo de gorra: ${error.message}`);
        }
    }
    
    public static async deleteTypeCapPermanent(id: string) {
        try {
            return await TypeCapRepository.deleteTypeCapPermanent(id);
        } catch (error: any) {
            throw new Error(`Error al eliminar tipo de gorra permanentemente: ${error.message}`);
        }
    }
}