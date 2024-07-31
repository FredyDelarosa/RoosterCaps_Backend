import express from "express";
import { validateToken } from "../../helpers/verificateToken";
import { createInventary, updateInventary, getAllInventaries, deleteInventaryPermanent, deleteInventary, getAllInventariesActive,getAllInventaryCaps } from "../controllers/inventaryController";

export const inventaryRoutes = express.Router();

//inventaryRoutes.use(validateToken);
inventaryRoutes.post('/', createInventary);
inventaryRoutes.put('/:name', updateInventary);
inventaryRoutes.get('/', getAllInventaries);
inventaryRoutes.get('/:id_talla/:name', getAllInventariesActive);
inventaryRoutes.delete('/:id', deleteInventary);
inventaryRoutes.delete('/permanent/:id', deleteInventaryPermanent);
inventaryRoutes.get('/caps/:name', getAllInventaryCaps);

