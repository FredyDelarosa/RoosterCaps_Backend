import { Request, Response } from "express";
import { CustumerService } from "../services/customerService";

export const createCostumer = async (req:Request, res:Response) =>{
    try {
        const {name,email,password,phone_number} = req.body

        //Validaciones aun que no es correcto hacerlo de esta forma
        if (!name || !email || !password || !phone_number ) {
            return res.status(400).json({ message: 'Missing required fields' });
        }
        const newCustumer = await CustumerService.createCustomer(name,email,password,phone_number);

        res.status(201).json(newCustumer);

    } catch (error:any) {
        res.status(500).json({ error: error.message });
    }
}

export const updateCustumer = async (req:Request, res:Response) =>{
    try {
        const {id} = req.params;
        const {name,phone_number} = req.body;

        console.log(id,name,phone_number);
        //Validaciones aun que no es correcto hacerlo de esta forma
        if (!id||!name || !phone_number ) {
            return res.status(400).json({ message: 'Missing required fields' });
        }
        const newUpdateCustumer = await CustumerService.updateCustumer(id,name,phone_number);
        
        res.status(201).json(newUpdateCustumer);

    } catch (error:any) {
        res.status(500).json({ error: error.message });
    }
}

export const getAllCustumer = async(req:Request,res:Response) => {
    try {
        const AllCustumer = await CustumerService.getAllCustumer();
        res.status(200).json(AllCustumer);
    } catch (error:any) {
        res.status(500).json({ error: error.message });
    }
}

export const getAllCustumeractive  = async(req:Request,res:Response) => {
    try {
        const AllCustumer = await CustumerService.getAllCustumerActive();
        res.status(200).json(AllCustumer);
    } catch (error:any) {
        res.status(500).json({ error: error.message });
    }
}

export const deleteCustumer  = async(req:Request,res:Response) => {
    try {
        const {id} = req.params;

        //Validaciones aun que no es correcto hacerlo de esta forma
        if (!id) {
            return res.status(400).json({ message: 'Missing required fields' });
        }
        const custumerDelete = await CustumerService.deleteCustumer(id);
        res.status(200).json(custumerDelete);
    } catch (error:any) {
        res.status(500).json({ error: error.message });
    }
}

export const loginCustumer  = async(req:Request,res:Response) => {
    try {
        const {email,password} = req.body;

        if (!email||!password) {
            return res.status(400).json({ message: 'Missing required fields' });
        }
        const login = await CustumerService.loginCustumer(email,password);
        res.status(201).json(login);
    } catch (error:any) {
        res.status(500).json({ error: error.message });
    }
}
