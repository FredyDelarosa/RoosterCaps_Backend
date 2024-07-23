import { Request,Response } from "express";
import { CapsService } from "../services/capsService";
import multer from "multer";
import { convertImageToBase64 } from "../../helpers/convertImg";

const upload = multer({ storage: multer.memoryStorage() });

export const createCaps = async (req: Request, res: Response) => {
    // Utilizamos multer como middleware para manejar la carga de archivos
    upload.single('image')(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ message: 'Error uploading file', error: err });
        }

        try {
            const { categoria_id, name, price, created_by } = req.body;
            
            if (!categoria_id || !name || !price || !created_by) {
                return res.status(400).json({ message: 'Missing required fields' });
            }

            let base64Image = '';
            if (req.file) {
                base64Image = convertImageToBase64(req.file.buffer);
            }

            const newCap = await CapsService.createCaps(categoria_id, name, price, created_by, base64Image);

            res.status(201).json(newCap);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    });
};


export const updateCaps = async(req:Request, res:Response) =>{
    upload.single('image')(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ message: 'Error uploading file', error: err });
        }

        try {
            const {id} = req.params;
            const {name,price,updated_by} = req.body;
            
            if (!id||!name||!price || !updated_by) {
                return res.status(400).json({ message: 'Missing required fields' });
            }

            let base64Image = '';
            if (req.file) {
                base64Image = convertImageToBase64(req.file.buffer);
            }

            const updateCap = await CapsService.updateCaps(id,name,price,updated_by,base64Image);

            res.status(201).json(updateCap);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    });
}

export const getAllCaps = async(req:Request,res:Response) => {
    try {
        const AllCaps = await CapsService.getAllCaps();
        res.status(200).json(AllCaps);
    } catch (error:any) {
        res.status(500).json({ error: error.message });
    }
}

export const getAllCapsActive = async(req:Request,res:Response) => {
    try {
        const AllCaps = await CapsService.getAllCapsActivate();
        res.status(200).json(AllCaps);
    } catch (error:any) {
        res.status(500).json({ error: error.message });
    }
}

export const getByIdCap = async(req:Request,res:Response) => {
    try {
        const {id} = req.params;
        const AllCaps = await CapsService.getByIdCap(id);
        res.status(200).json(AllCaps);
    } catch (error:any) {
        res.status(500).json({ error: error.message });
    }
}

export const getCapsByCategorieId = async(req:Request,res:Response) => {
    try {
        const {categoria_id} = req.params;
        const AllCaps = await CapsService.getCapsByCategorieId(categoria_id);
        res.status(200).json(AllCaps);
    } catch (error:any) {
        res.status(500).json({ error: error.message });
    }
}

export const deleteCap  = async(req:Request,res:Response) => {
    try {
        const {id} = req.params;

        //Validaciones aun que no es correcto hacerlo de esta forma
        if (!id) {
            return res.status(400).json({ message: 'Missing required fields' });
        }
        const capDelete = await CapsService.deleteCap(id);
        res.status(200).json(capDelete);
    } catch (error:any) {
        res.status(500).json({ error: error.message });
    }
}

export const deleteCapPermant  = async(req:Request,res:Response) => {
    try {
        const {id} = req.params;

        //Validaciones aun que no es correcto hacerlo de esta forma
        if (!id) {
            return res.status(400).json({ message: 'Missing required fields' });
        }
        const capDelete = await CapsService.deleteCapPermant(id);
        res.status(200).json(capDelete);
    } catch (error:any) {
        res.status(500).json({ error: error.message });
    }
}


export const getInfoAllCap  = async(req:Request,res:Response) => {
    try {
        const {id} = req.params;

        //Validaciones aun que no es correcto hacerlo de esta forma
        if (!id) {
            return res.status(400).json({ message: 'Missing required fields' });
        }
        const getCap = await CapsService.getInfoAllCap(id);
        res.status(200).json(getCap);
    } catch (error:any) {
        res.status(500).json({ error: error.message });
    }
}
