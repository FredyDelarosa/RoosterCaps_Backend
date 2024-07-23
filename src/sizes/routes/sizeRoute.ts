import  express  from "express";
import { validateToken } from "../../helpers/verificateToken";
import { createSize,updateSize,getAllSize,getAllSizeActivate,deleteSize,deleteSizePermant } from "../controllers/sizeController";

export const sizeRoutes = express.Router();

sizeRoutes.use(validateToken)
sizeRoutes.post('/',createSize );
sizeRoutes.patch('/:id',updateSize );
sizeRoutes.get('/',getAllSize );
sizeRoutes.get('/activate/',getAllSizeActivate );
sizeRoutes.delete('/:id',deleteSize );
sizeRoutes.delete('/permant/:id',deleteSizePermant );







