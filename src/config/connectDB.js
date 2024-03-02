import mongoose from "mongoose"
import dotenv from "dotenv"


dotenv.config()

export const configObject = {
    port: process.env.PORT || 8083,
    jwt_private_key: process.env.JWT_PRIVATE_KEY,
    mongo_url: process.env.MONGO_URL,
}

export const connectDB= async () => {

    try {        
        await mongoose.connect(process.env.MONGO_URL)
        console.log('Base de datos conectada')           
    } catch (error) {
        console.log(error)
    }
}

