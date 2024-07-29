import express from "express";
import cors from "cors";
import { Signale } from 'signale';
import { custumerRoute } from "./customer/routes/custumerRoutes";
import { categorieRoute } from "./categories/routes/categorieRoute";
import { capRouter } from "./caps/routes/capsRoute";
import { sizeRoutes } from "./sizes/routes/sizeRoute";
import { typeCapRoutes } from "./typeCaps/routes/TypeCapRoute";
import { inventaryRoutes } from "./inventary/routes/inventaryRoute";
import { cartRoute } from "./cart/routes/cartRoute";
import { orderRoute } from "./orders/routes/sizeRoute";
import { adminRoute } from "./admin/routes/custumerRoutes";

const app = express();
const signale = new Signale();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1/custumer',custumerRoute);
app.use('/api/v1/categorie',categorieRoute);
app.use('/api/v1/cap',capRouter);
app.use('/api/v1/size',sizeRoutes);
app.use('/api/v1/typeCap',typeCapRoutes);
app.use('/api/v1/inventary',inventaryRoutes);
app.use('/api/v1/cart',cartRoute);
app.use('/api/v1/order',orderRoute);
app.use('/api/v1/admin',adminRoute);




const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Corriendo en el puerto ${port}`);
});