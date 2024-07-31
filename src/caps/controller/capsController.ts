import { Request, Response } from "express";
import { CapsService } from "../services/capsService";
import multer from "multer";
import { convertImageToBase64 } from "../../helpers/convertImg";

const upload = multer({ storage: multer.memoryStorage() });

export const createCaps = async (req: Request, res: Response) => {
    let base64Image = "";
  upload.single("image")(req, res, async (err) => {
    if (err) {
      return res
        .status(400)
        .json({ message: "Error uploading file", error: err });
    }
    try {
        console.log(req.body);
        
      const { categoria_id, name, price, created_by, talla,tipo,descripcion } = req.body;

      if (!categoria_id || !name || !price || !created_by || !talla) {
        return res.status(400).json({ message: "Missing required fields" });
      }
      if (req.file) {
        base64Image = convertImageToBase64(req.file.buffer);
      }

      const newCap = await CapsService.createCaps(
        categoria_id,
        name,
        price,
        created_by,
        base64Image,
        talla,
        tipo,
        descripcion
      );

      res.status(201).json(newCap);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });
};

export const updateCaps = async (req: Request, res: Response) => {
  console.log(req.body);
  
  upload.single("image")(req, res, async (err) => {
    if (err) {
      return res
        .status(400)
        .json({ message: "Error uploading file", error: err });
    }

    try {
      const { name, price, updated_by, name2,descripcion,tipo,talla,categoria_id } = req.body;

      if (!name2 || !name || !price || !updated_by) {
        return res.status(400).json({ message: "Missing required fields" });
      }

      let base64Image = "";
      if (req.file) {
        base64Image = convertImageToBase64(req.file.buffer);
      }

      const updateCap = await CapsService.updateCaps(
        name2,
        name,
        price,
        updated_by,
        base64Image,
        descripcion,
        tipo,
        talla,
        categoria_id
      );

      res.status(201).json(updateCap);
    } catch (error: any) {
      console.log(error);
      
      res.status(500).json({ error: error.message });
    }
  });
};

export const getAllCaps = async (req: Request, res: Response) => {
  try {
    const AllCaps = await CapsService.getAllCaps();
    res.status(200).json(AllCaps);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getAllCapsActive = async (req: Request, res: Response) => {
  try {
    const AllCaps = await CapsService.getAllCapsActivate();
    res.status(200).json(AllCaps);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getByIdCap = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const AllCaps = await CapsService.getByIdCap(id);
    res.status(200).json(AllCaps);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getCapsByCategorieId = async (req: Request, res: Response) => {
  console.log(req.params);
  
  try {
    const { categoria_id } = req.params;
    const AllCaps = await CapsService.getCapsByCategorieId(categoria_id);
    res.status(200).json(AllCaps);
  } catch (error: any) {
    console.log(error);
    
    res.status(500).json({ error: error.message });
  }
};

export const deleteCap = async (req: Request, res: Response) => {
  try {
    const { name } = req.params;

    //Valnameaciones aun que no es correcto hacerlo de esta forma
    if (!name) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    const capDelete = await CapsService.deleteCap(name);
    res.status(200).json(capDelete);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteCapPermant = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    //Validaciones aun que no es correcto hacerlo de esta forma
    if (!id) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    const capDelete = await CapsService.deleteCapPermant(id);
    res.status(200).json(capDelete);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getInfoAllCap = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    //Validaciones aun que no es correcto hacerlo de esta forma
    if (!id) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    const getCap = await CapsService.getInfoAllCap(id);
    res.status(200).json(getCap);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
