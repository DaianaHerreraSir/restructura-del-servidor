
import { Router } from "express";
import CartManagerMongo from "../daos/Mongo/CartManagerMongo.js";
import { CartControllers } from "../controllers/carts.controllers.js";

const cartsRouter = Router();

const{createCart,
      getCart,
      addProductToCart,
      deleteCart,
      removeProductFromCart,
      clearCart,
      updateCartProducts,
      updateProductQuantity,
      getPopulatedCart} =  new CartControllers ()


  //creo un carrito
cartsRouter.post("/", createCart);

//obtengo el carrito por su id
cartsRouter.get("/:cid", getCart);


//agrego un producto por el id del producto

cartsRouter.post("/:cid/products/:pid", addProductToCart );


//elimino el carrito por su id
cartsRouter.delete('/:cid',deleteCart );

// Eliminar un producto del carrito por el id
cartsRouter.delete('/:cid/products/:pid', removeProductFromCart);

// Eliminar todos los productos del carrito
cartsRouter.delete('/api/carts/:cid', clearCart );

// Actualizar carrito con un arreglo de productos
cartsRouter.put('/:cid', updateCartProducts);

// Actualizar cantidad de un producto en el carrito
cartsRouter.put('/:cid/products/:pid', updateProductQuantity );



// carrito con productos completos
cartsRouter.get("/:cid", getPopulatedCart );



export default cartsRouter;





