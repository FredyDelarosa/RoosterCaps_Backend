import express  from "express";
import { addCartDetail,deleteCartDetail,getAllCartDetails } from "../controller/cartControler";
import { validateToken } from "../../helpers/verificateToken";

export const cartRoute = express.Router();

cartRoute.use(validateToken);
cartRoute.post("/",addCartDetail);
cartRoute.delete("/:id",deleteCartDetail);
cartRoute.get("/",getAllCartDetails);

