import { Request,Response } from "express";
import { CartService } from "../services/cartService";

export const addCartDetail = async(req:Request,res:Response) => {
    try {
        
        const {cliente_id,gorra_id,tipo_gorra_id,talla_id,cantidad} = req.body;

        if (!cliente_id || !gorra_id || !tipo_gorra_id ||!talla_id || !cantidad) {
            return res.status(400).json({ message: 'Missing required fields' });
        }
        
        const addCart = await CartService.addCartDetail(cliente_id,gorra_id,tipo_gorra_id,talla_id,cantidad);

        res.status(201).json(addCart);
    } catch (error:any) {
        res.status(500).json({ error: error.message });
    }
}

export const deleteCartDetail  = async(req:Request,res:Response) => {
    try {
        const {id} = req.params;

        //Validaciones aun que no es correcto hacerlo de esta forma
        if (!id) {
            return res.status(400).json({ message: 'Missing required fields' });
        }
        const cartDelete = await CartService.deleteCartDetail(id);
        res.status(200).json(cartDelete);
    } catch (error:any) {
        res.status(500).json({ error: error.message });
    }
}

export const getAllCartDetails = async(req:Request,res:Response) => {
    try {
        const AllCarts = await CartService.getAllCartDetails();
        res.status(200).json(AllCarts);
    } catch (error:any) {
        res.status(500).json({ error: error.message });
    }
}