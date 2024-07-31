import { Customer } from "../models/customer";
import { query } from "../../database/mysql";

export class CustumerRepository{
    public static async createCustumer(name:string,email:string,password:string,phone_number:string):Promise<Customer | any>{
        try {
            const type_custumer = "2"
            const sql = 'INSERT INTO Customer (name, email, password, phone_number,created_by, updated_by,customer_type_id) VALUES (?, ?, ?, ?, ?, ?, ?)';
            const params = [name,email,password,phone_number,name,name,type_custumer];

            const [result]:any =await query(sql,params);

            // Verifica si el cliente fue creado exitosamente
            if (!result.insertId) {
                throw new Error('Failed to create cliente, no insertId returned');
            }
            
            // Obtén el ID del cliente creado
            const createdCustumerId = result.insertId;

            // Construye la entidad Customer completa
            const newCustumer: Customer = {
                id: createdCustumerId,
                name: name,
                email: email,
                password: password,
                phone_number: phone_number,
                customer_type_id: type_custumer,
                created_at: new Date().toISOString(),
                created_by: name,
                updated_at: new Date().toISOString(),
                updated_by: name,
                deleted: false
            };

            return newCustumer;
            
        } catch (error:any) {
            throw new Error(`${error.message}`);
        }
    }
    public static async updateCustumer(id:string,name:string, phone_number:string):Promise<Customer |string | any>{
        try {
            const sql = 'UPDATE Customer SET name = ?, phone_number = ?, updated_by = ? WHERE id = ?'
            const params = [name,phone_number,name,id]
            const [result]:any = await query(sql,params);

            // Verifica si se actualizó algún registro
            if (result.affectedRows === 0) {
                throw new Error('Customer not found or no change in data');
            }

            // Retorna un mensaje de éxito junto con el ID actualizado
            return { message: `Customer with ID ${id} updated successfully.` };
            
        } catch (error:any) {
            throw new Error(`${error.message}`)
        }

    }
    public static async getAllCustumer():Promise<Customer[]>{
        try {
            const sql = 'SELECT * FROM Customer';
            const [rows]: any = await query(sql);
            
            // Verifica si se encontraron registros
            if (!rows.length) {
                throw new Error('No customers found');
            }

            // Retorna los registros como un arreglo de objetos Customer
            return rows as Customer[];
        } catch (error: any) {
            throw new Error(`Error fetching customers: ${error.message}`);
        }
    }
    public static async getAllCustumerActive():Promise<Customer[]>{
        try {
            const sql = 'SELECT * FROM Customer WHERE deleted = false';
            const [rows]: any = await query(sql);
            
            // Verifica si se encontraron registros
            if (!rows.length) {
                throw new Error('No customers');
            }

            // Retorna los registros como un arreglo de objetos Customer
            return rows as Customer[];
        } catch (error: any) {
            throw new Error(`Error fetching customers: ${error.message}`);
        }
    }
    public static async deleteCustumer(id:string):Promise<Customer | string>{
        try {
            const sql = 'UPDATE Customer SET deleted = true WHERE id = ?';
            const params = [id];
            const [result]: any = await query(sql, params);

            // Verifica si se actualizó algún registro
            if (result.affectedRows === 0) {
                throw new Error('Customer not found or no change in data');
            }

            // Retorna un mensaje de éxito junto con el ID actualizado
            return `Customer with ID ${id} marked as deleted successfully.`;

        } catch (error: any) {
            throw new Error(`Error deleting customer: ${error.message}`);
        }
    }

    public static async getByEmail(email:string):Promise<Customer | null>{
        try {
            const sql = 'SELECT * FROM Customer WHERE email = ? AND deleted = false';
            const params = [email];
            const [rows]: any = await query(sql, params);
            // Verifica si se encontró el registro
            
            if (rows.length === 0) {
                return null;
            }
            // Retorna la información del cliente encontrado
            const customer: Customer = rows[0];
            return customer;

        } catch (error: any) {
            throw new Error(`Error fetching customer by email: ${error.message}`);
        }
    }
}