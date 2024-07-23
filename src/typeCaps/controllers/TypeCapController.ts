import { Request, Response } from "express";
import { TypeCapService } from "../services/TypeCapServices";

export const createTypeCap = async (req: Request, res: Response) => {
    try {
        const { tipo, gorra_id, talla_id, created_by } = req.body;

        // Validaciones, aunque no es correcto hacerlo de esta forma
        if (!tipo || !gorra_id || !talla_id || !created_by) {
            return res.status(400).json({ message: 'Missing required fields' });
        }
        const newTypeCap = await TypeCapService.createTypeCap(tipo, gorra_id, talla_id, created_by);

        res.status(201).json(newTypeCap);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const updateTypeCap = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { tipo, updated_by } = req.body;

        // Validaciones, aunque no es correcto hacerlo de esta forma
        if (!id || !tipo || !updated_by) {
            return res.status(400).json({ message: 'Missing required fields' });
        }
        const updatedTypeCap = await TypeCapService.updateTypeCap(id, tipo, updated_by);

        res.status(200).json(updatedTypeCap);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const getAllTypeCaps = async (req: Request, res: Response) => {
    try {
        const allTypeCaps = await TypeCapService.getAllTypeCaps();
        res.status(200).json(allTypeCaps);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const getAllTypeCapsActive = async (req: Request, res: Response) => {
    try {
        const allActiveTypeCaps = await TypeCapService.getAllTypeCapsActive();
        res.status(200).json(allActiveTypeCaps);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteTypeCap = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        // Validaciones, aunque no es correcto hacerlo de esta forma
        if (!id) {
            return res.status(400).json({ message: 'Missing required fields' });
        }
        const typeCapDelete = await TypeCapService.deleteTypeCap(id);
        res.status(200).json(typeCapDelete);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteTypeCapPermanent = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        // Validaciones, aunque no es correcto hacerlo de esta forma
        if (!id) {
            return res.status(400).json({ message: 'Missing required fields' });
        }
        const typeCapDelete = await TypeCapService.deleteTypeCapPermanent(id);
        res.status(200).json(typeCapDelete);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};