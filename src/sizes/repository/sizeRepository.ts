import { query } from "../../database/mysql";
import { Size } from "../models/size";

export class SizeRepository{
    public static async createSize(descripcion:string,created_by:string):Promise<Size | any>{
        try {
            const sql = 'INSERT INTO Size (description ,created_by, updated_by) VALUES (?, ?, ?)';
            const params = [descripcion,created_by,created_by];

            const [result]:any =await query(sql,params);

            // Verifica si el talla fue creado exitosamente
            if (!result.insertId) {
                throw new Error('Failed to create size, no insertId returned');
            }
            
            // Obtén el ID de la talla creado
            const createdCustumerId = result.insertId;

            // Construye la entidad Customer completa
            const newSize: Size = {
                id: createdCustumerId,
                description: descripcion,
                created_at: new Date().toISOString(),
                created_by: created_by,
                updated_at: new Date().toISOString(),
                updated_by: created_by,
                deleted: false
            };

            return newSize;
            
        } catch (error:any) {
            throw new Error(`${error.message}`);
        }
    }
    public static async updateSize(id:string,descripcion:string, updated_by:string):Promise<Size |string | any>{
        try {
            const sql = 'UPDATE Size SET description = ?, updated_by = ? WHERE id = ?'
            const params = [descripcion,updated_by,id]
            const [result]:any = await query(sql,params);

            // Verifica si se actualizó algún registro
            if (result.affectedRows === 0) {
                throw new Error('Size not found or no change in data');
            }

            // Retorna un mensaje de éxito junto con el ID actualizado
            return { message: `Size with ID ${id} updated successfully.` };
            
        } catch (error:any) {
            throw new Error(`${error.message}`)
        }

    }
    public static async getAllSize():Promise<Size[]>{
        try {
            const sql = 'SELECT * FROM Size';
            const [rows]: any = await query(sql);
            
            // Verifica si se encontraron registros
            if (!rows.length) {
                throw new Error('No size found');
            }

            // Retorna los registros como un arreglo de objetos Customer
            return rows as Size[];
        } catch (error: any) {
            throw new Error(`Error fetching size: ${error.message}`);
        }
    }
    public static async getAllSizeActive():Promise<Size[]>{
        try {
            const sql = 'SELECT * FROM Size WHERE deleted = false';
            const [rows]: any = await query(sql);
            
            // Verifica si se encontraron registros
            if (!rows.length) {
                throw new Error('No size found');
            }

            // Retorna los registros como un arreglo de objetos Customer
            return rows as Size[];
        } catch (error: any) {
            throw new Error(`Error fetching size: ${error.message}`);
        }
    }
    public static async deleteSize(id:string):Promise<Size | string>{
        try {
            const sql = 'UPDATE Size SET deleted = true WHERE id = ?';
            const params = [id];
            const [result]: any = await query(sql, params);

            // Verifica si se actualizó algún registro
            if (result.affectedRows === 0) {
                throw new Error('Size not found or no change in data');
            }

            // Retorna un mensaje de éxito junto con el ID actualizado
            return `Size with ID ${id} marked as deleted successfully.`;

        } catch (error: any) {
            throw new Error(`Error deleting Categories: ${error.message}`);
        }
    }
    public static async deleteSizePermant(id:string):Promise<Size | string>{
        try {
            const sql = 'DELETE FROM caps WHERE id = ?';
            const params = [id];
            const [result]: any = await query(sql, params);

            // Verifica si se actualizó algún registro
            if (result.affectedRows === 0) {
                throw new Error('Size not found or no change in data');
            }

            // Retorna un mensaje de éxito junto con el ID actualizado
            return `Size with ID ${id} marked as deleted permant successfully.`;

        } catch (error: any) {
            throw new Error(`Error deleting Categories: ${error.message}`);
        }
    }
    public static async updateOrderDate(id: string, newDate: Date): Promise<string> {
        try {
            const sql = 'UPDATE Orders SET date = ? WHERE id = ?';
            const params = [newDate, id];
            const [result]: any = await query(sql, params);
    
            // Verifica si se actualizó algún registro
            if (result.affectedRows === 0) {
                throw new Error('Order not found or no change in data');
            }
    
            // Retorna un mensaje de éxito junto con el ID actualizado
            return `Order with ID ${id} updated with new date ${newDate.toISOString()} successfully.`;
    
        } catch (error: any) {
            throw new Error(`Error updating order date: ${error.message}`);
        }
    }
}