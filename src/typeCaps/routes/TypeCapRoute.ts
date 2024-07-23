import  express  from "express";
import { validateToken } from "../../helpers/verificateToken";
import { createTypeCap,updateTypeCap,getAllTypeCaps,deleteTypeCapPermanent,deleteTypeCap,getAllTypeCapsActive } from "../controllers/TypeCapController";

export const typeCapRoutes = express.Router();

typeCapRoutes.use(validateToken)
typeCapRoutes.post('/',createTypeCap );
typeCapRoutes.patch('/:id',updateTypeCap );
typeCapRoutes.get('/',getAllTypeCaps );
typeCapRoutes.get('/activate/',getAllTypeCapsActive );
typeCapRoutes.delete('/:id',deleteTypeCap );
typeCapRoutes.delete('/permant/:id',deleteTypeCapPermanent );







