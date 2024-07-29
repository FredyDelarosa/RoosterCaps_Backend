import { AdminRepository } from "../reposiotry/adminRepository";
import { Admin } from "../models/customer";
import { encrypt } from "../../helpers/ashs";
import { compare } from "../../helpers/ashs";
import { tokenSigIn } from "../../helpers/token";

export class AdminService{

    public static async createAdmin(name:string,email:string,password:string,phone_number:string){
        try {
            //Encripta la contraseña
            password = await encrypt(password);
            
            return await AdminRepository.createAdmin(name,email,password,phone_number);
        } catch (error:any) {
            throw new Error(`Error al crear admin: ${error.message}`);
        }
    }

}