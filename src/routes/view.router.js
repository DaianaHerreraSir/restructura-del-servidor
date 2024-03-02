import { Router } from "express";
import { ViewControllers } from "../controllers/view.controllers.js";

const viewRouter = Router();


const{  getViewProduct,
        viewLogin,
        viewRegister} = new ViewControllers()



viewRouter.get("/products",getViewProduct);

viewRouter.get("/login",viewLogin )

viewRouter.get("/register", viewRegister)



export default viewRouter;



