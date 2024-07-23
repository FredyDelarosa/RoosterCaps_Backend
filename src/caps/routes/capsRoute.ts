import express  from "express";
import { createCaps, updateCaps,getAllCaps,getAllCapsActive,getByIdCap,getCapsByCategorieId,deleteCap,deleteCapPermant,getInfoAllCap} from "../controller/capsController";

export const capRouter = express.Router();

capRouter.post('/',createCaps);
capRouter.patch('/:id',updateCaps);
capRouter.get('/',getAllCaps);
capRouter.get('/activate/',getAllCapsActive);
capRouter.get('/:id',getByIdCap);
capRouter.get('/categorie/:categoria_id',getCapsByCategorieId);
capRouter.delete('/:id',deleteCap);
capRouter.delete('/delete/permant/:id',deleteCapPermant);
capRouter.get('/all/info/:id',getInfoAllCap);
