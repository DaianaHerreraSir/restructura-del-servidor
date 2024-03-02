import UserManagerMongo from "../daos/Mongo/UserManagerMongo.js"

 


export class UserControllers{
        constructor(){
            this.userService = new UserManagerMongo()
        }

//llama a todos los usuario
 getUsers= async(req, res) =>{
    try {
        const users = await this.userService.getUsers()
    } catch (error) {
        res.send({status: "error", message: error})
        
    }
}

//llama a un usuario por id
 getUserBy= async(req,res)=>{
   try {
    const {uid} = req.params
    const user =await this.userService.getUserBy()
   res.send(user)

} catch (error) {
    res.send({status: "error", message: error})
        
   } 
}

//Crea un usuario
createUser = async (req, res)=>{
    try {
        const{first_name, last_name, email, password}= req.body
        
        const userNew ={
            first_name,
            last_name,
            email,
            password
        }
        const result = await this.userService.createUser(userNew)
        
        res.status(200).send({
            status:"success",
            usersCreate: result
        })
    } catch (error) {
        res.send({status: "error", message: error})
    }
}

//Actualiza el usuario
 updateUser = async(req, res)=>{
    try {
        const {uid}= req.params
        const userToUpdate= req.body
        const result = await this.userService.updateUser(uid, userToUpdate)
    
        res.status(200).send({
            status:"success",
            message: result
        })
    } catch (error) {
        res.send({status: "error", message: error})
    }
}

//Elimina un usuario
 deleteUser= async (req,res) =>{
    try {
        const {uid}= req.params
        const result = await this.userService.deleteUser(uid)
        res.send(result)
        
    } catch (error) {
        res.send({status: "error", message: error})
        
    }
}

}