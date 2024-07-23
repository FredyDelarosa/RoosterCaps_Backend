import { Request, Response } from "express";
import { SizeService } from "../services/sizeServices";

export const createSize = async (req:Request, res:Response) =>{
    try {
        const {descripcion,created_by} = req.body

        //Validaciones aun que no es correcto hacerlo de esta forma
        if (!descripcion || !created_by ) {
            return res.status(400).json({ message: 'Missing required fields' });
        }
        const newSize = await SizeService.createSize(descripcion,created_by);

        res.status(201).json(newSize);

    } catch (error:any) {
        res.status(500).json({ error: error.message });
    }
}

export const updateSize = async (req:Request, res:Response) =>{
    try {
        const {id} = req.params;
        const {descripcion,updated_by} = req.body;

        //Validaciones aun que no es correcto hacerlo de esta forma
        if (!id||!descripcion || !updated_by ) {
            return res.status(400).json({ message: 'Missing required fields' });
        }
        const newUpdateSize = await SizeService.updateSize(id,descripcion,updated_by);
        
        res.status(201).json(newUpdateSize);

    } catch (error:any) {
        res.status(500).json({ error: error.message });
    }
}

export const getAllSize = async(req:Request,res:Response) => {
    try {
        const AllSize = await SizeService.getAllSize();
        res.status(200).json(AllSize);
    } catch (error:any) {
        res.status(500).json({ error: error.message });
    }
}
export const getAllSizeActivate = async(req:Request,res:Response) => {
    try {
        const AllSize = await SizeService.getAllSizeActivate();
        res.status(200).json(AllSize);
    } catch (error:any) {
        res.status(500).json({ error: error.message });
    }
}
export const deleteSize  = async(req:Request,res:Response) => {
    try {
        const {id} = req.params;

        //Validaciones aun que no es correcto hacerlo de esta forma
        if (!id) {
            return res.status(400).json({ message: 'Missing required fields' });
        }
        const sizeDelete = await SizeService.deleteSize(id);
        res.status(200).json(sizeDelete);
    } catch (error:any) {
        res.status(500).json({ error: error.message });
    }
}

export const deleteSizePermant  = async(req:Request,res:Response) => {
    try {
        const {id} = req.params;

        //Validaciones aun que no es correcto hacerlo de esta forma
        if (!id) {
            return res.status(400).json({ message: 'Missing required fields' });
        }
        const sizeDelete = await SizeService.deleteSizePermant(id);
        res.status(200).json(sizeDelete);
    } catch (error:any) {
        res.status(500).json({ error: error.message });
    }
}