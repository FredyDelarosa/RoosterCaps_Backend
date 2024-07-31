import { Request, Response } from "express";
import { InventaryService } from "../services/InventarySerives";

export const createInventary = async (req: Request, res: Response) => {
    console.log(req.body,33);
    
    try {
        const { cantidad, gorra_id, talla_id, created_by } = req.body;

        // Validaciones, aunque no es correcto hacerlo de esta forma
        if (!cantidad || !gorra_id || !talla_id || !created_by) {
            return res.status(400).json({ message: 'Missing required fields' });
        }
        if (cantidad < 0) {
            return res.status(400).json({ message: 'Fields cannot be negative' });
        }
        const newInventary = await InventaryService.createInventary(cantidad, gorra_id, talla_id, created_by);

        res.status(201).json(newInventary);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const updateInventary = async (req: Request, res: Response) => {
    console.log(req.params,req.body);
    
    try {
        const { name } = req.params;
        const { cantidad, updated_by,talla_id } = req.body;

        // Validaciones, aunque no es correcto hacerlo de esta forma
        if (!name || !cantidad || !updated_by) {
            return res.status(400).json({ message: 'Missing required fields' });
        }
        if (cantidad < 0) {
            return res.status(400).json({ message: 'Fields cannot be negative' });
        }
        const updatedInventary = await InventaryService.updateInventary(Number(name), cantidad, updated_by,talla_id);

        res.status(200).json(updatedInventary);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const getAllInventaries = async (req: Request, res: Response) => {
    try {
        const allInventaries = await InventaryService.getAllInventaries();
        res.status(200).json(allInventaries);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const getAllInventariesActive = async (req: Request, res: Response) => {
    console.log(req.params);
    const data = req.params;
    try {
        const allActiveInventaries = await InventaryService.getAllInventariesActive(data.id_talla,data.name);
        res.status(200).json(allActiveInventaries);
    } catch (error: any) {
        console.log(error);
        
        res.status(500).json({ error: error.message });
    }
};

export const deleteInventary = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        // Validaciones, aunque no es correcto hacerlo de esta forma
        if (!id) {
            return res.status(400).json({ message: 'Missing required fields' });
        }
        const inventaryDelete = await InventaryService.deleteInventary(id);
        res.status(200).json(inventaryDelete);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteInventaryPermanent = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        // Validaciones, aunque no es correcto hacerlo de esta forma
        if (!id) {
            return res.status(400).json({ message: 'Missing required fields' });
        }
        const inventaryDelete = await InventaryService.deleteInventaryPermanent(id);
        res.status(200).json(inventaryDelete);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const getAllInventaryCaps = async (req: Request, res: Response) => {
    try {
        const allActiveInventaries = await InventaryService.getAllInventariCaps(req.params.name);
        res.status(200).json(allActiveInventaries);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};
