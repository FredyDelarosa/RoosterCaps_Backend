import { Request, Response } from "express";
import { AdminService } from "../services/adminService";

export const createAdmin = async (req:Request, res:Response) =>{
    try {
        const {name,email,password,phone_number} = req.body

        //Validaciones aun que no es correcto hacerlo de esta forma
        if (!name || !email || !password || !phone_number ) {
            return res.status(400).json({ message: 'Missing required fields' });
        }
        const newAdmin = await AdminService.createAdmin(name,email,password,phone_number);

        res.status(201).json(newAdmin);

    } catch (error:any) {
        res.status(500).json({ error: error.message });
    }
}

