import  express  from "express";
import { createCostumer,updateCustumer,getAllCustumer,getAllCustumeractive,deleteCustumer,loginCustumer } from "../controllers/customerControllers";
import { validateToken } from "../../helpers/verificateToken";

export const custumerRoute = express.Router();

custumerRoute.post('/',createCostumer );
custumerRoute.post('/login',loginCustumer );
custumerRoute.get('/',getAllCustumer );
custumerRoute.get('/active/',getAllCustumeractive );

custumerRoute.use(validateToken)
custumerRoute.patch('/actualizar/:id',updateCustumer );
custumerRoute.delete('/:id',deleteCustumer );


