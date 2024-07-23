import  express  from "express";
import { validateToken } from "../../helpers/verificateToken";
import { createOrder,getAllPendingOrdersWithCustomer,updateOrderDate,updateOrderStatus,getAllOrdersAsignedDate,getAllCompletedOrCancelledOrdersWithCustomer,getOrderDetails,getshoppingClient} from "../controllers/orderController";
export const orderRoute = express.Router();

//orderRoute.use(validateToken)
orderRoute.post('/',createOrder );
orderRoute.get('/pending/',getAllPendingOrdersWithCustomer );
orderRoute.patch('/date/:id',updateOrderDate);
orderRoute.patch('/status/:id',updateOrderStatus);
orderRoute.get('/all/asigned/date',getAllOrdersAsignedDate );
orderRoute.get('/all/complet/order',getAllCompletedOrCancelledOrdersWithCustomer );
orderRoute.get('/details/order/:id',getOrderDetails );
orderRoute.get('/details/compras/:cliente_id',getshoppingClient );















