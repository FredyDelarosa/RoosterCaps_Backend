import { CustumerRepository } from "../repository/customerRepository";
import { Customer } from "../models/customer";
import { encrypt } from "../../helpers/ashs";
import { compare } from "../../helpers/ashs";
import { tokenSigIn } from "../../helpers/token";

export class CustumerService{

    public static async createCustomer(name:string,email:string,password:string,phone_number:string){
        try {
            //Encripta la contraseña
            password = await encrypt(password);
            
            return await CustumerRepository.createCustumer(name,email,password,phone_number);
        } catch (error:any) {
            throw new Error(`Error al crear cliente: ${error.message}`);
        }
    }

    public static async updateCustumer(id:string,name:string,phone_number:string){
        try {
            return await CustumerRepository.updateCustumer(id,name,phone_number);

        } catch (error:any) {
            throw new Error(`Error al modificar cliente: ${error.message}`)
        }
    }

    public static async getAllCustumer(){
        try {
            return await CustumerRepository.getAllCustumer();

        } catch (error:any) {
            throw new Error(`Error al modificar cliente: ${error.message}`)
        }
    }

    public static async getAllCustumerActive(){
        try {
            return await CustumerRepository.getAllCustumerActive();

        } catch (error:any) {
            throw new Error(`Error al modificar cliente: ${error.message}`)
        }
    }

    public static async deleteCustumer(id:string){
        try {
            return await CustumerRepository.deleteCustumer(id);

        } catch (error:any) {
            throw new Error(`Error al modificar cliente: ${error.message}`)
        }
    }       
    public static async loginCustumer(email:string, password:string){
        try {
            const custumer = await CustumerRepository.getByEmail(email);
            if (!custumer) {
                return "User not found";
            }
            const passwordVeritify = await compare(password, custumer.password)
            if (!passwordVeritify) {
                return 'Contraseña incorrecta';
            }
            
            const id = custumer.id.toString(); // se convierte en string el id
            const token:string = tokenSigIn(id,email);
            console.log(custumer.customer_type_id)
            
            return {token:token,id:custumer.id,name:custumer.name, email:custumer.email,  phone_number: custumer.phone_number, type_costumer: custumer.customer_type_id}
            

        } catch (error:any) {
            throw new Error(`Error al modificar cliente: ${error.message}`)
        }
    }



}