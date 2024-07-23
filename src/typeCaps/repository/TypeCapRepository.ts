import { query } from "../../database/mysql";
import { TypeCap } from "../models/typeCap";

export class TypeCapRepository{
    public static async createTypeCap(tipo: string, gorra_id: number, talla_id: number, created_by: string): Promise<TypeCap | any> {
        try {
            const sql = 'INSERT INTO TypeCap (tipo, gorra_id, talla_id, created_by, updated_by) VALUES (?, ?, ?, ?, ?)';
            const params = [tipo, gorra_id, talla_id, created_by, created_by];
    
            const [result]: any = await query(sql, params);
    
            // Verifica si el TypeCap fue creado exitosamente
            if (!result.insertId) {
                throw new Error('Failed to create TypeCap, no insertId returned');
            }
    
            // Obtén el ID del TypeCap creado
            const createdTypeCapId = result.insertId;
    
            // Construye la entidad TypeCap completa
            const newTypeCap: TypeCap = {
                id: createdTypeCapId,
                tipo: tipo,
                gorra_id: gorra_id,
                talla_id: talla_id,
                created_at: new Date().toISOString(),
                created_by: created_by,
                updated_at: new Date().toISOString(),
                updated_by: created_by,
                deleted: false
            };
    
            return newTypeCap;
            
        } catch (error: any) {
            throw new Error(`${error.message}`);
        }
    }
    public static async updateTypeCap(id: string, tipo: string, updated_by: string): Promise<TypeCap | string | any> {
        try {
            const sql = 'UPDATE TypeCap SET tipo = ?, updated_by = ? WHERE id = ?';
            const params = [tipo, updated_by, id];
            const [result]: any = await query(sql, params);
    
            // Verifica si se actualizó algún registro
            if (result.affectedRows === 0) {
                throw new Error('TypeCap not found or no change in data');
            }
    
            // Retorna un mensaje de éxito junto con el ID actualizado
            return { message: `TypeCap with ID ${id} updated successfully.` };
            
        } catch (error: any) {
            throw new Error(`${error.message}`);
        }
    }
    
    public static async getAllTypeCaps(): Promise<TypeCap[]> {
        try {
            const sql = 'SELECT * FROM TypeCap';
            const [rows]: any = await query(sql);
            
            // Verifica si se encontraron registros
            if (!rows.length) {
                throw new Error('No TypeCap found');
            }
    
            // Retorna los registros como un arreglo de objetos TypeCap
            return rows as TypeCap[];
        } catch (error: any) {
            throw new Error(`Error fetching TypeCap: ${error.message}`);
        }
    }
    
    public static async getAllTypeCapsActive(): Promise<TypeCap[]> {
        try {
            const sql = 'SELECT * FROM TypeCap WHERE deleted = false';
            const [rows]: any = await query(sql);
            
            // Verifica si se encontraron registros
            if (!rows.length) {
                throw new Error('No TypeCap found');
            }
    
            // Retorna los registros como un arreglo de objetos TypeCap
            return rows as TypeCap[];
        } catch (error: any) {
            throw new Error(`Error fetching TypeCap: ${error.message}`);
        }
    }
    
    public static async deleteTypeCap(id: string): Promise<TypeCap | string> {
        try {
            const sql = 'UPDATE TypeCap SET deleted = true WHERE id = ?';
            const params = [id];
            const [result]: any = await query(sql, params);
    
            // Verifica si se actualizó algún registro
            if (result.affectedRows === 0) {
                throw new Error('TypeCap not found or no change in data');
            }
    
            // Retorna un mensaje de éxito junto con el ID actualizado
            return `TypeCap with ID ${id} marked as deleted successfully.`;
    
        } catch (error: any) {
            throw new Error(`Error deleting TypeCap: ${error.message}`);
        }
    }
    
    public static async deleteTypeCapPermanent(id: string): Promise<TypeCap | string> {
        try {
            const sql = 'DELETE FROM TypeCap WHERE id = ?';
            const params = [id];
            const [result]: any = await query(sql, params);
    
            // Verifica si se eliminó algún registro
            if (result.affectedRows === 0) {
                throw new Error('TypeCap not found or no change in data');
            }
    
            // Retorna un mensaje de éxito junto con el ID eliminado
            return `TypeCap with ID ${id} deleted permanently successfully.`;
    
        } catch (error: any) {
            throw new Error(`Error deleting TypeCap: ${error.message}`);
        }
    }
}