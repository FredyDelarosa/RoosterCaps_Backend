import { query } from "../../database/mysql";
import { Cap } from "../models/caps";

export class CapsRepository{
    public static async createCaps(categoria_id:number ,name:string,price:number,created_by:string,imagen:string):Promise<Cap>{
        try {
            const sql = 'INSERT INTO caps (categoria_id, name, price, created_by, updated_by, imagen) VALUES (?, ?, ?, ?, ?, ?)';
            const params = [categoria_id, name, price, created_by, created_by, imagen];

            const [result]: any = await query(sql, params);

            // Verifica si el registro fue creado exitosamente
            if (!result.insertId) {
                throw new Error('Failed to create cap, no insertId returned');
            }

            // Obtén el ID del registro creado
            const createdCapId = result.insertId;

            // Construye la entidad Cap completa
            const newCap: Cap = {
                id: createdCapId,
                categoria_id: categoria_id,
                name: name,
                price: price,
                imagen:imagen,
                created_by: created_by,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
                updated_by: created_by,
                deleted: false
            };

            return newCap;
        } catch (error: any) {
            throw new Error(`Error creating cap: ${error.message}`);
        }
    }

    public static async updateCap(id:string ,name:string,price:number,updated_by:string,imagen:string):Promise<Cap |string | any>{
        try {
            const sql = 'UPDATE caps SET name = ?, price = ?, updated_by = ?, imagen  = ? WHERE id = ?'
            const params = [name,price,updated_by,imagen,id]
            const [result]:any = await query(sql,params);

            // Verifica si se actualizó algún registro
            if (result.affectedRows === 0) {
                throw new Error('cap not found or no change in data');
            }

            // Retorna un mensaje de éxito junto con el ID actualizado
            return { message: `cap with ID ${id} updated successfully.` };
            
        } catch (error:any) {
            throw new Error(`${error.message}`)
        }

    }
    public static async getAllCaps():Promise<Cap[]>{
        try {
            const sql = 'SELECT * FROM caps';
            const [rows]: any = await query(sql);
            
            // Verifica si se encontraron registros
            if (!rows.length) {
                throw new Error('No caps found');
            }

            // Retorna los registros como un arreglo de objetos Customer
            return rows as Cap[];
        } catch (error: any) {
            throw new Error(`Error fetching caps: ${error.message}`);
        }
    }
    public static async getAllCapsActive():Promise<Cap[]>{
        try {
            const sql = 'SELECT * FROM caps WHERE deleted = false';
            const [rows]: any = await query(sql);
            
            // Verifica si se encontraron registros
            if (!rows.length) {
                throw new Error('No caps found');
            }

            // Retorna los registros como un arreglo de objetos Customer
            return rows as Cap[];
        } catch (error: any) {
            throw new Error(`Error fetching caps: ${error.message}`);
        }
    }
    public static async getByIdCap(id: string): Promise<Cap> {
        try {
            const sql = 'SELECT * FROM caps WHERE id = ? AND deleted = false';
            const params = [id];
            const [rows]: any = await query(sql, params);

            // Verifica si se encontraron registros
            if (rows.length === 0) {
                throw new Error('Cap not found');
            }

            // Retorna el registro como un objeto Cap
            return rows[0] as Cap;
        } catch (error: any) {
            throw new Error(`Error fetching cap: ${error.message}`);
        }
    }
    public static async getCapsByCategorieId(categoria_id: string): Promise<Cap[]> {
        try {
            const sql = 'SELECT * FROM caps WHERE categoria_id = ? AND deleted = false';
            const params = [categoria_id];
            const [rows]: any = await query(sql, params);

            // Verifica si se encontraron registros
            if (rows.length === 0) {
                throw new Error('No caps found for the given category');
            }

            // Retorna los registros como un arreglo de objetos Cap
            return rows as Cap[];
        } catch (error: any) {
            throw new Error(`Error fetching caps: ${error.message}`);
        }
    }

    public static async deleteCap(id:string){
        try {
            const sql = 'UPDATE caps SET deleted = true WHERE id = ?';
            const params = [id];
            const [result]: any = await query(sql, params);

            // Verifica si se actualizó algún registro
            if (result.affectedRows === 0) {
                throw new Error('cap not found or no change in data');
            }

            // Retorna un mensaje de éxito junto con el ID actualizado
            return `cap with ID ${id} marked as deleted successfully.`;

        } catch (error: any) {
            throw new Error(`Error deleting Categories: ${error.message}`);
        }
    }
    public static async deleteCapPermant(id:string){
        try {
            const sql = 'DELETE FROM caps WHERE id = ?';
            const params = [id];
            const [result]: any = await query(sql, params);

            // Verifica si se actualizó algún registro
            if (result.affectedRows === 0) {
                throw new Error('cap not found or no change in data');
            }

            // Retorna un mensaje de éxito junto con el ID actualizado
            return `cap with ID ${id} marked as deleted permant successfully.`;

        } catch (error: any) {
            throw new Error(`Error deleting Categories: ${error.message}`);
        }
    }
    public static async getInfoAllCap(id: string): Promise<any> {
        try {
            const sql = `
                SELECT 
                    c.id AS cap_id,
                    c.name AS cap_name,
                    c.price AS cap_price,
                    c.imagen AS cap_imagen,
                    c.created_by AS cap_created_by,
                    c.updated_by AS cap_updated_by,
                    c.created_at AS cap_created_at,
                    c.updated_at AS cap_updated_at,
                    tc.id AS type_cap_id,
                    tc.tipo AS type_cap_tipo,
                    s.id AS size_id,
                    s.description AS size_description,
                    i.id AS inventary_id,
                    i.cantidad AS inventary_cantidad
                FROM 
                    caps c
                LEFT JOIN TypeCap tc ON c.id = tc.gorra_id AND tc.deleted = FALSE
                LEFT JOIN Size s ON tc.talla_id = s.id AND s.deleted = FALSE
                LEFT JOIN Inventary i ON c.id = i.gorra_id AND s.id = i.talla_id AND i.deleted = FALSE
                WHERE 
                    c.id = ?
                    AND c.deleted = FALSE
            `;
            const params = [id];
            const [rows]: any = await query(sql, params);
    
            // Verifica si se encontraron registros
            if (rows.length === 0) {
                throw new Error('Cap not found');
            }
    
            // Retorna los registros encontrados
            return rows;
        } catch (error: any) {
            throw new Error(`Error fetching cap: ${error.message}`);
        }
    }
}
    