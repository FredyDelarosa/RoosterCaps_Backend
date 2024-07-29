import { Request,Response } from "express";
import { CategoriaService } from "../services/categoriesService";
import multer from 'multer';
import { convertImageToBase64 } from "../../helpers/convertImg";

// Configuración de multer para manejar la carga de archivos
const upload = multer({ storage: multer.memoryStorage() });

export const createCategorie = async (req: Request, res: Response) => {
    try {
        // Utilizamos multer como middleware para manejar la carga de archivos
        upload.single('image')(req, res, async (err) => {
            if (err) {
                return res.status(400).json({ message: 'Error uploading file', error: err });
            }

            const { name, descripcion, created_by } = req.body;
            
            if (!name) {
                return res.status(400).json({ message: 'Missing required fields' });
            }

            let base64Image = '';
            if (req.file) {
                base64Image = convertImageToBase64(req.file.buffer);
            }

            const newCategoria = await CategoriaService.createCategorie(name);

            res.status(201).json(newCategoria);
        });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const updateCategorie = async (req: Request, res: Response) => {
    upload.single('image')(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ message: 'Error uploading file', error: err });
        }

        try {
            const { id } = req.params;
            const { name, descripcion, updated_by } = req.body;

            if (!id || !name || !descripcion || !updated_by) {
                return res.status(400).json({ message: 'Missing required fields' });
            }

            let base64Image = '';
            if (req.file) {
                base64Image = convertImageToBase64(req.file.buffer);
            }

            const updatedCategoria = await CategoriaService.updateCategorie(id, name);

            res.status(200).json(updatedCategoria);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    });
};

export const getAllCustumer = async(req:Request,res:Response) => {
    try {
        const AllCategorie = await CategoriaService.getAllCategories();
        res.status(200).json(AllCategorie);
    } catch (error:any) {
        res.status(500).json({ error: error.message });
    }
}

export const getAllCustumerActive = async(req:Request,res:Response) => {
    try {
        const AllCategorieActive = await CategoriaService.getAllCategoriesActive();
        res.status(200).json(AllCategorieActive);
    } catch (error:any) {
        res.status(500).json({ error: error.message });
    }
}

export const deleteCategories = async(req:Request,res:Response) => {
    try {
        const {id} = req.params
        const deleteCategories = await CategoriaService.deleteCategories(id);
        res.status(200).json(deleteCategories);
    } catch (error:any) {
        res.status(500).json({ error: error.message });
    }
}

export const deleteCategoriesPermant = async(req:Request,res:Response) => {
    try {
        const {id} = req.params
        const deleteCategories = await CategoriaService.deleteCategoriesPermant(id);
        res.status(200).json(deleteCategories);
    } catch (error:any) {
        res.status(500).json({ error: error.message });
    }
}
