import CartManagerMongo from "../daos/Mongo/CartManagerMongo.js";

export class CartControllers {
        constructor (){
            this.cartService = new CartManagerMongo()
        }
//CREO UN CARRITO
createCart = async (req, res) => {
  
    try {
  
      const newCart = await this.CartControllers.createCart();
      console.log('Nuevo carrito:', newCart);
  
      if (!newCart) {
        console.error('Error al crear el carrito. newCart es null o undefined.');
        res.status(500).send('Error al crear el carrito');
        return;
      }
  
    const cartId = newCart._id;
  
    const updatedCart = await this.cartService.getCart(cartId);
  
    res.json(updatedCart);
    } 
    catch (error) {
      console.error("ERROR AL CREAR CARRITO", error);
      res.status(500).send("Error al crear carrito");
    }
  }
//OBTENGO EL CARRITO POR SU ID
getCart =async (req, res) => {
    const { cid } = req.params;
  
    try {
      const cart = await this.cartService.getCart(cid);
      console.log(cart); // Agrega este console.log para verificar la estructura de cart
      res.render("carts", { cart });
    } catch (error) {
      console.error("Error al obtener el carrito:", error);
      res.status(500).send("Error al obtener carrito");
    }
  }
//AGREGO UN PRODUCTO POR EL ID DEL PRODUCTO
addProductToCart = async (req, res) => {
    const { cid, pid } = req.params;
    const { title, description, price, quantity } = req.body;
  
    try {
        console.log("pid:", pid);
        const updatedCart = await this.cartService.addProductToCart(cid, pid, title, description, price, quantity);
        // res.json(updatedCart);
        res.send("Producto agregado al carrito")
    } catch (error) {
        console.error("Error al agregar producto al carrito:", error);
        res.status(500).send(`Error al agregar producto al carrito: ${error.message}`);
    }
  }
//ELIMINO EL CARRITO POR SU ID
deleteCart =async (req, res) => {
    
    const { cid } = req.params;
    
    try {
        
      const deletedCart = await this.cartService.deleteCart(cid);
    
      res.json({ message: 'Carrito eliminado exitosamente', deletedCart });
      } 
    catch (error) {
        console.error('Error al eliminar el carrito:', error);
        res.status(500).send('Error al eliminar el carrito');
      }
    }
//ELIMINO UN PRODUCTO DEL CARRITO POR EL ID
removeProductFromCart = async (req, res) => {
    const { cid, pid } = req.params;
  
    try {
      const deletedCart = await this.cartService.removeProductFromCart(cid, pid, res);
      res.json({ message: 'Producto eliminado exitosamente del carrito', deletedCart });
  
    } catch (error) {
      console.error("Error al eliminar producto del carrito:", error);
      res.status(500).send(`Error al eliminar producto del carrito: ${error.message}`);
    }
  }
//ELIMINO TODOS LOS PRODUCTOS DEL CARRITO
clearCart = async (req, res) => {
    const { cid } = req.params;
  
    try {
      await this.cartService.clearCart(cid, res);
    } catch (error) {
      console.error('Error al eliminar todos los productos del carrito:', error);
      res.status(500).send('Error al eliminar todos los productos del carrito');
    }
  }

//ACTUALIZO CARRITO CON UN ARREGLO DE PRODUCTOS
updateCartProducts = async (req, res) => {
    const { cid } = req.params;
    const products = req.body;
  
    try {
      await this.cartService.updateCartProducts(cid, products, res);
    } catch (error) {
      console.error("Error al actualizar el carrito:", error);
      res.status(500).send(`Error al actualizar el carrito: ${error.message}`);
    }
  }
//ACTUALIZO CANTIDAD DE PRODUCTO EN UN EL CARRITO
updateProductQuantity = async (req, res) => {
    const { cid, pid } = req.params;
    const { quantity } = req.body;
  
    try {
      await this.cartService.updateProductQuantity(cid, pid, quantity, res);
    } catch (error) {
      console.error("Error al actualizar la cantidad del producto en el carrito:", error);
      res.status(500).send(`Error al actualizar la cantidad del producto en el carrito: ${error.message}`);
    }
  }

//CARRITO CON PRODUCTOS COMPLETOS 
getPopulatedCart =async (req, res) => {
    const { cid } = req.params;
  
    try {
      const cart = await this.cartService.getPopulatedCart(cid);
      res.json(cart);
    } catch (error) {
      console.error("Error al obtener el carrito:", error);
      res.status(500).send("Error al obtener carrito");
    }
  }
}