import UserManagerMongo from "../daos/Mongo/UserManagerMongo.js";
import { createHash, isValidPassword } from "../utils/hashBcrypt.js";
import { generateToken } from "../utils/jsonwebtoken.js";

export class SessionsControllers {
    
        constructor (){
            this.userService = new UserManagerMongo()
        }


//REGISTRO

register = async(req, res)=>{
    try {
           const{first_name, last_name, email, password}= req.body

const userNew= {
    first_name, 
    last_name,
    email,
    password: createHash(password)
}
const result = await this.userService.createUser(userNew)


const token = generateToken({
    first_name,
    last_name,
    id: result._id
})

res.cookie("cookieToken", token,{
    maxAge: 60 * 60 * 1000 *24,
    httpOnly: true
}).send({
    status: "success",
    usersCreate: result, 
    token
})
    } catch (error) {
        res.send({status: "error", error })
    }

}

//LOGIN

login =async(req,res)=>{

try {
        const {email, password}= req.body

    const user= await this.userService.getUserBy({email})
    if(!isValidPassword(password, user.password)) return res.status(401).send("contraseña incorrecta")

//TOKEN
const token = generateToken({
    id: user._id,
    email: user.email,
    role: user.role
    })

    res.cookie("cookieToken", token, {
        maxAge : 60 * 60 * 1000 *24,
        httpOnly: true
    }).send({
        status: "success",
        usersCreate: "login success", 
        token
    })
} catch (error) {
    console.log(error);
res.send({status: "error", error})  
}

}
//CURRENT

current =async(req,res)=>{
    try {res.send({ user: req.user, message: "Datos sensibles" });

        
    } catch (error) {
        res.send({status: "error", error})
    }
}  

//GITHUB

github = async (req, res) => {
    try {
        res.send("aprobado")

    } catch (error) {
        res.send({status: "Error",error})
    } 
    }
    
//GITHUBCALLBACK

githubcallback = async(req, res) => {
    try {
        const token = generateToken(req.user);
        res.cookie('cookieToken', token, { httpOnly: true });
        res.redirect("/products");
    } catch (error) {
        res.send({ status: "error", error });
    }
}

}