import { OrderService } from "../services/sizeServices";
import { Request, Response } from "express";

export const createOrder = async (req:Request, res:Response) =>{
    console.log(req.body);
    
    try {
        const {cliente_id,id_gorra,cantidad,total,created_by} = req.body

        //Validaciones aun que no es correcto hacerlo de esta forma
        if (!cliente_id || !created_by ) {
            return res.status(400).json({ message: 'Missing required fields' });
        }
        const newSize = await OrderService.createOrder(cliente_id,Number(id_gorra),cantidad,total,created_by);

        res.status(201).json(newSize);

    } catch (error:any) {
        res.status(500).json({ error: error.message });
    }
    
}

export const getAllPendingOrdersWithCustomer = async(req:Request,res:Response) => {
    console.log(req.params);
    
    const data = req.params
    try {
        const Allordes = await OrderService.getAllPendingOrdersWithCustomer(Number(data.id));
        res.status(200).json(Allordes);
    } catch (error:any) {
        console.error(error);
        
        res.status(500).json({ error: error.message });
    }
}

export const updateOrderDate = async(req:Request,res:Response) => {
    console.log(req.params,req.body);
    
    try {
        const {id} = req.params;
        const {new_date} = req.body

        //Validaciones aun que no es correcto hacerlo de esta forma
        if (!id || !new_date ) {
            return res.status(400).json({ message: 'Missing required fields' });
        }
        const Allordes = await OrderService.updateOrderDate(id,new_date);
        res.status(200).json(Allordes);
    } catch (error:any) {
        console.error(error);
        
        res.status(500).json({ error: error.message });
    }
}

export const updateOrderStatus = async(req:Request,res:Response) => {
    console.log(req.params,req.body);
    
    try {
        const {id} = req.params;
        const {newStatus} = req.body

        //Validaciones aun que no es correcto hacerlo de esta forma
        if (!id || !newStatus ) {
            return res.status(400).json({ message: 'Missing required fields' });
        }
        const updateStatus = await OrderService.updateOrderStatus(id,newStatus);
        res.status(200).json(updateStatus);
    } catch (error:any) {
        res.status(500).json({ error: error.message });
    }
}

export const getAllOrdersAsignedDate = async(req:Request,res:Response) => {
    try {
        const Allordes = await OrderService.getAllOrdersAsignedDate();
        res.status(200).json(Allordes);
    } catch (error:any) {
        console.error(error);
        
        res.status(500).json({ error: error.message });
    }
}

export const getAllCompletedOrCancelledOrdersWithCustomer = async(req:Request,res:Response) => {
    try {
        const Allordes = await OrderService.getAllCompletedOrCancelledOrdersWithCustomer();
        res.status(200).json(Allordes);
    } catch (error:any) {
        console.error(error);
        
        res.status(500).json({ error: error.message });
    }
}

export const getOrderDetails = async(req:Request,res:Response) => {
    try {
        
        const updateStatus = await OrderService.getOrderDetails();
        res.status(200).json(updateStatus);
    } catch (error:any) {
        res.status(500).json({ error: error.message });
    }
}

export const getshoppingClient = async(req:Request,res:Response) => {
    try {
        const {cliente_id} = req.params;

        //Validaciones aun que no es correcto hacerlo de esta forma
        if (!cliente_id ) {
            return res.status(400).json({ message: 'Missing required fields' });
        }
        const updateStatus = await OrderService.getshoppingClient(cliente_id);
        res.status(200).json(updateStatus);
    } catch (error:any) {
        res.status(500).json({ error: error.message });
    }       
}
export const getOne = async(req:Request,res:Response) => {
    try {
        const {id} = req.params;
        if (!id ) {
            return res.status(400).json({ message: 'Missing required fields' });
        }
        const updateStatus = await OrderService.getOne(Number(id));
        res.status(200).json(updateStatus);
    } catch (error:any) {
        res.status(500).json({ error: error.message });
    }
}