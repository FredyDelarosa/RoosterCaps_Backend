import { Admin } from "../models/customer";
import { query } from "../../database/mysql";

export class AdminRepository{
    public static async createAdmin(name:string,email:string,password:string,phone_number:string):Promise<Admin | any>{
        try {
            const type_custumer = "1"
            const sql = 'INSERT INTO Customer (name, email, password, phone_number,created_by, updated_by,customer_type_id) VALUES (?, ?, ?, ?, ?, ?, ?)';
            const params = [name,email,password,phone_number,name,name,type_custumer];

            const [result]:any =await query(sql,params);

            // Verifica si el cliente fue creado exitosamente
            if (!result.insertId) {
                throw new Error('Failed to create Admin, no insertId returned');
            }
            
            // Obtén el ID del cliente creado
            const createdCustumerId = result.insertId;

            // Construye la entidad Customer completa
            const newCustumer: Admin = {
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
    
}